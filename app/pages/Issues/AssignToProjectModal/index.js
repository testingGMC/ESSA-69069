/**
 *
 * AssignToProjectModal
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'

import makeSelectSprints from 'shared/redux/sprints/selectors'
import reducer from 'shared/redux/sprints/reducer'
import * as actions from 'shared/redux/sprints/actions'
import saga from 'shared/redux/sprints/saga'

import AssignToProjectModal from './AssignToProjectModal'

const AssignToProjectModalIndex = props => {
  useInjectReducer({ key: 'sprints', reducer })

  return <AssignToProjectModal {...props} />
}

const mapStateToProps = createStructuredSelector({
  sprints: makeSelectSprints(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'sprints', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(AssignToProjectModalIndex)
