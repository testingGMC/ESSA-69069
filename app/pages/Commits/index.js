/**
 *
 * Commits
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectCommits from '../../shared/redux/commits/selectors'
import reducer from '../../shared/redux/commits/reducer'

import * as actions from '../../shared/redux/commits/actions'

import saga from '../../shared/redux/commits/saga'

import Commits from './Commits'

const CommitsIndex = props => {
  useInjectReducer({ key: 'commits', reducer })

  return <Commits {...props} />
}

const mapStateToProps = createStructuredSelector({
  commits: makeSelectCommits(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'commits', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(CommitsIndex)
