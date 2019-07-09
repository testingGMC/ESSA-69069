import React, { memo } from 'react'
import { connect } from 'react-redux'
import LiveShare from './LiveShare'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { getConnectionStatus} from '../../redux/liveshare/selectors'
import makeSelectLiveShare from '../../redux/liveshare/selectors'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import * as actions from '../../redux/liveshare/actions'
import saga from '../../redux/liveshare/saga'
import reducer from '../../redux/liveshare/reducer'

const LiveShareIndex = props => {
    useInjectReducer({ key: 'liveshare', reducer })
    return <LiveShare {...props} />
  }
  
  const mapStateToProps = createStructuredSelector({
    liveshare: makeSelectLiveShare(),
    connectionStatus: getConnectionStatus()
  })
  
  const mapDispatchToProps = {
    ...actions,
  }
  
  const withSaga = injectSaga({ key: 'liveshare', saga, mode: DAEMON })
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  )
  
  export default compose(
    withConnect,
    memo,
    withSaga
  )(LiveShareIndex)
