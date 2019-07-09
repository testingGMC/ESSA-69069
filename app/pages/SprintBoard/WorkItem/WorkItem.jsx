/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * WorkItem
 *
 */

import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import initials from 'initials'
import { Avatar, Icon, Button, Tooltip } from 'antd'
import { isEmpty } from 'lodash'
import ColorHash from 'color-hash'

import './work-item.scss'
import { renderFullName } from 'shared/utils/user.helper'

function WorkItem({
  name,
  completionDate,
  type,
  fullName,
  menu,
  workItem,
  setSelectedWorkItem,
  setIsUpdateWorkItemModalVisible,
  isUpdateWorkItemModalVisible,
  setIsAddWorkItemModalVisible,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    if (isUpdateWorkItemModalVisible) {
      setIsMenuOpen(false)
    }
  }, [isUpdateWorkItemModalVisible])
  const colorHash = new ColorHash()
  return (
    <>
      <div className={` work-item ${type ? 'bug' : 'task'}`}>
        <div className="name global-flex-vertical-center">
          <Icon type="right" className="icon" />
          <span
            className="span-name"
            onClick={() => {
              setSelectedWorkItem(workItem)
              setIsUpdateWorkItemModalVisible(true)
              setIsAddWorkItemModalVisible(false)
            }}
          >
            {name}
          </span>
        </div>
        <div className="rest-of-details global-flex-horizontal-first">
          <div className="image">
            {!isEmpty(fullName) && (
              <Tooltip title={fullName}>
                <Avatar
                  style={{
                    backgroundColor: colorHash.hex(fullName),
                  }}
                >
                  {initials(renderFullName(fullName))}
                </Avatar>
              </Tooltip>
            )}
          </div>
          <div className="date">{completionDate}</div>
        </div>
        <div className="top-right">
          <Button
            shape="circle"
            icon="more"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        {isMenuOpen && <div className="menu">{menu}</div>}
      </div>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="user-card-overlay-block"
        />
      )}
    </>
  )
}

WorkItem.propTypes = {
  name: PropTypes.string.isRequired,
  completionDate: PropTypes.object,
  type: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  menu: PropTypes.any.isRequired,
  workItem: PropTypes.object.isRequired,
  setSelectedWorkItem: PropTypes.func.isRequired,
  isUpdateWorkItemModalVisible: PropTypes.bool,
  setIsUpdateWorkItemModalVisible: PropTypes.func.isRequired,
  setIsAddWorkItemModalVisible: PropTypes.func.isRequired,
}

export default memo(WorkItem)
