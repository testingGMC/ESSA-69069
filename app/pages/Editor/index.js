/**
 *
 * Editor
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import {
  getInstanceCollaborators,
  getInstantMessages,
  getConnection,
  getConnected,
  getConnectionStatus,
} from 'shared/redux/liveshare/selectors'
import makeSelectEditor, {
  getLearningStyles,
  getAssessments,
  getKeywords,
  getSelections,
} from 'shared/redux/editor/selectors'
import reducer from 'shared/redux/editor/reducer'
import liveShareReducer from 'shared/redux/liveshare/reducer'
import * as actions from 'shared/redux/editor/actions'
import * as liveshareActions from 'shared/redux/liveshare/actions'
import saga from 'shared/redux/editor/saga'
import liveshareSaga from 'shared/redux/liveshare/saga'

import Editor from './Editor'

const EditorIndex = props => {
  useInjectReducer({ key: 'editor', reducer })
  useInjectReducer({ key: 'liveshare', reducer: liveShareReducer })
  return <Editor {...props} />
}

const mapStateToProps = createStructuredSelector({
  skill: makeSelectEditor(),
  learningStyles: getLearningStyles(),
  assessments: getAssessments(),
  keywords: getKeywords(),
  connectedUsers: getInstanceCollaborators(),
  instantMessages: getInstantMessages(),
  connection: getConnection(),
  isConnectedToLiveshare: getConnected(),
  connectionStatus: getConnectionStatus(),
  selections: getSelections(),
})

const mapDispatchToProps = {
  ...actions,
  ...liveshareActions,
  push,
}

const withSaga = injectSaga({ key: 'editor', saga, mode: DAEMON })
const withSagaLiveShare = injectSaga({
  key: 'liveshare',
  saga: liveshareSaga,
  mode: DAEMON,
})
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
  withSagaLiveShare,
)(EditorIndex)
