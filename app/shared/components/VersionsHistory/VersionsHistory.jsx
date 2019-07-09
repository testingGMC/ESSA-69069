/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import initials from 'initials'
import { groupBy, map, isEmpty } from 'lodash'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { Drawer, Timeline, Icon, Spin, Tooltip, Avatar } from 'antd'
import ColorHash from 'color-hash'

import { Link } from 'react-router-dom'
import routes from 'shared/routes'
import { renderFullName } from 'shared/utils/user.helper'
import { isFirstIndex } from 'shared/utils/array.helper'
import { isContentArchitect } from 'shared/utils/access-token'
import messages from './messages'
import './versions-history.scss'

function VersionsHistory({
  commits,
  isVisible,
  onClose,
  fetchLatestCommits,
  revertToACommit,
  profile,
}) {
  const {
    data: { roles },
  } = profile
  useEffect(() => {
    fetchLatestCommits()
  }, [])

  const groups = groupBy(commits.latestCommits, x =>
    moment(x.date)
      .startOf('day')
      .format(),
  )
  const groupedCommits = map(groups, (group, day) => ({
    day,
    times: group,
  }))

  const sliceString = (message, from, to) =>
    message && message.slice(from, message.indexOf(to))
  const displayThreeDots = message => message && message.includes('(') && '...'
  const colorHash = new ColorHash()

  return (
    <div className="versions-history">
      <Drawer
        width={300}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isVisible}
        bodyStyle={{
          backgroundColor: '#2a4bd8',
          color: ' #fff',
          height: '100%',
          padding: '0',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        getContainer={() => document.getElementById('app')}
      >
        <div className="drawer-header-versions-history global-flex-horizontal-between">
          <div>
            <FormattedMessage {...messages.versionsHistory} />
          </div>
          <Icon type="close" onClick={onClose} />
        </div>
        <Spin
          spinning={
            commits !== undefined && commits.latestLoading !== undefined
              ? commits.latestLoading
              : false
          }
        >
          <div className="drawer-content-timeline">
            <Timeline>
              {groupedCommits.map((groupedCommit, k) => (
                <Timeline.Item color="white" key={k}>
                  <>
                    {moment(groupedCommit.day).calendar()}
                    {groupedCommit.times.map((commit, index, a) => (
                      <div
                        key={commit.id}
                        className={`timeline-detail ${index === a.length &&
                          'last'}`}
                      >
                        <div className="timeline-commit-title global-flex-horizontal-between">
                          <Tooltip title={commit.message}>
                            <span>
                              {sliceString(commit.message, 0, '(')}
                              {displayThreeDots(commit.message)}
                            </span>
                          </Tooltip>
                          {!isFirstIndex(index) && isContentArchitect(roles) && (
                            <Icon
                              type="undo"
                              onClick={() => {
                                revertToACommit(
                                  commit.id,
                                  `Revert back to ${commit.id}`,
                                  `Revert back to ${commit.id}`,
                                )
                                onClose()
                              }}
                            />
                          )}
                        </div>
                        <div className="timeline-commit-date">
                          {moment(commit.date).fromNow()}
                        </div>
                        <div className="timeline-commit-owner global-flex-vertical-center">
                          <Avatar
                            style={{
                              backgroundColor: colorHash.hex(
                                renderFullName(commit.author.fullName),
                              ),
                            }}
                          >
                            {initials(renderFullName(commit.author.fullName))}
                          </Avatar>
                          <div className="timeline-commit-owner-name">
                            {renderFullName(commit.author.fullName)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                </Timeline.Item>
              ))}
            </Timeline>
            <div className="see-all global-flex-horizontal-end">
              <Link to={routes.COMMITS.path} onClick={onClose}>
                <FormattedMessage {...messages.seeAll} />
              </Link>
            </div>
          </div>
        </Spin>
      </Drawer>
    </div>
  )
}

VersionsHistory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  commits: PropTypes.object.isRequired,
  fetchLatestCommits: PropTypes.func.isRequired,
  revertToACommit: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default memo(VersionsHistory)
