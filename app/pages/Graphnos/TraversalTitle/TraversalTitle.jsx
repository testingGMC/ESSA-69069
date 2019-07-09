/**
 *
 * TraversalTitle
 *
 */

import React, { memo } from 'react'
import { PageHeader, Col } from 'antd'
import PropTypes from 'prop-types'

import './traversal-title.scss'

function SimulateTitle({ nodeName }) {
  return (
    <div className="simulatetitle">
      <Col span={12}>
        <PageHeader
          onBack={() => {
            window.history.back()
          }}
          title={nodeName}
        />
      </Col>
    </div>
  )
}

SimulateTitle.propTypes = {
  nodeName: PropTypes.string.isRequired,
}

export default memo(SimulateTitle)
