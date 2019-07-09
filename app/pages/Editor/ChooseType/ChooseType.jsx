/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * ChooseType
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import './choose-type.scss'

function ChooseType({ name, icon, handleClick }) {
  return (
    <div className="learning-style-type" onClick={handleClick}>
      <Icon type={icon} theme="twoTone" className="learning-style-type-icon" />
      <div className="learning-style-type-name">{name}</div>
    </div>
  )
}

ChooseType.propTypes = {
  name: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default ChooseType
