import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { setDidUpdate } from '../../redux/editor/actions'
import makeSelectEditor, {
  getData,
  getChangeTracking,
} from '../../redux/editor/selectors'
import { getConnection, getConnected } from '../../redux/liveshare/selectors'
import LiveShareChangeTracker from './LiveShareChangeTracker'
import * as actions from '../../redux/liveshare/actions'
import saga from '../../redux/liveshare/saga'
import editorSaga from '../../redux/editor/saga'

import reducer from '../../redux/liveshare/reducer'
import editorReducer from '../../redux/editor/reducer'

const LiveShareChangeTrackerIndex = props => {
  useInjectReducer({ key: 'liveshare', reducer })
  useInjectReducer({ key: 'editor', reducer: editorReducer })
  return <LiveShareChangeTracker {...props} />
}

const mapStateToProps = createStructuredSelector({
  connection: getConnection(),
  data: getData(),
  trackChanges: getChangeTracking(),
  isConnected: getConnected(),
  skill: makeSelectEditor(),
})

const mapDispatchToProps = {
  ...actions,
  setDidUpdate,
}

const withSaga = injectSaga({ key: 'liveshare', saga, mode: DAEMON })
const withEditorSaga = injectSaga({
  key: 'editor',
  saga: editorSaga,
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
  withEditorSaga,
)(LiveShareChangeTrackerIndex)
