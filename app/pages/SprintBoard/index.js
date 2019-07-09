/**
 *
 * SprintBoard
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'

import makeSelectProjectDetails, {
  getMembers,
} from 'shared/redux/selectedproject/selectors'
import reducerProjectDetails from 'shared/redux/selectedproject/reducer'
import * as actionsProjectDetails from 'shared/redux/selectedproject/actions'
import sagaProjectDetails from 'shared/redux/selectedproject/saga'

import makeSelectSprints, {
  getSelectedSprintId,
  getErrors,
} from 'shared/redux/sprints/selectors'
import reducer from 'shared/redux/sprints/reducer'
import * as actions from 'shared/redux/sprints/actions'
import saga from 'shared/redux/sprints/saga'
import { push } from 'connected-react-router'
import SprintBoard from './SprintBoard'

const SprintBoardIndex = props => {
  useInjectReducer({ key: 'sprints', reducer })
  useInjectReducer({ key: 'selectedProject', reducer: reducerProjectDetails })

  return <SprintBoard {...props} />
}

const mapStateToProps = createStructuredSelector({
  sprints: makeSelectSprints(),
  selectedProject: makeSelectProjectDetails(),
  selectedSprintId: getSelectedSprintId(),
  errors: getErrors(),
  members: getMembers(),
})

const mapDispatchToProps = {
  ...actions,
  ...actionsProjectDetails,
  push,
}

const withSaga = injectSaga({ key: 'sprints', saga, mode: DAEMON })
const withSagaProjectDetails = injectSaga({
  key: 'selectedProject',
  saga: sagaProjectDetails,
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
  withSagaProjectDetails,
)(SprintBoardIndex)
