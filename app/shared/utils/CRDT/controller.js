import CRDT from './crdt';
import Char from './char';
import Identifier from './identifier';
import VersionVector from './version-vector';
import Version from './version';
import * as CRDTOperationType from './crdt-operation-type'
import {getSiteIdentifier} from './site-identifier'

class CRDTController {
  constructor(editor, medium, pageId) {

    this.siteId = getSiteIdentifier();
    this.vector = new VersionVector(this.siteId);
    this.crdt = new CRDT(this);
    this.liveshareMedium = medium;
    this.editor = editor;
    this.buffer = []
    this.pageId = pageId
    this.localOperations = []
  }
  broadcastInsertion(char) {
    const operation = {
      type: CRDTOperationType.CRDT_INSERT_OPERATION,
      character: char,
      version: this.vector.getLocalVersion()
    };
    this.localOperations.push(operation)
    this.liveshareMedium.send(operation);
  }

  broadcastDeletion(char, version) {
    const operation = {
      type: CRDTOperationType.CRDT_DELETE_OPERATION,
      character: char,
      version: version
    };
    this.localOperations.push(operation)
    this.liveshareMedium.send(operation);
  }

  insertIntoEditor(value, pos, siteId) {
    const positions = {
      from: {
        line: pos.line,
        ch: pos.ch,
      },
      to: {
        line: pos.line,
        ch: pos.ch,
      }
    }

    this.editor.insertText(value, positions, siteId);
  }

  deleteFromEditor(value, pos, siteId) {
    let positions;

    if (value === "\n") {
      positions = {
        from: {
          line: pos.line,
          ch: pos.ch,
        },
        to: {
          line: pos.line + 1,
          ch: 0,
        }
      }
    } else {
      positions = {
        from: {
          line: pos.line,
          ch: pos.ch,
        },
        to: {
          line: pos.line,
          ch: pos.ch + 1,
        }
      }
    }

    this.editor.deleteText(value, positions, siteId);
  }
  isLocalOperation(operation) {
    let ops = this.localOperations.filter(e => e.version.counter == operation.version.counter && e.version.siteId == operation.version.siteId)
    console.log(this.localOperations)
    return ops.length > 0
  }
  handleRemoteOperation(operation) {
    if (this.vector.hasBeenApplied(operation.version) ) return;

    if (operation.type === CRDTOperationType.CRDT_INSERT_OPERATION) {
      this.applyOperation(operation);
    } else if (operation.type === CRDTOperationType.CRDT_DELETE_OPERATION) {
      this.buffer.push(operation);
    }

    this.processDeletionBuffer();
    this.localOperations.push(operation)
    //this.liveshareMedium.send(operation, this.pageId);
  }

  processDeletionBuffer() {
    let i = 0;
    let deleteOperation;

    while (i < this.buffer.length) {
      deleteOperation = this.buffer[i];
      if (this.hasInsertionBeenApplied(deleteOperation)) {
        this.applyOperation(deleteOperation);
        this.buffer.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  hasInsertionBeenApplied(operation) {
    const charVersion = { siteId: operation.siteId, counter: operation.character.counter };
    return this.vector.hasBeenApplied(charVersion);
  }

  applyOperation(operation) {
    console.log("Apply ", operation)
    const char = operation.character;
    const identifiers = char.position.map(pos => new Identifier(pos.digit, pos.siteId));
    const newChar = new Char(char.value, char.counter, char.siteId, identifiers);

    if (operation.type === CRDTOperationType.CRDT_INSERT_OPERATION) {
      this.crdt.handleRemoteInsert(newChar);
    } else if (operation.type === CRDTOperationType.CRDT_DELETE_OPERATION) {
      console.log("Delete ", operation)
      this.crdt.handleRemoteDelete(newChar, operation.version.siteId);
    }

    this.vector.update(operation.version);
  }

  localDelete(startPos, endPos) {
    this.crdt.handleLocalDelete(startPos, endPos);
  }

  localInsert(chars, startPos) {
    for (let i = 0; i < chars.length; i++) {
      if (chars[i - 1] === '\n') {
        startPos.line++;
        startPos.ch = 0;
      }
      this.crdt.handleLocalInsert(chars[i], startPos);
      startPos.ch++;
    }
  }
  populateCRDT(initialStruct) {
    const struct = initialStruct.map(line => {
      return line.map(ch => {
        return new Char(ch.value, ch.counter, ch.siteId, ch.position.map(id => {
          return new Identifier(id.digit, id.siteId);
        }));
      });
    });

    this.crdt.struct = struct;
    this.editor.replaceText(this.crdt.toText());
  }

  populateVersionVector(initialVersions) {
    const versions = initialVersions.map(ver => {
      let version = new Version(ver.siteId);
      version.counter = ver.counter;
      ver.exceptions.forEach(ex => version.exceptions.push(ex));
      return version;
    });
   
    versions.forEach(version => {
      if(version.siteId === this.siteId && version.counter > this.vector.localVersion.counter)
          this.vector.localVersion = version

      this.vector.versions.push(version)
    });

     // remove redundant an take latest version
     let fixedVersions = []
     this.vector.versions.map(v => {
         let maxVersion = v
         this.vector.versions.map(mv => {
             if(v.siteId == mv.siteId && mv.counter > maxVersion.counter)
                 maxVersion = mv
         })
         if(!fixedVersions.some(v => v.siteId === maxVersion.siteId))
            fixedVersions.push(maxVersion)
     }) 
     this.vector.versions = fixedVersions
  }
 
}

export default CRDTController;
