/**
 *
 * TransformMenu
 *
 */

import React, { memo } from 'react'
import { Button, Icon, Alert } from 'antd'
import PropTypes from 'prop-types'

import Card from 'shared/components/Card'
import { FormattedMessage } from 'react-intl'
import { DEPTH_TO_BREADTH, BREADTH_TO_DEPTH, MAGNIFY } from 'shared/constants'
import messages from './messages'
import './transform-menu.scss'

function TransformMenu({
  transformMode,
  parentNode,
  firstChildNode,
  secondChildNode,
  selectedNode,
  checkAndApply,
  applyPreview,
  resetSelection,
  isButtonDisabled,
  canReset,
}) {
  const messageToDisplay = mode => {
    switch (mode) {
      case DEPTH_TO_BREADTH:
        return (
          <div>
            <div>
              <FormattedMessage {...messages.selectDependencies} />
            </div>
            <div className="transformations">
              <span>
                <FormattedMessage {...messages.parentNode} />
                {parentNode.name || <FormattedMessage {...messages.none} />}
              </span>
              <Icon type="arrow-right" />
              <span>
                <FormattedMessage {...messages.childNode} />
                {firstChildNode.name || <FormattedMessage {...messages.none} />}
              </span>
              <Icon type="arrow-right" />
              <span>
                <FormattedMessage {...messages.childNode} />
                {secondChildNode.name || (
                  <FormattedMessage {...messages.none} />
                )}
              </span>
            </div>
          </div>
        )
      case BREADTH_TO_DEPTH:
        return (
          <div>
            <span>
              <FormattedMessage {...messages.parentNode} />
              {parentNode.name || <FormattedMessage {...messages.none} />}
            </span>
            <Icon type="arrow-right" />
            <span>
              <FormattedMessage {...messages.childNode} />
              {firstChildNode.name || <FormattedMessage {...messages.none} />}
            </span>
          </div>
        )
      case MAGNIFY:
        return (
          <div>
            <div>
              <FormattedMessage {...messages.selectNode} />
            </div>
            <div>
              <FormattedMessage {...messages.selectedNode} />
              {selectedNode.name || <FormattedMessage {...messages.none} />}
            </div>
          </div>
        )
      default:
        return <FormattedMessage {...messages.selectMode} />
    }
  }
  return (
    <div className="transform-menu">
      <Card
        className="possible-changes"
        title={<FormattedMessage {...messages.title} />}
      >
        <div className="changes">
          <Alert message={messageToDisplay(transformMode)} type="info" />
        </div>
        <div className="buttons">
          <Button
            onClick={() => applyPreview()}
            type="primary"
            className={`preview ${isButtonDisabled() ? '' : 'button'}`}
            disabled={isButtonDisabled()}
          >
            <FormattedMessage {...messages.preview} />
          </Button>
          <Button
            onClick={() => checkAndApply()}
            type="primary"
            className={`check-and-apply ${isButtonDisabled() ? '' : 'button'}`}
            disabled={isButtonDisabled()}
          >
            <FormattedMessage {...messages.check} />
          </Button>
          <Button
            onClick={() => resetSelection()}
            type="primary"
            className={`preview ${isButtonDisabled() ? '' : 'button'}`}
            disabled={canReset()}
          >
            <FormattedMessage {...messages.reset} />
          </Button>
        </div>
      </Card>
    </div>
  )
}

TransformMenu.propTypes = {
  transformMode: PropTypes.string.isRequired,
  parentNode: PropTypes.objectOf(PropTypes.any).isRequired,
  firstChildNode: PropTypes.objectOf(PropTypes.any).isRequired,
  secondChildNode: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedNode: PropTypes.objectOf(PropTypes.any).isRequired,
  checkAndApply: PropTypes.func.isRequired,
  applyPreview: PropTypes.func.isRequired,
  resetSelection: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.func.isRequired,
  canReset: PropTypes.func.isRequired,
}

export default memo(TransformMenu)
