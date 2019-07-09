/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Quiz
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Button, Popconfirm, Switch, Radio, Select } from 'antd'
import {
  QUIZ_QUESTION_WITH_ONLY_TEXT,
  QUIZ_QUESTION_WITH_CODE,
  LANGUAGES,
  JAVASCRIPT,
} from 'shared/redux/editor/utils/editorConstants'
import { isEmpty } from 'lodash'
import Card from 'shared/components/Card'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import AceEditor from 'react-ace'
import LiveShareSelection from 'shared/components/LiveShareSelection'
import messages from './messages'
import 'brace/mode/jsx'

import 'brace/mode/javascript'
import 'brace/snippets/javascript'

import 'brace/mode/java'
import 'brace/snippets/java'

import 'brace/mode/python'
import 'brace/snippets/python'

import 'brace/mode/ruby'
import 'brace/snippets/ruby'

import 'brace/mode/csharp'
import 'brace/snippets/csharp'

import 'brace/mode/elixir'
import 'brace/snippets/elixir'

import 'brace/ext/language_tools'
import 'brace/ext/searchbox'
import 'brace/theme/monokai'
import './quiz.scss'

function Quiz({
  assessment,
  skill,
  addQuizQuestion,
  updateQuizQuestion,
  updateQuizLanguage,
  updateQuizCode,
  deleteQuizQuestion,
  addQuizChoice,
  updateQuizChoice,
  deleteQuizChoice,
  intl,
  selections,
}) {
  const handleAddQuizQuestion = () => {
    addQuizQuestion(
      { text: '', questionType: QUIZ_QUESTION_WITH_ONLY_TEXT, choices: [] },
      assessment.id,
    )
  }

  const hasReachChoicesLimit = questionId =>
    skill.data[questionId].choices.length >= 4
  const handleChangeQuizType = (e, questionId) =>
    updateQuizQuestion(
      questionId,
      { questionType: e.target.value },
      assessment.id,
    )

  return (
    <div className="quiz">
      <div className="assessment-title">
        {<FormattedMessage {...messages.quiz} />}
      </div>
      <div className="quiz-content">
        {isEmpty(assessment.questions) && (
          <div className="quiz-add-content">
            <div className="quiz-add-question" onClick={handleAddQuizQuestion}>
              <Icon
                type="plus-circle"
                theme="twoTone"
                className="quiz-add-question-icon"
              />
              <div className="quiz-add-question-title">
                {<FormattedMessage {...messages.startAdding} />}
              </div>
            </div>
          </div>
        )}
        {assessment.questions.map((questionId, index) => (
          <Card
            title={`question ${index + 1}`}
            classNameCard="question-card"
            extra={
              <div className="global-flex-horizontal-end">
                <Popconfirm
                  placement="topLeft"
                  title={
                    <FormattedMessage {...messages.confirmMessageQuestion} />
                  }
                  onConfirm={() =>
                    deleteQuizQuestion(questionId, assessment.id)
                  }
                  okText={<FormattedMessage {...messages.yes} />}
                  cancelText={<FormattedMessage {...messages.no} />}
                >
                  <Icon type="close" />
                </Popconfirm>
              </div>
            }
          >
            <div className="quiz-question-type">
              <Radio.Group
                onChange={e => handleChangeQuizType(e, questionId)}
                value={skill.data[questionId].questionType}
              >
                <Radio value={QUIZ_QUESTION_WITH_ONLY_TEXT}>
                  <FormattedMessage {...messages.onlyText} />
                </Radio>
                <Radio value={QUIZ_QUESTION_WITH_CODE}>
                  <FormattedMessage {...messages.withCode} />
                </Radio>
              </Radio.Group>
            </div>

            <LiveShareSelection
              selections={selections}
              id={questionId}
              extendedStyle={{
                paddingLeft: '5px',
                paddingRight: '5px',
                margin: '5px',
              }}
            >
              <Input
                placeholder={intl.formatMessage(
                  {
                    ...messages.questionIndex,
                  },
                  {
                    index: index + 1,
                  },
                )}
                value={skill.data[questionId].text}
                onChange={e =>
                  updateQuizQuestion(
                    questionId,
                    { text: e.target.value },
                    assessment.id,
                  )
                }
              />
              {skill.data[questionId].questionType ===
                QUIZ_QUESTION_WITH_CODE && (
                <>
                  <div className="quiz-question-language">
                    <Select
                      value={
                        isEmpty(
                          skill.data[skill.data[questionId].languageId].text,
                        )
                          ? LANGUAGES[JAVASCRIPT].key
                          : skill.data[skill.data[questionId].languageId].text
                      }
                      onChange={e =>
                        updateQuizLanguage(skill.data[questionId].languageId, e)
                      }
                    >
                      {Object.keys(LANGUAGES).map(langId => (
                        <Select.Option value={LANGUAGES[langId].key}>
                          {LANGUAGES[langId].label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="quiz-question-code">
                    <AceEditor
                      width="100"
                      height="200px"
                      className="editor"
                      placeholder={
                        isEmpty(
                          skill.data[skill.data[questionId].languageId].text,
                        )
                          ? LANGUAGES[JAVASCRIPT].label
                          : LANGUAGES[
                            skill.data[skill.data[questionId].languageId].text
                          ].label
                      }
                      mode={
                        isEmpty(
                          skill.data[skill.data[questionId].languageId].text,
                        )
                          ? LANGUAGES[JAVASCRIPT].label
                          : LANGUAGES[
                            skill.data[skill.data[questionId].languageId].text
                          ].label
                      }
                      theme="monokai"
                      onChange={e =>
                        updateQuizCode(skill.data[questionId].codeId, e)
                      }
                      value={skill.data[skill.data[questionId].codeId].text}
                      fontSize={14}
                    />
                  </div>
                </>
              )}
            </LiveShareSelection>
            <div className="div-buttons global-flex-horizontal-end">
              <Button
                type="primary"
                disabled={hasReachChoicesLimit(questionId)}
                onClick={() =>
                  addQuizChoice(
                    { text: '', isCorrect: false },
                    questionId,
                    assessment.id,
                  )
                }
              >
                {<FormattedMessage {...messages.addChoice} />}
              </Button>
            </div>
            {!isEmpty(skill.data[questionId].choices) && (
              <>
                <hr />
                <div className="choices-list-title">
                  {<FormattedMessage {...messages.choices} />}
                </div>
              </>
            )}

            {skill.data[questionId].choices.map((choiceId, cIndex) => (
              <LiveShareSelection
                selections={selections}
                id={choiceId}
                extendedStyle={{
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  margin: '5px',
                }}
              >
                <div className="choice-content">
                  <Input
                    placeholder={intl.formatMessage(
                      {
                        ...messages.choiceIndex,
                      },
                      {
                        index: cIndex + 1,
                      },
                    )}
                    value={skill.data[choiceId].text}
                    onChange={e =>
                      updateQuizChoice(
                        choiceId,
                        { text: e.target.value },
                        questionId,
                      )
                    }
                  />
                  <div className="div-buttons global-flex-horizontal-between">
                    <div className="choice-details">
                      {<FormattedMessage {...messages.isCorrect} />}
                      {`  `}
                      <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        checked={skill.data[choiceId].isCorrect}
                        onChange={checked =>
                          updateQuizChoice(
                            choiceId,
                            { isCorrect: checked },
                            questionId,
                          )
                        }
                      />
                    </div>
                    <Popconfirm
                      placement="topLeft"
                      title={
                        <FormattedMessage {...messages.confirmMessageChoice} />
                      }
                      onConfirm={() =>
                        deleteQuizChoice(choiceId, questionId, assessment.id)
                      }
                      cancelText={<FormattedMessage {...messages.no} />}
                    >
                      <Button type="danger">
                        {<FormattedMessage {...messages.deleteChoice} />}
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </LiveShareSelection>
            ))}
          </Card>
        ))}
        <div className="div-buttons global-flex-horizontal-end">
          {!isEmpty(assessment.questions) && (
            <Button type="primary" onClick={handleAddQuizQuestion}>
              {<FormattedMessage {...messages.addQuestion} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

Quiz.propTypes = {
  assessment: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  addQuizQuestion: PropTypes.func.isRequired,
  updateQuizQuestion: PropTypes.func.isRequired,
  deleteQuizQuestion: PropTypes.func.isRequired,
  updateQuizLanguage: PropTypes.func.isRequired,
  updateQuizCode: PropTypes.func.isRequired,
  addQuizChoice: PropTypes.func.isRequired,
  updateQuizChoice: PropTypes.func.isRequired,
  deleteQuizChoice: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  selections: PropTypes.array,
}

export default memo(injectIntl(Quiz))
