/**
 *
 * SlideItem
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './slide-item.scss'

function SlideItem({ selected, index }) {
  return (
    <div className={`slide-item${selected === true ? ' selected-page' : ''}`}>
      <FormattedMessage
        id={messages.header.id}
        defaultMessage={`${messages.header.defaultMessage} ${index}`}
      />
    </div>
  )
}

SlideItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
}

export default memo(SlideItem)
