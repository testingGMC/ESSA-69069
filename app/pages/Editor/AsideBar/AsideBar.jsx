/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * AsideBar
 *
 */

import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import LiveShareSelection from 'shared/components/LiveShareSelection'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { UPDATE_MODE, ADD_MODE } from 'shared/constants'
import './aside-bar.scss'
import {
  Menu,
  Icon,
  Popconfirm,
  Input,
  Button,
  Tag,
  Dropdown,
  Alert,
} from 'antd'
import { ASSESSMENTS } from '../constants'
import messages from './messages'
import SlideItem from '../SlideItem'

const contextMenu = link => (
  <Menu>
    <Menu.Item key="1">
      <a href={link} target="blank">
        <FormattedMessage {...messages.openTheLink} />
      </a>
    </Menu.Item>
  </Menu>
)

const { SubMenu } = Menu
function AsideBar({
  learningStyles,
  assessments,
  keywords,
  selectedLearningStyleId,
  selectedKeywordId,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  setIsAddLSVisible,
  setIsDrawerVisible,
  setIsAddPageVisible,
  deleteLearningStyle,
  updateSelectedLearningStyleId,
  setIsAddAssessmentVisible,
  deleteAssessment,
  updateSelectedAssessmentId,
  updateSelectedKeywordId,
  intl,
  selections,
}) {
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3']
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const [keywordName, setKeywordName] = useState('')
  const [keywordLink, setKeywordLink] = useState('')
  const [modeKeyword, setModeKeyWord] = useState(ADD_MODE)
  const onOpenChange = openKeysVar => {
    const latestOpenKey = openKeysVar.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeysVar)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const placeholders = {
    keywordName: intl.formatMessage({ ...messages.keywordName }),
    keywordLink: intl.formatMessage({ ...messages.keywordLink }),
  }
  const renderAssessment = type => (
    <div className="aside-assessment">
      <Icon
        type={ASSESSMENTS[type].icon}
        theme="twoTone"
        className="aside-assessment-icon"
      />
      <div className="aside-assessment-title">{ASSESSMENTS[type].title}</div>
    </div>
  )
  const handleManageKeyword = () => {
    if (keywordName && keywordLink) {
      if (modeKeyword === ADD_MODE) {
        addKeyword({ name: keywordName, link: keywordLink })
      } else if (modeKeyword === UPDATE_MODE) {
        updateKeyword(selectedKeywordId, {
          name: keywordName,
          link: keywordLink,
        })
      }
      setModeKeyWord(ADD_MODE)
      setKeywordName('')
      setKeywordLink('')
    }
  }
  const prepareUpdating = keyword => {
    setModeKeyWord(UPDATE_MODE)
    setKeywordName(keyword.name)
    setKeywordLink(keyword.link)
    updateSelectedKeywordId(keyword.id)
  }
  return (
    <div className="aside-bar">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 250 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="file-word" />
              <span>
                <FormattedMessage {...messages.learningStyles} />
              </span>
            </span>
          }
        >
          {learningStyles.map((ls, index, array) => (
            <Menu.Item key={ls.id}>
              <div
                className="global-flex-vertical-horizontal-center"
                onClick={() => {
                  updateSelectedLearningStyleId(ls.id)
                  setIsAddPageVisible(false)
                  setIsDrawerVisible(false)
                }}
              >
                <SlideItem
                  selected={selectedLearningStyleId === ls.id}
                  index={index + 1}
                />
                {array.length !== 1 && (
                  <Popconfirm
                    placement="topLeft"
                    title={<FormattedMessage {...messages.confirmMessageLS} />}
                    onConfirm={e => {
                      e.stopPropagation()
                      deleteLearningStyle(ls.id)
                    }}
                    okText={<FormattedMessage {...messages.yes} />}
                    cancelText={<FormattedMessage {...messages.no} />}
                  >
                    <Icon
                      type="delete"
                      theme="twoTone"
                      className="delete-page-icon"
                      onClick={e => e.stopPropagation()}
                    />
                  </Popconfirm>
                )}
              </div>
            </Menu.Item>
          ))}
          <Menu.Item key="2">
            <div className="global-flex-vertical-horizontal-center learning-style-plus-icon">
              <Icon
                type="plus-circle"
                theme="twoTone"
                className="plus"
                onClick={() => {
                  setIsDrawerVisible(false)
                  setIsAddLSVisible(true)
                  updateSelectedLearningStyleId('')
                  updateSelectedAssessmentId('')
                }}
              />
            </div>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="code" />
              <span>
                <FormattedMessage {...messages.assessments} />
              </span>
            </span>
          }
        >
          {assessments.map(ass => (
            <Menu.Item key={ass.id}>
              <div
                className="global-flex-vertical-horizontal-center"
                onClick={() => {
                  updateSelectedAssessmentId(ass.id)
                  updateSelectedLearningStyleId('')
                  setIsDrawerVisible(false)
                }}
              >
                {renderAssessment(ass.type)}
                <Popconfirm
                  placement="topLeft"
                  title={<FormattedMessage {...messages.confirmMessageAss} />}
                  onConfirm={e => {
                    e.stopPropagation()
                    deleteAssessment(ass.id)
                  }}
                  okText={<FormattedMessage {...messages.yes} />}
                  cancelText={<FormattedMessage {...messages.no} />}
                >
                  <Icon
                    type="delete"
                    theme="twoTone"
                    className="delete-page-icon"
                    onClick={e => e.stopPropagation()}
                  />
                </Popconfirm>
              </div>
            </Menu.Item>
          ))}
          {learningStyles.length !== 0 ? (
            <Menu.Item key="5">
              <div className="global-flex-vertical-horizontal-center learning-style-plus-icon">
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  className="plus"
                  onClick={() => {
                    setIsDrawerVisible(false)
                    setIsAddAssessmentVisible(true)
                    setIsAddLSVisible(false)
                    setIsAddPageVisible(false)
                    updateSelectedAssessmentId('')
                    updateSelectedLearningStyleId('')
                  }}
                />
              </div>
            </Menu.Item>
          ) : (
            <div className="global-flex-vertical-horizontal-center fix-width-message">
              <Alert
                message={<FormattedMessage {...messages.asFirstStep} />}
                type="info"
              />
            </div>
          )}
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="key" />
              <span>
                <FormattedMessage {...messages.keywords} />
              </span>
            </span>
          }
        >
          <div
            className="keywords-form"
            onKeyPress={e => {
              e.key === 'Enter' ? handleManageKeyword() : ''
            }}
          >
            <Input
              placeholder={placeholders.keywordName}
              value={keywordName}
              onChange={e => setKeywordName(e.target.value)}
            />

            <Input
              placeholder={placeholders.keywordLink}
              value={keywordLink}
              onChange={e => setKeywordLink(e.target.value)}
            />
            <Button
              type="primary"
              onClick={handleManageKeyword}
              disabled={!keywordName || !keywordLink}
            >
              {modeKeyword === ADD_MODE && (
                <FormattedMessage {...messages.addKeyword} />
              )}
              {modeKeyword === UPDATE_MODE && (
                <FormattedMessage {...messages.updateKeyword} />
              )}
            </Button>
          </div>
          <div className="keywords-list">
            {keywords.map(
              keyword =>
                keyword.id !== selectedKeywordId && (
                  <Dropdown
                    overlay={contextMenu(keyword.link)}
                    trigger={['contextMenu']}
                    key={keyword.id}
                  >
                    <LiveShareSelection
                      selections={selections}
                      id={keyword.id}
                      extendedStyle={{ width: 'fit-content' }}
                    >
                      <Tag
                        closable
                        onClose={e => {
                          e.stopPropagation()
                          deleteKeyword(keyword.id)
                        }}
                        onClick={() => prepareUpdating(keyword)}
                      >
                        {keyword.name}
                      </Tag>
                    </LiveShareSelection>
                  </Dropdown>
                ),
            )}
          </div>
        </SubMenu>
      </Menu>
    </div>
  )
}

AsideBar.propTypes = {
  learningStyles: PropTypes.array.isRequired,
  assessments: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  selectedLearningStyleId: PropTypes.string,
  selectedKeywordId: PropTypes.string,
  setIsAddLSVisible: PropTypes.func.isRequired,
  setIsAddPageVisible: PropTypes.func.isRequired,
  setIsDrawerVisible: PropTypes.func.isRequired,
  deleteLearningStyle: PropTypes.func.isRequired,
  updateSelectedLearningStyleId: PropTypes.func.isRequired,
  setIsAddAssessmentVisible: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  updateSelectedAssessmentId: PropTypes.func.isRequired,
  addKeyword: PropTypes.func.isRequired,
  updateKeyword: PropTypes.func.isRequired,
  deleteKeyword: PropTypes.func.isRequired,
  updateSelectedKeywordId: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  selections: PropTypes.array,
}

export default memo(injectIntl(AsideBar))
