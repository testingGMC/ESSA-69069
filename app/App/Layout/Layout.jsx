/**
 *
 * Layout
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import TopBar from './TopBar'
import LiveShare from '../../shared/components/LiveShare'
import './layout.scss'

const Layout = ({ children }) => (
  <div className="layout">
    <LiveShare />
    <TopBar />
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
