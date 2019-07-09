/**
 *
 * FourOfFour
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'

import FourOfFour from './FourOfFour'

const FourOfFourIndex = props => {
  return <FourOfFour {...props} />
}

const mapDispatchToProps = {}

const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(FourOfFourIndex)
