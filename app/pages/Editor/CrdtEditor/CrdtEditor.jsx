/**
 *
 * CrdtEditor
 *
 */

import React, { memo } from 'react'
// import PropTypes from 'prop-types';
import SimpleMDEEditor from 'react-simplemde-editor'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './crdt-editor.scss'
function CrdtEditor({
  crdtInformation,
  replicatedPageManager,
  replicatedPageOperations,
  page,
  collaborators,
  setPageContent,
  pageId,
  visible,
}) {
  const editorManager = replicatedPageManager.getOrCreatePageEditorManager(
    pageId,
  )
  const loadPage = () => {
    if (
      page !== undefined &&
      page !== null &&
      (crdtInformation === null || crdtInformation === undefined)
    )
      editorManager.initializePageContent(page.content)
    else if (crdtInformation !== null && crdtInformation !== undefined)
      editorManager.initializePageContentFromCrdtStructure(crdtInformation)
    editorManager.syncPageOperations(replicatedPageOperations, collaborators)
  }

  if (
    editorManager.isPageContentLoaded &&
    editorManager.mde !== undefined &&
    editorManager.mde !== null
  ) {
    editorManager.applyOperations(replicatedPageOperations, collaborators)
    if (!visible && page !== undefined && page.content !== undefined)
      setPageContent(pageId, editorManager.controller.crdt.toText())
  } else if (
    !editorManager.isPageContentLoaded &&
    editorManager.mde !== undefined &&
    editorManager.mde !== null
  ) {
    loadPage()
    if (!visible && page !== undefined && page.content !== undefined)
      setPageContent(pageId, editorManager.controller.crdt.toText())
  }

  const handleChange = (e, k, selectedPageId) => {
    const em = replicatedPageManager.getOrCreatePageEditorManager(
      selectedPageId,
    )
    em.handleChange(e, k, selectedPageId)
  }
  if (visible === true) {
    if (editorManager !== undefined && editorManager != null) {
      const getIntance = instance => {
        editorManager.setMDE(instance)
        loadPage()
      }

      return (
        <SimpleMDEEditor
          events={{ change: (e, k) => handleChange(e, k, pageId) }}
          onChange={value => setPageContent(pageId, value)}
          getMdeInstance={i => getIntance(i)}
          options={{
            autofocus: true,
            spellChecker: false,
            showIcons: [
              'strikethrough',
              'code',
              'table',
              'redo',
              'heading',
              'undo',
              'heading-bigger',
              'heading-smaller',
              'heading-1',
              'heading-2',
              'heading-3',
              'clean-block',
              'horizontal-rule',
            ],
          }}
        />
      )
    }
    return (
      <p>
        <FormattedMessage {...messages.header} />
      </p>
    )
  }
}

CrdtEditor.propTypes = {}

export default memo(CrdtEditor)
