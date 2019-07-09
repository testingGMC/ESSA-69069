/**
 *
 * ProjectDetails
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectProjectDetails from 'shared/redux/selectedproject/selectors'
import reducer from 'shared/redux/selectedproject/reducer'

import * as actions from 'shared/redux/selectedproject/actions'

import saga from 'shared/redux/selectedproject/saga'
import { DAEMON } from 'utils/constants'
import ProjectDetails from './ProjectDetails'

const ProjectDetailsIndex = props => {
  useInjectReducer({ key: 'selectedProject', reducer })
  return <ProjectDetails {...props} />
}
const withSaga = injectSaga({ key: 'selectedProject', saga, mode: DAEMON })

const mapStateToProps = createStructuredSelector({
  selectedProject: makeSelectProjectDetails(),
})

const mapDispatchToProps = {
  ...actions,
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  withSaga,
  memo,
)(ProjectDetailsIndex)
