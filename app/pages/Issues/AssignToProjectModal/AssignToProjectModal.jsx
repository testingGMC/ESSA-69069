/**
 *
 * AssignToProjectModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import './assign-to-project-modal.scss'

class AssignToProjectModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    issueName: PropTypes.string.isRequired,
    issueDescription: PropTypes.string.isRequired,
    sprints: PropTypes.object,
    projects: PropTypes.array.isRequired,
    fetchSprints: PropTypes.func.isRequired,
    form: PropTypes.any,
  }

  handleProjectId = projectId => {
    const { fetchSprints } = this.props
    fetchSprints(projectId)
    this.props.form.setFieldsValue({
      sprintId: '',
    })
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      issueName,
      issueDescription,
      sprints,
      projects,
      form: { getFieldDecorator, getFieldValue },
    } = this.props
    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.assignTo} />}
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
        <Form layout="vertical" onKeyPress={(e) => { e.key === "Enter" ? handleOk() : '' }}>
          <Form.Item label={<FormattedMessage {...messages.project} />}>
            {getFieldDecorator('projectId', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.projectError} />,
                },
              ],
            })(
              <Select
                showSearch
                placeholder={<FormattedMessage {...messages.project} />}
                optionFilterProp="children"
                onChange={this.handleProjectId}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {projects.map(s => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          {sprints.data && getFieldValue('projectId') && (
            <Form.Item label={<FormattedMessage {...messages.sprint} />}>
              {getFieldDecorator('sprintId', {
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage {...messages.sprintError} />,
                  },
                ],
              })(
                <Select>
                  {sprints.data.map(s => (
                    <Select.Option key={s.id} value={s.id}>
                      {s.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage {...messages.workItemName} />}>
            {getFieldDecorator('name', {
              initialValue: issueName,
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.workItemNameError} />,
                },
              ],
            })(
              <Input
                placeholder={<FormattedMessage {...messages.project} />}
              />,
            )}
          </Form.Item>
          <Form.Item
            label={<FormattedMessage {...messages.workItemDescription} />}
          >
            {getFieldDecorator('workItemName', {
              initialValue: issueDescription,
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage {...messages.workItemDescriptionError} />
                  ),
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'assign_to_project' })(
  memo(AssignToProjectModal),
)
