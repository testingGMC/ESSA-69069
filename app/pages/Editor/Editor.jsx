/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/**
 *
 * Editor
 *
 */

import React, { useState, useEffect } from 'react'
import ColorHash from 'color-hash'
import PropTypes from 'prop-types'
import initials from 'initials'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Helmet } from 'react-helmet'
import LiveShareSelection from 'shared/components/LiveShareSelection'
import {
  Row,
  Col,
  Icon,
  Avatar,
  Tooltip,
  Drawer,
  Popconfirm,
  Badge,
  Spin,
} from 'antd'
import { Link } from 'react-router-dom'
import routes from 'shared/routes'
import { EDITOR_CONTENT_ID } from 'shared/redux/editor/utils/editorConstants'
import { isEmpty } from 'lodash'
import LiveShareChangeTracker from 'shared/components/LiveShareChangeTracker'
import ReplicatedPageManager from 'shared/utils/CRDT/replicated-page-manager'

import messages from './messages'
import MdxPage from './MdxPage'
import Chat from './Chat'
import './editor.scss'
import AsideBar from './AsideBar'
import AddLearningStyle from './AddLearningStyle'
import AddPage from './AddPage'
import AddAssessment from './AddAssessment'
import ReorderChallenge from './ReorderChallenge'
import CodeCompiling from './CodeCompiling'
import Quiz from './Quiz'
import FillInTheBlanks from './FillInTheBlanks/index'
import 'easymde/dist/easymde.min.css'
import CRDTEditor from './CrdtEditor'
import ErrorSaveModal from './ErrorSaveModal'
import { HubConnectionState } from '@aspnet/signalr'

const replicatedPageManager = new ReplicatedPageManager()

const Editor = ({
  match: {
    params: { skillId },
  },
  skill,
  connection,
  isConnectedToLiveshare,
  connectionStatus,
  connectedUsers,
  instantMessages,
  createOrLoadSkillInstance,
  closeOrUnloadSkillInstance,
  sendContentOperationMessage,
  setPageContent,
  sendChatMessage,
  learningStyles,
  assessments,
  keywords,
  fetchSkill,
  updateSkill,
  addLearningStyle,
  addPage,
  deletePage,
  deleteLearningStyle,
  updateSelectedLearningStyleId,
  updateReorderChallengeQuestion,
  addAssessment,
  deleteAssessment,
  updateSelectedAssessmentId,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  updateSelectedKeywordId,
  addReorderChallengeStatement,
  updateReorderChallengeStatement,
  deleteReorderChallengeStatement,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  updateQuizLanguage,
  updateQuizCode,
  addQuizChoice,
  updateQuizChoice,
  deleteQuizChoice,
  addFibElement,
  updateFibElement,
  deleteFibElement,
  updateSelectedPageId,
  updateCodeCompilingQuestion,
  updateCodeCompilingLanguage,
  updateCodeCompilingSolution,
  updateCodeCompilingPlaceholder,
  updateCodeCompilingAddUseCase,
  updateCodeCompilingDeleteUseCase,
  updateCodeCompilingUpdateUseCase,
  push,
  intl,
  clearState,
  selections,
}) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [isAddLSVisible, setIsAddLSVisible] = useState()
  const [isAddPageVisible, setIsAddPageVisible] = useState(false)
  const [isAddAssessmentVisible, setIsAddAssessmentVisible] = useState(false)
  const [readMessagesCount, setReadMessagesCount] = useState(0)
  const [col, setCol] = useState(20)
  const [isModal, setIsModal] = useState(false)
  replicatedPageManager.setSendCallback((operations, pageId, medium) => {
    sendContentOperationMessage(skillId, pageId, operations, medium)
  })
  replicatedPageManager.setConnectionStatus(connectionStatus)

  const toggleIsChatVisible = () => {
    setIsChatVisible(!isChatVisible)
  }

  useEffect(
    () => () => {
      clearState()
    },
    [],
  )

  useEffect(() => {
    fetchSkill(skillId)
    createOrLoadSkillInstance(skillId)
  }, [skillId])

  useEffect(() => {
    if (isEmpty(learningStyles)) {
      setIsAddLSVisible(true)
    }
  }, [learningStyles])

  useEffect(() => {
    if (isEmpty(skill.selectedLearningStyleId)) {
      setCol(24)
    } else {
      setCol(20)
    }
  }, [skill])

  const renderAssessment = () => {
    switch (skill.data[skill.selectedAssessmentId].type) {
      case 0:
        return (
          <Quiz
            assessment={skill.data[skill.selectedAssessmentId]}
            skill={skill}
            addQuizQuestion={addQuizQuestion}
            updateQuizQuestion={updateQuizQuestion}
            deleteQuizQuestion={deleteQuizQuestion}
            updateQuizLanguage={updateQuizLanguage}
            updateQuizCode={updateQuizCode}
            addQuizChoice={addQuizChoice}
            updateQuizChoice={updateQuizChoice}
            deleteQuizChoice={deleteQuizChoice}
            selections={selections}
          />
        )
      case 1:
        return (
          <ReorderChallenge
            assessment={skill.data[skill.selectedAssessmentId]}
            skill={skill}
            addReorderChallengeStatement={addReorderChallengeStatement}
            updateReorderChallengeStatement={updateReorderChallengeStatement}
            deleteReorderChallengeStatement={deleteReorderChallengeStatement}
            updateReorderChallengeQuestion={updateReorderChallengeQuestion}
            selections={selections}
          />
        )
      case 2:
        return (
          <FillInTheBlanks
            assessment={skill.data[skill.selectedAssessmentId]}
            skill={skill}
            addFibElement={addFibElement}
            updateFibElement={updateFibElement}
            deleteFibElement={deleteFibElement}
            selections={selections}
          />
        )
      case 3:
        return (
          <CodeCompiling
            assessment={skill.data[skill.selectedAssessmentId]}
            skill={skill}
            updateCodeCompilingQuestion={updateCodeCompilingQuestion}
            updateCodeCompilingLanguage={updateCodeCompilingLanguage}
            updateCodeCompilingSolution={updateCodeCompilingSolution}
            updateCodeCompilingPlaceholder={updateCodeCompilingPlaceholder}
            updateCodeCompilingAddUseCase={updateCodeCompilingAddUseCase}
            updateCodeCompilingDeleteUseCase={updateCodeCompilingDeleteUseCase}
            updateCodeCompilingUpdateUseCase={updateCodeCompilingUpdateUseCase}
            selections={selections}
          />
        )
      default:
    }
  }
  const colorHash = new ColorHash()
  const getEditorContentId = () => document.getElementById(EDITOR_CONTENT_ID)
  const isThereASkillBefore = () =>
    !isEmpty(skill.data.simulatedNodes) &&
    skill.data.id !== skill.data.simulatedNodes[0]
  const isThereASkillAfter = () =>
    !isEmpty(skill.data.simulatedNodes) &&
    skill.data.id !==
      skill.data.simulatedNodes[skill.data.simulatedNodes.length - 1]
  const goNextSkill = () => {
    const skillPos = skill.data.simulatedNodes.findIndex(
      nodeId => nodeId === skill.data.id,
    )

    const newSkillId = skill.data.simulatedNodes[skillPos + 1]
    push(routes.EDITOR.linkPath(newSkillId))
  }
  const goPreviousSkill = () => {
    const skillPos = skill.data.simulatedNodes.findIndex(
      nodeId => nodeId === skill.data.id,
    )

    const newSkillId = skill.data.simulatedNodes[skillPos - 1]
    push(routes.EDITOR.linkPath(newSkillId))
  }
  const renderClose = () => {
    if (skill.didUpdate) {
      return (
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessageClose} />}
          onConfirm={() => {
            closeOrUnloadSkillInstance(skillId)
            push(
              routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.skillNetwork),
            )
          }}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          <div>
            <FormattedMessage {...messages.close} />
          </div>
        </Popconfirm>
      )
    }

    return (
      <Link
        to={routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.skillNetwork)}
      >
        <FormattedMessage {...messages.close} />
      </Link>
    )
  }
  const renderNextOrPrevious = (icon, callback) => {
    if (skill.didUpdate) {
      return (
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessageClose} />}
          onConfirm={callback}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          <Icon type={icon} className="skill-arrow" />
        </Popconfirm>
      )
    }

    return <Icon type={icon} className="skill-arrow" onClick={callback} />
  }
  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }

  const renderConnectingStatus = () => {
    if (connectionStatus === HubConnectionState.Connected) {
      return <FormattedMessage {...messages.connected} />
    }
    if (connectionStatus === 2) {
      return <FormattedMessage {...messages.reconnecting} />
    }
    return <FormattedMessage {...messages.disconnected} />
  }
  const renderConnectingClass = () => {
    let className = 'status'
    if (connectionStatus === HubConnectionState.Connected) {
      className += ' connected'
    } else if (connectionStatus === 2) {
      className += ' reconnecting'
    } else {
      className += ' disconnected'
    }
    return className
  }
  return (
    <div
      className="editor"
      onKeyPress={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
      onKeyUp={e => e.stopPropagation()}
      onKeyPressCapture={e => e.stopPropagation()}
    >
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>
      <LiveShareChangeTracker skillId={skillId} />
      <Row gutter={24} type="flex" className="editor-header">
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className="right-actions">
            <Icon
              type="save"
              className="save"
              onClick={() => setIsModal(true)}
              style={{
                color: skill.didUpdate ? 'red' : 'inherit',
              }}
            />
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className="title">{skill.data.name}</div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <div className="left-actions global-flex-horizontal-end">
            <div className="users">
              {connectedUsers &&
                connectedUsers.map((user, index) => (
                  <Tooltip
                    title={user.fullName}
                    arrowPointAtCenter
                    key={user.id}
                  >
                    <Avatar
                      className="connected-user-avatar"
                      style={{
                        left: `${-8 * index}px`,
                        backgroundColor: colorHash.hex(user.fullName),
                      }}
                      alt={user.fullName}
                    >
                      {initials(user.fullName)}
                    </Avatar>
                  </Tooltip>
                ))}
            </div>

            <div className="close global-flex-vertical-horizontal-center">
              {renderClose()}
            </div>
          </div>
        </Col>
      </Row>
      <Spin spinning={skill.loading}>
        <Row
          gutter={24}
          type="flex"
          className="editor-content"
          id={EDITOR_CONTENT_ID}
        >
          {!isEmpty(skill.selectedLearningStyleId) && (
            <Col xs={4} className="col-pages">
              <div className="pages">
                <>
                  {skill.selectedLearningStyleId &&
                    skill.data[skill.selectedLearningStyleId] &&
                    skill.data[skill.selectedLearningStyleId].pages &&
                    skill.data[skill.selectedLearningStyleId].pages.map(
                      (pageId, index, array) => (
                        <div
                          className="mdx-box global-flex-vertical-horizontal-center"
                          key={index}
                        >
                          <div className="index">{index + 1}</div>
                          <LiveShareSelection
                            selections={selections}
                            id={pageId}
                            extendedStyle={{ width: 'fit-content' }}
                          >
                            <MdxPage
                              selected={skill.selectedPageId === pageId}
                              content={skill.data[pageId].content}
                              index={index + 1}
                              onClick={() => {
                                updateSelectedPageId(pageId)
                                setIsAddPageVisible(false)
                              }}
                            />
                          </LiveShareSelection>
                          {array.length !== 1 && (
                            <Popconfirm
                              placement="topLeft"
                              title={
                                <FormattedMessage
                                  {...messages.confirmMessagePage}
                                />
                              }
                              onConfirm={() => {
                                deletePage(
                                  pageId,
                                  skill.selectedLearningStyleId,
                                )
                              }}
                              okText={<FormattedMessage {...messages.yes} />}
                              cancelText={<FormattedMessage {...messages.no} />}
                            >
                              <Icon
                                type="delete"
                                theme="twoTone"
                                className="delete-page-icon"
                              />
                            </Popconfirm>
                          )}
                        </div>
                      ),
                    )}
                  {skill.selectedLearningStyleId && !isAddPageVisible && (
                    <div className="global-flex-vertical-horizontal-center learning-style-plus-icon">
                      <Icon
                        type="plus-circle"
                        theme="twoTone"
                        className="plus"
                        onClick={() => {
                          setIsAddPageVisible(true)
                        }}
                      />
                    </div>
                  )}
                </>
              </div>
            </Col>
          )}

          <Col xs={col}>
            {isEmpty(skill.selectedAssessmentId) && !skill.loading && (
              <div className="text-box-with-arrows">
                {isThereASkillBefore() &&
                  renderNextOrPrevious('caret-left', () => {
                    goPreviousSkill()
                    closeOrUnloadSkillInstance(skillId)
                  })}
                <div className="text-box">
                  {isAddLSVisible && isEmpty(skill.selectedLearningStyleId) && (
                    <AddLearningStyle
                      addLearningStyle={addLearningStyle}
                      setIsAddLSVisible={setIsAddLSVisible}
                    />
                  )}
                  {isAddPageVisible && (
                    <AddPage
                      type={skill.data[skill.selectedLearningStyleId].type}
                      learningStyleId={skill.selectedLearningStyleId}
                      addPage={addPage}
                      setIsAddPageVisible={setIsAddPageVisible}
                    />
                  )}
                  {isAddAssessmentVisible &&
                    isEmpty(skill.selectedLearningStyleId) && (
                    <AddAssessment
                      addAssessment={addAssessment}
                      setIsAddAssessmentVisible={setIsAddAssessmentVisible}
                      />
                  )}
                  {!isEmpty(skill.selectedLearningStyleId) &&
                    !isAddPageVisible &&
                    skill.data.learningStyles.map(ls =>
                      skill.data[ls].pages.map(pg => (
                        <CRDTEditor
                          key={pg}
                          crdtInformation={
                            skill.crdtInformation && skill.crdtInformation[pg]
                              ? skill.crdtInformation[pg]
                              : null
                          }
                          replicatedPageManager={replicatedPageManager}
                          replicatedPageOperations={
                            skill.replicatedPages && skill.replicatedPages[pg]
                              ? skill.replicatedPages[pg]
                              : null
                          }
                          collaborators={connectedUsers}
                          setPageContent={setPageContent}
                          pageId={pg}
                          page={
                            skill.data && skill.data[pg] ? skill.data[pg] : null
                          }
                          visible={pg === skill.selectedPageId}
                        />
                      )),
                    )}
                </div>
                {isThereASkillAfter() &&
                  renderNextOrPrevious('caret-right', () => {
                    goNextSkill()
                    closeOrUnloadSkillInstance(skillId)
                  })}
              </div>
            )}
            {!isEmpty(skill.selectedAssessmentId) && (
              <div className="assessment-box">{renderAssessment()}</div>
            )}
          </Col>

          <div className="drawer">
            <div
              className="div-primary"
              onClick={() => setIsDrawerVisible(true)}
            >
              <Icon type="menu-fold" />
            </div>
          </div>
        </Row>
      </Spin>
      <Row gutter={24} type="flex" className="editor-footer">
        <Col xs={4}>
          {/** use const for connectionStatus  */}
          <div className={renderConnectingClass()}>
            {renderConnectingStatus()}
          </div>
        </Col>
        <Col xs={16}>
          <div className="preview">
            <Icon type="code" className="footer-icon" />
            <Icon type="desktop" className="footer-icon" />
            <Icon type="mobile" className="footer-icon" />
          </div>
        </Col>
        <Col xs={4}>
          <div className="footer-chat">
            {isConnectedToLiveshare &&
              instantMessages !== undefined &&
              instantMessages !== null &&
              readMessagesCount < instantMessages.length && (
                <Badge count={instantMessages.length - readMessagesCount}>
                <Icon
                    type="wechat"
                    className="footer-icon"
                    onClick={toggleIsChatVisible}
                  />
                </Badge>
              )}
            {isConnectedToLiveshare &&
              instantMessages !== undefined &&
              instantMessages !== null &&
              readMessagesCount >= instantMessages.length && (
                <Icon
                  type="wechat"
                  className="footer-icon"
                  onClick={toggleIsChatVisible}
                />
            )}
          </div>
        </Col>
      </Row>
      {isChatVisible &&
        instantMessages !== undefined &&
        instantMessages !== null &&
        instantMessages.length > readMessagesCount &&
        setReadMessagesCount(instantMessages.length)}
      {isChatVisible && (
        <Chat
          closeChat={toggleIsChatVisible}
          instantMessages={instantMessages}
          connection={connection}
          skillId={skillId}
          sendChatMessage={sendChatMessage}
        />
      )}
      {isDrawerVisible && (
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
          getContainer={getEditorContentId}
          style={{ position: 'relative' }}
        >
          <AsideBar
            selectedLearningStyleId={skill.selectedLearningStyleId}
            learningStyles={learningStyles}
            assessments={assessments}
            keywords={keywords}
            selectedKeywordId={skill.selectedKeywordId}
            setIsAddLSVisible={setIsAddLSVisible}
            setIsAddPageVisible={setIsAddPageVisible}
            setIsAddAssessmentVisible={setIsAddAssessmentVisible}
            setIsDrawerVisible={setIsDrawerVisible}
            deleteLearningStyle={deleteLearningStyle}
            updateSelectedLearningStyleId={updateSelectedLearningStyleId}
            deleteAssessment={deleteAssessment}
            updateSelectedAssessmentId={updateSelectedAssessmentId}
            addKeyword={addKeyword}
            updateKeyword={updateKeyword}
            deleteKeyword={deleteKeyword}
            updateSelectedKeywordId={updateSelectedKeywordId}
            selections={selections}
          />
        </Drawer>
      )}

      {isModal && (
        <ErrorSaveModal
          skill={skill}
          onCancel={() => setIsModal(false)}
          onOk={() => {
            updateSkill(skillId, skill)
            setIsModal(false)
          }}
        />
      )}
    </div>
  )
}

Editor.propTypes = {
  skill: PropTypes.object,
  match: PropTypes.object.isRequired,
  learningStyles: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  assessments: PropTypes.array.isRequired,
  connectedUsers: PropTypes.array,
  fetchSkill: PropTypes.func.isRequired,
  updateSkill: PropTypes.func.isRequired,
  addLearningStyle: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  deleteLearningStyle: PropTypes.func.isRequired,
  updateSelectedLearningStyleId: PropTypes.func.isRequired,
  addAssessment: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  updateSelectedAssessmentId: PropTypes.func.isRequired,
  addKeyword: PropTypes.func.isRequired,
  updateKeyword: PropTypes.func.isRequired,
  deleteKeyword: PropTypes.func.isRequired,
  updateSelectedKeywordId: PropTypes.func.isRequired,
  updateSelectedPageId: PropTypes.func.isRequired,
  updateReorderChallengeQuestion: PropTypes.func.isRequired,
  addReorderChallengeStatement: PropTypes.func.isRequired,
  updateReorderChallengeStatement: PropTypes.func.isRequired,
  deleteReorderChallengeStatement: PropTypes.func.isRequired,
  updateCodeCompilingQuestion: PropTypes.func.isRequired,
  updateCodeCompilingLanguage: PropTypes.func.isRequired,
  updateCodeCompilingSolution: PropTypes.func.isRequired,
  updateCodeCompilingPlaceholder: PropTypes.func.isRequired,
  updateCodeCompilingAddUseCase: PropTypes.func.isRequired,
  updateCodeCompilingDeleteUseCase: PropTypes.func.isRequired,
  updateCodeCompilingUpdateUseCase: PropTypes.func.isRequired,
  addQuizQuestion: PropTypes.func.isRequired,
  updateQuizQuestion: PropTypes.func.isRequired,
  deleteQuizQuestion: PropTypes.func.isRequired,
  updateQuizLanguage: PropTypes.func.isRequired,
  updateQuizCode: PropTypes.func.isRequired,
  addQuizChoice: PropTypes.func.isRequired,
  updateQuizChoice: PropTypes.func.isRequired,
  deleteQuizChoice: PropTypes.func.isRequired,
  addFibElement: PropTypes.func.isRequired,
  updateFibElement: PropTypes.func.isRequired,
  deleteFibElement: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  clearState: PropTypes.func.isRequired,
  connection: PropTypes.object.isRequired,
  isConnectedToLiveshare: PropTypes.bool.isRequired,
  connectionStatus: PropTypes.number.isRequired,
  instantMessages: PropTypes.array.isRequired,
  createOrLoadSkillInstance: PropTypes.func.isRequired,
  closeOrUnloadSkillInstance: PropTypes.func.isRequired,
  sendContentOperationMessage: PropTypes.func.isRequired,
  setPageContent: PropTypes.func.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
  selections: PropTypes.object,
}

export default injectIntl(Editor)
