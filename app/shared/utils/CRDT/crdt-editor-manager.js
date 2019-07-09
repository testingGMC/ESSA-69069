import CRDTController from './controller'
import RemoteCursor from './remote-cursor'
import LiveShareCRDTMedium from './liveshare-crdt-medium'
class CRDTEditorManager {
  constructor(senderCallback, pageId, syncInterval, replicationManager) {
    this.medium = new LiveShareCRDTMedium(
      senderCallback,
      syncInterval,
      pageId,
      replicationManager,
    )
    this.controller = new CRDTController(this, this.medium, pageId)
    this.remoteCursors = {}
    this.mde = null
    this.siteIdentifierUsers = {}
    this.pageId = pageId
    this.isPageContentLoaded = false
  }

  syncCollaboratorsSiteIdentifiers(collaborators) {
    if (collaborators !== undefined && collaborators !== null)
      collaborators.map(c => {
        this.addOrUpdateSiteIdentifierUser(parseInt(c.id), c.fullName)
      })
  }

  applyOperations(ops, collaborators) {
    this.syncCollaboratorsSiteIdentifiers(collaborators)

    if (ops !== undefined && ops !== null)
      ops.map(op => {
        this.controller.handleRemoteOperation(op)
      })
  }

  initializePageContentFromCrdtStructure(crdt) {
    if (!this.isPageContentLoaded) {
      this.controller.populateCRDT(crdt.struct)
      this.controller.populateVersionVector(crdt.vector.versions)
      this.isPageContentLoaded = true
    }
  }

  initializePageContent(content) {
    if (
      !this.isPageContentLoaded &&
      content !== undefined &&
      content !== null &&
      content.length > 0
    ) {
      this.controller.crdt.populateFromText(content)
      this.isPageContentLoaded = true
    }
  }

  syncPageOperations(ops, collaborators) {
    this.remoteCursors = {}
    this.syncCollaboratorsSiteIdentifiers(collaborators)
    if (ops !== undefined && ops !== null)
      ops.map(op => {
        this.controller.handleRemoteOperation(op)
      })
    this.replaceText(this.controller.crdt.toText())
  }

  addOrUpdateSiteIdentifierUser(siteId, username) {
    this.siteIdentifierUsers[siteId] = username
  }

  setMDE(mde) {
    this.mde = mde
    this.customTabBehavior()
  }

  customTabBehavior() {
    this.mde.codemirror.setOption('extraKeys', {
      Tab(codemirror) {
        codemirror.replaceSelection('\t')
      },
    })
  }

  handleChange(e, changeObj, pageId) {
    if (changeObj.origin === 'setValue') return
    if (changeObj.origin === 'insertText') return
    if (changeObj.origin === 'deleteText') return

    switch (changeObj.origin) {
      case 'redo':
      case 'undo':
        this.processUndoRedo(changeObj)
        break
      case '*compose':
      case '+input':
      //          this.processInsert(changeObj);    // uncomment this line for palindromes!
      case 'paste':
        this.processInsert(changeObj)
        break
      case '+delete':
      case 'cut':
        this.processDelete(changeObj)
        break
      default:
        if (!this.processUnknownReplace(changeObj))
          throw new Error('Unknown operation attempted in editor.')
    }
  }

  processUnknownReplace(changeObj) {
    if (this.isEmpty(changeObj.removed) && this.isEmpty(changeObj.text))
      return false
    this.processDelete(changeObj)
    this.processInsert(changeObj)
    return true
  }

  processInsert(changeObj) {
    this.processDelete(changeObj)
    const chars = this.extractChars(changeObj.text)
    const startPos = changeObj.from

    this.updateRemoteCursorsInsert(chars, changeObj.to)
    this.controller.localInsert(chars, startPos)
  }

  isEmpty(textArr) {
    return textArr.length === 1 && textArr[0].length === 0
  }

  processDelete(changeObj) {
    if (this.isEmpty(changeObj.removed)) return
    const startPos = changeObj.from
    const endPos = changeObj.to
    const chars = this.extractChars(changeObj.removed)

    this.updateRemoteCursorsDelete(chars, changeObj.to, changeObj.from)
    this.controller.localDelete(startPos, endPos)
  }

  processUndoRedo(changeObj) {
    if (changeObj.removed[0].length > 0) {
      this.processDelete(changeObj)
    } else {
      this.processInsert(changeObj)
    }
  }

  extractChars(text) {
    if (text[0] === '' && text[1] === '' && text.length === 2) {
      return '\n'
    }
    return text.join('\n')
  }

  replaceText(text) {
    const cursor = this.mde.codemirror.getCursor()
    this.mde.value(text)
    this.mde.codemirror.setCursor(cursor)
  }

  insertText(value, positions, siteId) {
    const localCursor = this.mde.codemirror.getCursor()
    const delta = this.generateDeltaFromChars(value)

    this.mde.codemirror.replaceRange(
      value,
      positions.from,
      positions.to,
      'insertText',
    )
    this.updateRemoteCursorsInsert(positions.to, siteId)
    this.updateRemoteCursor(positions.to, siteId, 'insert', value)

    if (localCursor.line > positions.to.line) {
      localCursor.line += delta.line
    } else if (
      localCursor.line === positions.to.line &&
      localCursor.ch > positions.to.ch
    ) {
      if (delta.line > 0) {
        localCursor.line += delta.line
        localCursor.ch -= positions.to.ch
      }

      localCursor.ch += delta.ch
    }

    this.mde.codemirror.setCursor(localCursor)
  }

  removeCursor(siteId) {
    const remoteCursor = this.remoteCursors[siteId]

    if (remoteCursor) {
      remoteCursor.detach()

      delete this.remoteCursors[siteId]
    }
  }

  updateRemoteCursorsInsert(chars, position, siteId) {
    const positionDelta = this.generateDeltaFromChars(chars)

    for (const cursorSiteId in this.remoteCursors) {
      if (cursorSiteId === siteId) continue
      const remoteCursor = this.remoteCursors[cursorSiteId]
      const newPosition = Object.assign({}, remoteCursor.lastPosition)

      if (newPosition.line > position.line) {
        newPosition.line += positionDelta.line
      } else if (
        newPosition.line === position.line &&
        newPosition.ch > position.ch
      ) {
        if (positionDelta.line > 0) {
          newPosition.line += positionDelta.line
          newPosition.ch -= position.ch
        }

        newPosition.ch += positionDelta.ch
      }

      remoteCursor.set(newPosition)
    }
  }

  updateRemoteCursorsDelete(chars, to, from, siteId) {
    const positionDelta = this.generateDeltaFromChars(chars)

    for (const cursorSiteId in this.remoteCursors) {
      if (cursorSiteId === siteId) continue
      const remoteCursor = this.remoteCursors[cursorSiteId]
      const newPosition = Object.assign({}, remoteCursor.lastPosition)

      if (newPosition.line > to.line) {
        newPosition.line -= positionDelta.line
      } else if (newPosition.line === to.line && newPosition.ch > to.ch) {
        if (positionDelta.line > 0) {
          newPosition.line -= positionDelta.line
          newPosition.ch += from.ch
        }

        newPosition.ch -= positionDelta.ch
      }

      remoteCursor.set(newPosition)
    }
  }

  updateRemoteCursor(position, siteId, opType, value) {
    const remoteCursor = this.remoteCursors[siteId]
    const clonedPosition = Object.assign({}, position)
    if (siteId == this.controller.siteId) return
    if (opType === 'insert') {
      if (value === '\n') {
        clonedPosition.line++
        clonedPosition.ch = 0
      } else {
        clonedPosition.ch++
      }
    } else {
      clonedPosition.ch--
    }

    if (remoteCursor) {
      remoteCursor.set(clonedPosition)
    } else {
      this.remoteCursors[siteId] = new RemoteCursor(
        this.mde,
        siteId,
        clonedPosition,
        this.siteIdentifierUsers[siteId],
      )
    }
  }

  deleteText(value, positions, siteId) {
    const localCursor = this.mde.codemirror.getCursor()
    const delta = this.generateDeltaFromChars(value)

    this.mde.codemirror.replaceRange(
      '',
      positions.from,
      positions.to,
      'deleteText',
    )
    this.updateRemoteCursorsDelete(positions.to, siteId)
    this.updateRemoteCursor(positions.to, siteId, 'delete')

    if (localCursor.line > positions.to.line) {
      localCursor.line -= delta.line
    } else if (
      localCursor.line === positions.to.line &&
      localCursor.ch > positions.to.ch
    ) {
      if (delta.line > 0) {
        localCursor.line -= delta.line
        localCursor.ch += positions.from.ch
      }

      localCursor.ch -= delta.ch
    }

    this.mde.codemirror.setCursor(localCursor)
  }

  findLinearIdx(lineIdx, chIdx) {
    const linesOfText = this.controller.crdt.text.split('\n')

    let index = 0
    for (let i = 0; i < lineIdx; i++) {
      index += linesOfText[i].length + 1
    }

    return index + chIdx
  }

  generateDeltaFromChars(chars) {
    const delta = { line: 0, ch: 0 }
    let counter = 0

    while (counter < chars.length) {
      if (chars[counter] === '\n') {
        delta.line++
        delta.ch = 0
      } else {
        delta.ch++
      }

      counter++
    }

    return delta
  }
}
export default CRDTEditorManager
