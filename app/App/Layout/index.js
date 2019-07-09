/**
 *
 * Layout
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'

import Layout from './Layout'

const LayoutIndex = props => { 
  return <Layout {...props} />
}

const mapDispatchToProps = {}

const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(LayoutIndex)
