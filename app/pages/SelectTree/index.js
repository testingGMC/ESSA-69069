/**
 *
 * SelectTree
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import reducer from '../../shared/redux/selectTree/reducer'

import * as actions from '../../shared/redux/selectTree/actions'

import saga from '../../shared/redux/selectTree/saga'
import SelectTree from './SelectTree'
import makeSelectTrees from '../../shared/redux/selectTree/selectors'

const SelectTreeIndex = props => {
  useInjectReducer({ key: 'trees', reducer })
  return <SelectTree {...props} />
}

const mapStateToProps = () => ({
  trees: [],
})
const mapDispatchToProps = {
  ...actions,
}
const withSaga = injectSaga({ key: 'trees', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(SelectTreeIndex)
