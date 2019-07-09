/**
 *
 * AddAssessment
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'antd'
import messages from './messages'
import ChooseType from '../ChooseType'
import { ASSESSMENTS } from '../constants'
import './add-assessment.scss'

function AddAssessment({ addAssessment, setIsAddAssessmentVisible }) {
  const handleClick = type => {
    addAssessment({ type })
    setIsAddAssessmentVisible(false)
  }
  return (
    <div className="add-assessment">
      <Row gutter={24} type="flex" className="add-assessment-row">
        {Object.keys(ASSESSMENTS).map(assKey => (
          <Col key={assKey} xs={6} className="add-assessment-column">
            <ChooseType
              key={ASSESSMENTS[assKey].key}
              name={
                <FormattedMessage
                  {...messages[ASSESSMENTS[assKey].formattedMessage]}
                />
              }
              icon={ASSESSMENTS[assKey].icon}
              handleClick={() => handleClick(ASSESSMENTS[assKey].key)}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

AddAssessment.propTypes = {
  addAssessment: PropTypes.func.isRequired,
  setIsAddAssessmentVisible: PropTypes.func.isRequired,
}

export default memo(AddAssessment)
