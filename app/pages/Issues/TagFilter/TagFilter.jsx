/**
 *
 * TagFilter
 *
 */

import React, { memo } from 'react'
import { Tag } from 'antd'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { STATUS } from 'shared/constants'
import messages from '../messages'
import './tag-filter.scss'

function TagFilter({ handleStatusValue, statusValue }) {
  return (
    <span className="tag-filter">
      {Object.keys(STATUS).map((status, index) => (
        <Tag.CheckableTag
          color={STATUS[status].color}
          key={STATUS[status].key}
          checked={STATUS[status].key === statusValue}
          onChange={() => handleStatusValue(STATUS[status].key)}
          className={`tag-${index + 1} ${STATUS[status].key === statusValue &&
            `tag-${index + 1}-checked`}`}
        >
          <FormattedMessage {...messages[STATUS[status].title.toLowerCase()]} />
        </Tag.CheckableTag>
      ))}
    </span>
  )
}

TagFilter.propTypes = {
  handleStatusValue: PropTypes.func,
  statusValue: PropTypes.number,
}

export default memo(TagFilter)
