/**
 *
 * TestCase
 *
 */

import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Button, Input, Popconfirm } from 'antd'
import Axios from 'axios'
import {
  JAVASCRIPT,
  LANGUAGES,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  COMPILING_ERROR,
  IN_QUEUE,
  PROCESSING,
  INTERNAL_ERROR,
  TIME_LIMIT_EXCEEDED,
} from 'shared/redux/editor/utils/editorConstants'
import codeCompilingmessages from '../CodeCompiling/messages'
import messages from './messages'
import './test-case.scss'

export function TestCase({
  el,
  assessment,
  skill,
  updateCodeCompilingUpdateUseCase,
  updateCodeCompilingDeleteUseCase,
  intl,
}) {
  const [isTest, setIsTest] = useState(false)
  const [token, setToken] = useState('')
  const [responseDescription, setResponseDescription] = useState('')
  const [responseId, setResponseId] = useState(0)
  const [correctResponse, setCorrectResponse] = useState('')

  const messagesList = {
    correctAnswer: intl.formatMessage({
      ...messages.correctAnswer,
    }),
    wrongAnswer: intl.formatMessage({
      ...messages.wrongAnswer,
    }),
    compilationError: intl.formatMessage({
      ...messages.compilationError,
    }),
    runtimeError: intl.formatMessage({
      ...messages.runtimeError,
    }),
    tryAgain: intl.formatMessage({
      ...messages.tryAgain,
    }),
    areYouSure: intl.formatMessage({
      ...messages.areYouSure,
    }),
    yes: intl.formatMessage({
      ...messages.yes,
    }),
    no: intl.formatMessage({
      ...messages.no,
    }),
  }

  function testApi() {
    Axios.get(
      `https://api.judge0.com/submissions/${token}?base64_encoded=false`,
    )
      .then(res => {
        setResponseId(res.data.status.id)
        setCorrectResponse(res.data.stdout)
        setIsTest(false)
        if (
          res.data.status.id === IN_QUEUE ||
          res.data.status.id === PROCESSING ||
          res.data.status.id === TIME_LIMIT_EXCEEDED
        ) {
          setTimeout(() => {
            testApi()
          }, 2000)
        } else if (res.data.status.id === CORRECT_ANSWER) {
          setResponseDescription(messagesList.correctAnswer)
        } else if (res.data.status.id === WRONG_ANSWER) {
          setResponseDescription(messagesList.wrongAnswer)
        } else if (res.data.status.id === COMPILING_ERROR) {
          setResponseDescription(messagesList.compilationError)
        } else if (
          res.data.status.id >= COMPILING_ERROR &&
          res.data.status.id <= INTERNAL_ERROR
        ) {
          setResponseDescription(messagesList.runtimeError)
        } else setResponseDescription(messagesList.tryAgain)
      })
      .catch(() => {
        setResponseDescription(messagesList.tryAgain)
        setIsTest(false)
      })
  }

  useEffect(() => {
    if (isTest) {
      Axios.post('https://api.judge0.com/submissions', {
        source_code: skill.data[assessment.solutionId].text,
        language_id: isEmpty(skill.data[assessment.languageId].text)
          ? JAVASCRIPT
          : LANGUAGES[skill.data[assessment.languageId].text].label,
        stdin: skill.data[el].input,
        expected_output: skill.data[el].output,
      })
        .then(res => {
          setToken(res.data.token)
        })
        .catch(() => {
          setResponseDescription(messagesList.tryAgain)
          setIsTest(false)
        })
    }
  }, [isTest])

  useEffect(() => {
    if (token !== '') {
      setTimeout(() => {
        testApi()
      }, 3000)
    }
  }, [token])

  return (
    <div className="test-case input-output-row">
      <Input.TextArea
        type="text"
        className="input"
        value={skill.data[el] ? skill.data[el].input : ''}
        onChange={e =>
          updateCodeCompilingUpdateUseCase(el, assessment.id, {
            input: e.target.value,
            output: skill.data[el].output,
          })
        }
      />
      <Input.TextArea
        type="text"
        className={`output ${
          responseId === CORRECT_ANSWER
            ? 'green-border'
            : responseId === WRONG_ANSWER
              ? 'red-border'
              : 'default-border'
        }`}
        value={skill.data[el] ? skill.data[el].output : ''}
        onChange={e =>
          updateCodeCompilingUpdateUseCase(el, assessment.id, {
            input: skill.data[el].input,
            output: e.target.value,
          })
        }
      />
      <div>
        <Button
          loading={isTest}
          className="test-btn"
          onClick={() => {
            setIsTest(true)
          }}
          type="primary"
        >
          <FormattedMessage {...messages.test} />
        </Button>
        <span className="answer">{responseDescription}</span>
        {responseId === 4 && (
          <span className="answer">
            ({messagesList.correctAnswer} : ({correctResponse}) )
          </span>
        )}
      </div>
      {assessment.testCases && assessment.testCases.length !== 1 && (
        <Popconfirm
          title={messagesList.areYouSure}
          onConfirm={() => {
            updateCodeCompilingDeleteUseCase(skill.data[el].id, assessment.id)
          }}
          okText={messagesList.yes}
          cancelText={messagesList.no}
        >
          <Button className="delete-btn" type="danger">
            <FormattedMessage {...codeCompilingmessages.delete} />
          </Button>
        </Popconfirm>
      )}
    </div>
  )
}

TestCase.propTypes = {
  el: PropTypes.string.isRequired,
  assessment: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  updateCodeCompilingUpdateUseCase: PropTypes.func.isRequired,
  updateCodeCompilingDeleteUseCase: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default memo(injectIntl(TestCase))
