/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * UserCard
 *
 */

import React, { memo, useState } from 'react'
import ColorHash from 'color-hash'
import PropTypes from 'prop-types'
import { Avatar, Button } from 'antd'

import './user-card.scss'
import { isContentArchitect } from 'shared/utils/access-token'

function UserCard({ active, title, subTitle, menu, canDelete, roles }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const colorHash = new ColorHash()
  return (
    <React.Fragment>
      <div className="user-card">
        <div className="avatar">
          <Avatar
            size="large"
            style={{
              backgroundColor: colorHash.hex(title),
            }}
          >
            <span className="full-name-first-character">
              {title && title[0].toUpperCase()}
            </span>
            {title && title[title.indexOf(' ') + 1].toUpperCase()}
          </Avatar>
          {active && (
            <React.Fragment>
              <i className="mdi mdi-checkbox-blank-circle active-white" />
              <i className="mdi mdi-checkbox-blank-circle active " />
            </React.Fragment>
          )}
        </div>
        <div className="description">
          <div className="title">{title}</div>
          <div className="subtitle">{subTitle}</div>
        </div>
        {isContentArchitect(roles) && canDelete && (
          <div className="top-right">
            <Button
              shape="circle"
              icon="more"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        )}
        {isMenuOpen && <div className="menu">{menu}</div>}
      </div>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="user-card-overlay-block"
        />
      )}
    </React.Fragment>
  )
}

UserCard.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  menu: PropTypes.any.isRequired,
  canDelete: PropTypes.bool.isRequired,
  roles: PropTypes.array.isRequired,
}
UserCard.defaultProps = {
  active: false,
}

export default memo(UserCard)
