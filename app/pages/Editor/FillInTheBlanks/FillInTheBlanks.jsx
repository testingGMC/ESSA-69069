/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * FillInTheBlanks
 *
 */

import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LiveShareSelection from 'shared/components/LiveShareSelection'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { List, Input, Button, Popconfirm, Empty } from 'antd'
import { isEmpty } from 'lodash'
import {
  BLANK_TYPE,
  PLACEHOLDER_TYPE,
  NEW_LINE_TYPE,
} from 'shared/redux/editor/utils/editorConstants'
import { EMPTY_VALUE, BREAK_LINE } from 'shared/constants'
import messages from './messages'
import './fill-in-the-blanks.scss'

function FillInTheBlanks({
  assessment,
  skill,
  addFibElement,
  updateFibElement,
  deleteFibElement,
  intl,
  selections,
}) {
  const [text, setText] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  const [actionMode, setActionMode] = useState(
    <FormattedMessage {...messages.update} />,
  )
  const [textMode, setTextMode] = useState()
  const [preview, setPreview] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    let result = ''
    assessment.elements.forEach(elementId => {
      if (skill.data[elementId].type === BLANK_TYPE) {
        result += '   ................   '
      } else {
        result += skill.data[elementId].text
      }
    })
    setPreview(result)
  }, [skill])

  const handleManageElement = (type, textToInsert = text) => {
    const newElement = { text: textToInsert, type }
    addFibElement(newElement, assessment.id)
    setText(EMPTY_VALUE)
  }
  const manageUpdate = elementId => {
    if (updateMode) {
      const element = { text: textMode }
      updateFibElement(elementId, element, assessment.id)
      setId('')
      setUpdateMode(!updateMode)
    } else {
      setId(elementId)
      setUpdateMode(!updateMode)
      setTextMode(skill.data[elementId].text)
    }
  }
  const cancelMode = () => {
    setUpdateMode(!updateMode)
    setId('')
  }

  useEffect(() => {
    if (updateMode) {
      setActionMode(<FormattedMessage {...messages.validate} />)
    } else {
      setActionMode(<FormattedMessage {...messages.update} />)
    }
  }, [updateMode])

  const renderActions = elementId => {
    const actions = []
    if (elementId !== id) {
      if (isEmpty(id)) {
        actions.push(
          <a onClick={() => manageUpdate(elementId)}>
            <FormattedMessage {...messages.update} />
          </a>,
        )
        actions.push(
          <Popconfirm
            placement="topLeft"
            title={<FormattedMessage {...messages.confirmMessage} />}
            onConfirm={() => deleteFibElement(elementId, assessment.id)}
            okText={<FormattedMessage {...messages.yes} />}
            cancelText={<FormattedMessage {...messages.no} />}
          >
            <a>
              <FormattedMessage {...messages.delete} />
            </a>
          </Popconfirm>,
        )
      }
    } else {
      actions.push(
        <a onClick={() => manageUpdate(elementId)} disabled={isEmpty(textMode)}>
          {actionMode}
        </a>,
      )
      actions.push(
        <a onClick={cancelMode}>
          <FormattedMessage {...messages.cancel} />
        </a>,
      )
    }
    return actions
  }
  const renderColor = type => {
    if (type === BLANK_TYPE) {
      return 'blank-class'
    }
    if (type === PLACEHOLDER_TYPE) {
      return 'placeholder-class'
    }
    if (type === NEW_LINE_TYPE) {
      return 'new-line-class'
    }
    return EMPTY_VALUE
  }
  const renderListItem = elementId => {
    if (elementId !== id) {
      if (skill.data[elementId].text === BREAK_LINE) {
        return <FormattedMessage {...messages.newLine} />
      }
      return skill.data[elementId].text
    }

    return (
      <Input.TextArea
        value={textMode}
        onChange={e => setTextMode(e.target.value)}
        placeholder={intl.formatMessage({
          ...messages.updateTheText,
        })}
        className="fill-in-the-blanks-update"
        autosize
      />
    )
  }

  return (
    <div className="fill-in-the-blanks">
      <div className="assessment-title">
        <FormattedMessage {...messages.fillInTheBlanks} />
      </div>
      <div className="fill-in-the-blanks-content">
        <LiveShareSelection
          selections={selections}
          id={assessment.id}
          extendedStyle={{
            paddingLeft: '5px',
            paddingRight: '5px',
            margin: '5px',
          }}
        >
          <Input.TextArea
            disabled={updateMode}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={intl.formatMessage({
              ...messages.addAnElement,
            })}
            className="fill-in-the-blanks-add"
            autosize
          />
        </LiveShareSelection>
        <div className="fill-in-the-blanks-actions">
          <Button
            className="blank-button"
            onClick={() => handleManageElement(BLANK_TYPE)}
            disabled={!text}
          >
            <FormattedMessage {...messages.addBlank} />
          </Button>
          <Button
            className="placeholder-button"
            onClick={() => handleManageElement(PLACEHOLDER_TYPE)}
            disabled={!text}
          >
            <FormattedMessage {...messages.addPlaceholder} />
          </Button>
          <Button
            className="new-line-button"
            onClick={() => handleManageElement(NEW_LINE_TYPE, BREAK_LINE)}
          >
            <FormattedMessage {...messages.addNewLine} />
          </Button>
        </div>

        <div className="fill-in-the-blanks-sub-title">
          <FormattedMessage {...messages.preview} />
        </div>
        {preview ? (
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        ) : (
          <div className="preview">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}

        <div className="fill-in-the-blanks-sub-title">
          <FormattedMessage {...messages.listOfElements} />
        </div>
        <List
          size="small"
          bordered
          className="fill-in-the-blanks-list"
          dataSource={assessment.elements}
          renderItem={elementId => (
            <LiveShareSelection
              selections={selections}
              id={elementId}
              extendedStyle={{
                paddingLeft: '5px',
                paddingRight: '5px',
                margin: '5px',
              }}
            >
              <List.Item
                actions={renderActions(elementId)}
                className={renderColor(skill.data[elementId].type)}
              >
                {renderListItem(elementId)}
              </List.Item>
            </LiveShareSelection>
          )}
        />
      </div>
    </div>
  )
}

FillInTheBlanks.propTypes = {
  assessment: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  addFibElement: PropTypes.func.isRequired,
  updateFibElement: PropTypes.func.isRequired,
  deleteFibElement: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  selections: PropTypes.array,
}
export default memo(injectIntl(FillInTheBlanks))
