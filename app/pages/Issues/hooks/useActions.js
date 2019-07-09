import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Select } from 'antd'
import { STATUS } from 'shared/constants'
import messages from '../messages'

const useActions = () => {
  const [actionId] = useState(1)
  const [issueId, setIssueId] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isMarkAsModalVisible, setIsMarkAsModalVisible] = useState(false)
  const [
    isAssignToProjectModalVisible,
    setIsAssignToProjectModalVisible,
  ] = useState(false)
  const handleChangeAction = (
    issueIdVar,
    statusVar,
    nameVar,
    descriptionVar,
    actionIdVar,
  ) => {
    if (actionIdVar !== '0') {
      setIssueId(issueIdVar)
      setStatus(statusVar)
      setName(nameVar)
      setDescription(descriptionVar)
      if (actionIdVar === '1') {
        setIsMarkAsModalVisible(true)
      }
      if (actionIdVar === '2') {
        setIsAssignToProjectModalVisible(true)
      }
    }
  }
  const columns = [
    {
      title: <FormattedMessage {...messages.status} />,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      fixed: 'left',
      width: 100,
      render: text => renderStatusColor(text),
    },
    {
      title: <FormattedMessage {...messages.name} />,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => (a.name < b.name ? -1 : 1),
    },
    {
      title: <FormattedMessage {...messages.description} />,
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => (a.description < b.description ? -1 : 1),
      width: '40%',
    },
    {
      title: <FormattedMessage {...messages.date} />,
      dataIndex: 'creationDateTime',
      key: 'creationDateTime',
      sorter: (a, b) => (a.creationDateTime < b.creationDateTime ? -1 : 1),
    },
    {
      title: <FormattedMessage {...messages.reporter} />,
      key: 'reportedBy',
      dataIndex: 'reportedBy',
      sorter: (a, b) => (a.reportedBy < b.reportedBy ? -1 : 1),
    },
    {
      title: <FormattedMessage {...messages.actions} />,
      key: 'actions',

      render: record => (
        <Select
          style={{ width: 120 }}
          onSelect={value =>
            handleChangeAction(
              record.id,
              record.status,
              record.name,
              record.description,
              value,
            )
          }
          placeholder={<FormattedMessage {...messages.actions} />}
        >
          <Select.Option value="1">
            <FormattedMessage {...messages.markAs} />
          </Select.Option>
          <Select.Option value="2">
            <FormattedMessage {...messages.assignTo} />
          </Select.Option>
        </Select>
      ),
    },
  ]
  return {
    columns,
    issueId,
    status,
    name,
    description,
    actionId,
    isMarkAsModalVisible,
    setIsMarkAsModalVisible,
    isAssignToProjectModalVisible,
    setIsAssignToProjectModalVisible,
  }
}

const renderStatusColor = status => (
  <i
    className="mdi mdi-checkbox-blank-circle "
    style={{
      color: STATUS[status].cssColor
        ? STATUS[status].cssColor
        : STATUS[status].color,
    }}
  />
)

export default useActions
