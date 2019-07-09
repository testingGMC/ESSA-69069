/* eslint-disable react/prefer-stateless-function */
/**
 *
 * WorkItemModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Radio, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './work-item-modal.scss'

class WorkItemModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    workItem: PropTypes.object,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    sprints: PropTypes.array.isRequired,
    sprintId: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    memberId: PropTypes.string.isRequired,
    form: PropTypes.any,
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      name,
      description,
      type,
      sprints,
      sprintId,
      members,
      memberId,
      form: { getFieldDecorator },
    } = this.props
    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.addWorkItem} />}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {<FormattedMessage {...messages.cancel} />}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {<FormattedMessage {...messages.validate} />}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onKeyPress={e => {
            e.key === 'Enter' ? handleOk() : ''
          }}
        >
          <Form.Item label={<FormattedMessage {...messages.name} />}>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.nameError} />,
                },
              ],
            })(<Input />)}
          </Form.Item>
          {name && (
            <>
              <Form.Item label={<FormattedMessage {...messages.description} />}>
                {getFieldDecorator('description', {
                  initialValue: description,
                })(
                  <Input.TextArea autosize={{ minRows: '6', maxRows: '6' }} />,
                )}
              </Form.Item>

              <Form.Item label={<FormattedMessage {...messages.assignTo} />}>
                {getFieldDecorator('assignedTo', {
                  initialValue: memberId.toString(),
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    optionFilterProp="children"
                  >
                    {members.map(member => (
                      <Select.Option
                        key={member.memberId}
                        value={member.memberId.toString()}
                      >
                        {member.fullName}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>

              <Form.Item label={<FormattedMessage {...messages.type} />}>
                {getFieldDecorator('type', {
                  initialValue: `${type}`,
                })(
                  <Radio.Group>
                    <Radio value="0">
                      <FormattedMessage {...messages.task} />
                    </Radio>
                    <Radio value="1">
                      <FormattedMessage {...messages.bug} />
                    </Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label={<FormattedMessage {...messages.sprint} />}>
                {getFieldDecorator('sprintId', {
                  initialValue: sprintId,
                  rules: [
                    {
                      required: true,
                      message: <FormattedMessage {...messages.sprintError} />,
                    },
                  ],
                })(
                  <Select>
                    {sprints.map(s => (
                      <Select.Option key={s.id} value={s.id}>
                        {s.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    )
  }
}

export default memo(WorkItemModal)
