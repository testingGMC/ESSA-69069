/**
 *
 * NewsItem
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './number-stats.scss'

const NumberStats = ({ image, number, text }) => (
  <Row gutter={24} className="number-stats" type="flex">
    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="number-image">
      <img src={image} alt="number" />
    </Col>
    <Col xs={18} sm={18} md={18} lg={18} xl={18}>
      <div className="number-description">
        <div className="number">{number}</div>
        <div className="number-text">{text}</div>
      </div>
    </Col>
  </Row>
)

NumberStats.propTypes = {
  image: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
}

export default memo(NumberStats)
