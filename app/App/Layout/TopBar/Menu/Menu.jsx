/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 *
 * Menu
 *
 */

import React, { memo, useState } from 'react'

import { Menu as MenuOfAnt, Dropdown } from 'antd'
import useWindowSize from '@rehooks/window-size'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import routes from 'shared/routes'
import VersionsHistory from 'shared/components/VersionsHistory'
import messages from './messages'
import './menu.scss'

const menuItemsMobile = (
  <MenuOfAnt onClick={e => e}>
    <MenuOfAnt.Item key="1">
      <FormattedMessage {...messages.logout} />
    </MenuOfAnt.Item>

    <MenuOfAnt.Item key="2">
      <Link to={routes.DASHBOARD.path}>
        <FormattedMessage {...messages.dashboard} />
      </Link>
    </MenuOfAnt.Item>
    <MenuOfAnt.Item key="3">
      <Link
        to={routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.skillNetwork)}
      >
        <FormattedMessage {...messages.graph} />
      </Link>
    </MenuOfAnt.Item>
    <MenuOfAnt.Item key="4">
      <Link to={routes.ISSUES.path}>
        <FormattedMessage {...messages.issues} />
      </Link>
    </MenuOfAnt.Item>
    <MenuOfAnt.Item key="5">
      <Link to={routes.STUDENTLIST.path}>
        Studen List
      </Link>
    </MenuOfAnt.Item>
  </MenuOfAnt>
)
const menuItems = (
  <MenuOfAnt>
    <MenuOfAnt.Item key="1">
      <FormattedMessage {...messages.logout} />
    </MenuOfAnt.Item>
  </MenuOfAnt>
)

function Menu() {
  const windowSize = useWindowSize()
  const [isHistoryVisible, setIsHistoryVisible] = useState(false)
  return (
    <div className="titan-menu global-flex-horizontal-end">
      <img
        src={require('../../../../assets/icons/timeline.png')}
        alt="versions icon"
        className="versions-icon"
        onClick={() => setIsHistoryVisible(true)}
      />
      <Dropdown
        overlay={windowSize.innerWidth < 992 ? menuItemsMobile : menuItems}
        overlayStyle={{ width: '110px' }}
        trigger={['click']}
        placement="bottomRight"
      >
        <img
          src={require('../../../../assets/images/TopBar/cog.png')}
          alt="cog"
        />
      </Dropdown>
      {isHistoryVisible && (
        <VersionsHistory
          isVisible={isHistoryVisible}
          onClose={() => setIsHistoryVisible(false)}
        />
      )}
    </div>
  )
}

export default memo(Menu)
