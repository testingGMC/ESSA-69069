/**
 *
 * ErrorSaveModal
 *
 */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { Modal, Button } from 'antd'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import messages from './messages'
import getWarnings from './utils/getWarnings'
import './error-save-modal.scss'

function ErrorSaveModal({ skill, onCancel, onOk, intl }) {
  const [warnings, setWarnings] = useState({})
  const [displayModal, setDisplayModal] = useState(false)

  useEffect(() => {
    setDisplayModal(true)
    if (getWarnings(skill, messagesList).isEmpty) {
      onOk()
    } else {
      setWarnings(getWarnings(skill, messagesList))
      setDisplayModal(true)
    }
  }, [])

  const messagesList = {
    warnings: intl.formatMessage({
      ...messages.warnings,
    }),
    codeCompilingQuestion: intl.formatMessage({
      ...messages.codeCompilingQuestion,
    }),
    codeCompilingSolution: intl.formatMessage({
      ...messages.codeCompilingSolution,
    }),
    codeCompilingPlaceholder: intl.formatMessage({
      ...messages.codeCompilingPlaceholder,
    }),
    reorderQuestion: intl.formatMessage({
      ...messages.reorderQuestion,
    }),
    quizEmpty: intl.formatMessage({
      ...messages.quizEmpty,
    }),
    quizQuestionIsEmpty: intl.formatMessage({
      ...messages.quizQuestionIsEmpty,
    }),
    quizHasLessThanTwoChoices: intl.formatMessage({
      ...messages.quizHasLessThanTwoChoices,
    }),
    quizDontHaveACorrectAnswer: intl.formatMessage({
      ...messages.quizDontHaveACorrectAnswer,
    }),
    reorderQuestionIsEmpty: intl.formatMessage({
      ...messages.reorderQuestionIsEmpty,
    }),
    atLeastTwoStatements: intl.formatMessage({
      ...messages.atLeastTwoStatements,
    }),
    atLeastTwoBlanks: intl.formatMessage({
      ...messages.atLeastTwoBlanks,
    }),
    quizCodeIsEmpty: intl.formatMessage({
      ...messages.quizCodeIsEmpty,
    }),
  }

  return (
    <div className="error-save-modal">
      <Modal
        visible={displayModal}
        title={messagesList.warnings}
        onCancel={() => onCancel()}
        onOk={() => onOk()}
        footer={[
          <Button key="back" onClick={onCancel}>
            <FormattedMessage {...messages.cancel} />
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            <FormattedMessage {...messages.saveAnyway} />
          </Button>,
        ]}
      >
        {warnings.data &&
          Object.keys(warnings.data).map(
            el =>
              !isEmpty(warnings.data[el]) && (
                <ul className="error-save-modal-ul">
                  <FormattedMessage {...messages.assessment} /> {el}
                  {warnings.data[el].map(element => (
                    <li className="error-save-modal-li">{element}</li>
                  ))}
                </ul>
              ),
          )}
      </Modal>
    </div>
  )
}

ErrorSaveModal.propTypes = {
  skill: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(ErrorSaveModal)
