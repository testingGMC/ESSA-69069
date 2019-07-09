import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectProfile from 'shared/redux/profile/selectors'
import profileReducer from 'shared/redux/profile/reducer'
import profileSaga from 'shared/redux/profile/saga'
import makeSelectCommits from '../../redux/commits/selectors'
import reducer from '../../redux/commits/reducer'
import * as actions from '../../redux/commits/actions'
import saga from '../../redux/commits/saga'

import VersionsHistory from './VersionsHistory'

const VersionHistorySideBar = props => {
  useInjectReducer({ key: 'commits', reducer })
  useInjectReducer({ key: 'profile', reducer: profileReducer })
  return <VersionsHistory {...props} />
}

const mapStateToProps = createStructuredSelector({
  commits: makeSelectCommits(),
  profile: makeSelectProfile(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'commits', saga, mode: DAEMON })
const withSagaProfile = injectSaga({
  key: 'profile',
  saga: profileSaga,
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
  withSagaProfile,
)(VersionHistorySideBar)
