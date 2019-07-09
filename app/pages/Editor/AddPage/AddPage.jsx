/**
 *
 * AddPage
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'antd'
import messages from './messages'
import './add-page.scss'
import ChooseType from '../ChooseType'
import {
  TEMPLATE_WITH_TEXT,
  TEMPLATE_WITH_VIDEO,
} from 'shared/redux/editor/utils/editorConstants'

function AddPage({ learningStyleId, type, addPage, setIsAddPageVisible }) {
  const handleClick = typeVar => {
    addPage({ type: typeVar }, learningStyleId)
    setIsAddPageVisible(false)
  }
  return (
    <div className="add-page">
      <Row gutter={24} type="flex" className="add-page-row">
        {type === TEMPLATE_WITH_TEXT && (
          <>
            <Col xs={8} className="add-page-column">
              <ChooseType
                name={<FormattedMessage {...messages.templateWithTextOnly} />}
                icon="file-text"
                handleClick={() => handleClick(TEMPLATE_WITH_TEXT)}
              />
            </Col>
            <Col xs={8} className="add-page-column">
              <ChooseType
                name={
                  <FormattedMessage {...messages.templateWithTextAndImage} />
                }
                icon="file-text"
                handleClick={() => handleClick(TEMPLATE_WITH_TEXT)}
              />
            </Col>
            <Col xs={8} className="add-page-column">
              <ChooseType
                name={
                  <FormattedMessage {...messages.templateWithTextAndCode} />
                }
                icon="file-text"
                handleClick={() => handleClick(TEMPLATE_WITH_TEXT)}
              />
            </Col>
          </>
        )}

        {type === TEMPLATE_WITH_VIDEO && (
          <Col xs={24} className="add-learning-style-column">
            <ChooseType
              name={<FormattedMessage {...messages.templateWithVideo} />}
              icon="video-camera"
              handleClick={() => handleClick(TEMPLATE_WITH_VIDEO)}
            />
          </Col>
        )}
      </Row>
    </div>
  )
}

AddPage.propTypes = {
  learningStyleId: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  addPage: PropTypes.func.isRequired,
  setIsAddPageVisible: PropTypes.func.isRequired,
}

export default memo(AddPage)
