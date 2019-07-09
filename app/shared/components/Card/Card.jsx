/**
 *
 * Card
 *
 */

import React from 'react'
import { PropTypes } from 'prop-types'
import { Card as CardOfAntd } from 'antd'
import './card.scss'

function Card({
  title,
  extra,
  children,
  className,
  classNameCard,
  ...restOfProps
}) {
  return (
    <div className="card">
      <CardOfAntd
        size="small"
        className={classNameCard}
        title={title}
        extra={extra}
        bordered={false}
        {...restOfProps}
      >
        <div className={`content ${className}`}>{children}</div>
      </CardOfAntd>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  extra: PropTypes.any,
  className: PropTypes.string,
  classNameCard: PropTypes.string,
}
Card.defaultProps = {
  extra: null,
  className: '',
}

export default Card
