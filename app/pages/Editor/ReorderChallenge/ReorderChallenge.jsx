/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * ReorderChallenge
 *
 */

import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LiveShareSelection from 'shared/components/LiveShareSelection'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { List, Input, Button, Popconfirm } from 'antd'
import { isEmpty } from 'lodash'
import messages from './messages'
import './reorder-challenge.scss'

function ReorderChallenge({
  assessment,
  skill,
  addReorderChallengeStatement,
  updateReorderChallengeStatement,
  deleteReorderChallengeStatement,
  updateReorderChallengeQuestion,
  intl,
  selections,
}) {
  const [text, setText] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  const [actionMode, setActionMode] = useState(
    <FormattedMessage {...messages.update} />,
  )
  const [textMode, setTextMode] = useState()

  const [id, setId] = useState('')
  const handleManageStatement = () => {
    const newStatement = { text }
    addReorderChallengeStatement(newStatement, assessment.id)
    setText('')
  }
  const manageUpdate = statementId => {
    if (updateMode) {
      const statement = { text: textMode }
      if (textMode) {
        updateReorderChallengeStatement(statementId, statement, assessment.id)

        setId('')
        setUpdateMode(!updateMode)
      }
    } else {
      setId(statementId)
      setUpdateMode(!updateMode)
      setTextMode(skill.data[statementId].text)
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

  const renderActions = statementId => {
    const actions = []
    if (statementId !== id) {
      if (isEmpty(id)) {
        actions.push(
          <a onClick={() => manageUpdate(statementId)}>
            <FormattedMessage {...messages.update} />
          </a>,
        )
        actions.push(
          <Popconfirm
            placement="topLeft"
            title={<FormattedMessage {...messages.confirmMessage} />}
            onConfirm={() =>
              deleteReorderChallengeStatement(statementId, assessment.id)
            }
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
        <a
          onClick={() => manageUpdate(statementId)}
          disabled={isEmpty(textMode)}
        >
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

  return (
    <div className="reorder-challenge">
      <div className="assessment-title">
        <FormattedMessage {...messages.reorderChallenge} />
      </div>
      <div className="reorder-challenge-content">
        <LiveShareSelection
          selections={selections}
          id={assessment.questionId}
          extendedStyle={{
            paddingLeft: '5px',
            paddingRight: '5px',
            margin: '5px',
          }}
        >
          <Input
            disabled={updateMode}
            placeholder={intl.formatMessage({
              ...messages.question,
            })}
            value={skill.data[assessment.questionId].text}
            onChange={e =>
              updateReorderChallengeQuestion(
                assessment.questionId,
                e.target.value,
              )
            }
          />
        </LiveShareSelection>
        <div className="reorder-challenge-sub-title">
          <FormattedMessage {...messages.listOfStatements} />
        </div>
        <List
          size="small"
          bordered
          className="reorder-challenge-list"
          dataSource={assessment.statements}
          renderItem={statementId => (
            <LiveShareSelection
              selections={selections}
              id={statementId}
              extendedStyle={{
                paddingLeft: '5px',
                paddingRight: '5px',
                margin: '5px',
              }}
            >
              <List.Item actions={renderActions(statementId)}>
                {statementId !== id ? (
                  skill.data[statementId].text
                ) : (
                  <Input
                    value={textMode}
                    onChange={e => setTextMode(e.target.value)}
                    placeholder={intl.formatMessage({
                      ...messages.updateTheText,
                    })}
                    className="reorder-challenge-update"
                  />
                )}
              </List.Item>
            </LiveShareSelection>
          )}
        />
        <Input
          disabled={updateMode}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={intl.formatMessage({
            ...messages.addAStatement,
          })}
          className="reorder-challenge-add"
        />

        <div className="reorder-challenge-actions">
          <Button
            type="primary"
            onClick={handleManageStatement}
            disabled={!text}
          >
            <FormattedMessage {...messages.addReorderChallengeStatement} />
          </Button>
        </div>
      </div>
    </div>
  )
}

ReorderChallenge.propTypes = {
  assessment: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  addReorderChallengeStatement: PropTypes.func.isRequired,
  updateReorderChallengeStatement: PropTypes.func.isRequired,
  deleteReorderChallengeStatement: PropTypes.func.isRequired,
  updateReorderChallengeQuestion: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  selections: PropTypes.array,
}

export default memo(injectIntl(ReorderChallenge))
