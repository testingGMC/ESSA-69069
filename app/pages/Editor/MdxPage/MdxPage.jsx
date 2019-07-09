/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * MdxPage
 *
 */

import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './mdx-page.scss'

function preview(markdown) {
  return <ReactMarkdown source={markdown} escapeHtml={false} />
}

function MdxPage({ selected, content, index, onClick }) {
  return (
    <div
      className={`mdx-page${selected === true ? ' selected-page' : ''}${
        content === undefined || content === null || isEmpty(content)
          ? ' page-title'
          : ''
      }`}
      onClick={onClick}
    >
      {(content === undefined || content === null || isEmpty(content)) && (
        <FormattedMessage
          id={messages.header.id}
          defaultMessage={`${messages.header.defaultMessage} ${index}`}
        />
      )}
      {content !== undefined &&
        content !== null &&
        !isEmpty(content) &&
        preview(content)}
    </div>
  )
}

MdxPage.propTypes = {
  selected: PropTypes.bool.isRequired,
  content: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default memo(MdxPage)
