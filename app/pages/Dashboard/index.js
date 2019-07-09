/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectProject from '../../shared/redux/projects/selectors'
import reducer from '../../shared/redux/projects/reducer'

import * as actions from '../../shared/redux/projects/actions'

import saga from '../../shared/redux/projects/saga'

import Dashboard from './Dashboard'

const ProjectsIndex = props => {
  useInjectReducer({ key: 'projects', reducer })
  return <Dashboard {...props} />
}

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProject(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'projects', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(ProjectsIndex)
