/**
 *
 * Graphnos
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectGraphnos from 'shared/redux/graphnos/selectors'
import reducer from 'shared/redux/graphnos/reducer'
import liveShareReducer from 'shared/redux/liveshare/reducer'
import * as actions from 'shared/redux/graphnos/actions'
import liveshareSaga from 'shared/redux/liveshare/saga'
import saga from 'shared/redux/graphnos/saga'
import {
  getConnection,
  getConnected,
  getConnectionStatus,
} from 'shared/redux/liveshare/selectors'
import editorReducer from 'shared/redux/editor/reducer'
import editorSaga from 'shared/redux/editor/saga'
import { loadSimulatedNodes } from 'shared/redux/editor/actions'
import { push } from 'connected-react-router'

import Graphnos from './Graphnos'

const GraphnosIndex = props => {
  useInjectReducer({ key: 'graphnos', reducer })
  useInjectReducer({ key: 'editor', reducer: editorReducer })
  useInjectReducer({ key: 'liveshare', reducer: liveShareReducer })
  return <Graphnos {...props} />
}

const mapStateToProps = createStructuredSelector({
  graphnos: makeSelectGraphnos(),
  connection: getConnection(),
  isConnectedToLiveshare: getConnected(),
  connectionStatus: getConnectionStatus(),
})

const mapDispatchToProps = {
  ...actions,
  loadSimulatedNodes,
  push,
}

const withSaga = injectSaga({ key: 'graphnos', saga, mode: DAEMON })
const withSagaEditor = injectSaga({
  key: 'editor',
  saga: editorSaga,
  mode: DAEMON,
})
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
  withSagaEditor,
  withSagaLiveShare,
)(GraphnosIndex)
