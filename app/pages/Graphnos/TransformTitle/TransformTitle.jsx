/**
 *
 * TransformTitle
 *
 */

import React, { memo } from 'react'
import { PageHeader, Col } from 'antd'
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './transform-title.scss'

function TransformTitle() {
  return (
    <div className="transformtitle">
      <Col span={5}>
        <PageHeader
          onBack={() => {
            window.history.back()
          }}
          title={<FormattedMessage {...messages.title} />}
        />
      </Col>
    </div>
  )
}

TransformTitle.propTypes = {}

export default memo(TransformTitle)
