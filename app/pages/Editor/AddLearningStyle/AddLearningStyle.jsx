/**
 *
 * AddLearningStyle
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'antd'
import messages from './messages'
import './add-learning-style.scss'
import ChooseType from '../ChooseType'

function AddLearningStyle({ addLearningStyle, setIsAddLSVisible }) {
  const handleClick = type => {
    addLearningStyle({ type })
    setIsAddLSVisible(false)
  }
  return (
    <div className="add-learning-style">
      <Row gutter={24} type="flex" className="add-learning-style-row">
        <Col xs={12} className="add-learning-style-column">
          <ChooseType
            name={<FormattedMessage {...messages.templateWithTextImageCode} />}
            icon="file-text"
            handleClick={() => handleClick(0)}
          />
        </Col>
        <Col xs={12} className="add-learning-style-column">
          <ChooseType
            name={<FormattedMessage {...messages.templateWithVideo} />}
            icon="video-camera"
            handleClick={() => handleClick(1)}
          />
        </Col>
      </Row>
    </div>
  )
}

AddLearningStyle.propTypes = {
  addLearningStyle: PropTypes.func.isRequired,
  setIsAddLSVisible: PropTypes.func.isRequired,
}

export default memo(AddLearningStyle)
