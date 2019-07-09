import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Button, Modal, Form, DatePicker, Input } from 'antd'
import messages from './messages'
import './project-modal.scss'

const { RangePicker } = DatePicker

class ProjectModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    project: PropTypes.object,
    form: PropTypes.any,
  }

  state = {}

  handleSubmit = e => {
    const { handleOk } = this.props
    if (e.key === 'Enter') {
      handleOk()
    }
  }

  isStartDateLimit = current =>
    current &&
    current <
      moment()
        .subtract(1, 'days')
        .endOf('day')

  isDueDateLimit = current => {
    const { project } = this.props

    if (project) {
      return (
        current &&
        current <
          moment(project.dueDate)
            .subtract(1, 'days')
            .endOf('day')
      )
    }
    return false
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      project,
      form: { getFieldDecorator },
    } = this.props
    return (
      <div className="create-card">
        <Modal
          title={<FormattedMessage {...messages.project} />}
          visible={isVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              <FormattedMessage {...messages.cancel} />
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {<FormattedMessage {...messages.validate} />}
            </Button>,
          ]}
        >
          <Form layout="vertical" onKeyPress={e => this.handleSubmit(e)}>
            <Form.Item label={<FormattedMessage {...messages.projectName} />}>
              {getFieldDecorator('name', {
                initialValue: project ? project.name : '',
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.projectNameError} />
                    ),
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<FormattedMessage {...messages.description} />}>
              {getFieldDecorator('description', {
                initialValue: project ? project.description : '',
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.descriptionError} />
                    ),
                  },
                ],
              })(<Input.TextArea autosize={{ minRows: '6', maxRows: '6' }} />)}
            </Form.Item>
            {!project && (
              <Form.Item label={<FormattedMessage {...messages.startDate} />}>
                {getFieldDecorator('startDate', {
                  initialValue: project ? moment(project.startDate) : '',
                  rules: [
                    {
                      required: true,
                      message: (
                        <FormattedMessage {...messages.startDateError} />
                      ),
                    },
                  ],
                })(
                  <DatePicker
                    className="project-date"
                    disabledDate={current => this.isStartDateLimit(current)}
                  />,
                )}
              </Form.Item>
            )}
            <Form.Item label={<FormattedMessage {...messages.dueDate} />}>
              {getFieldDecorator('dueDate', {
                initialValue: project ? moment(project.dueDate) : '',
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage {...messages.dueDateError} />,
                  },
                ],
              })(
                <DatePicker
                  className="project-date"
                  // disabledDate={current =>
                  //   current && current < moment(project.dueDate).endOf('day')
                  // }
                  disabledDate={current => this.isDueDateLimit(current)}
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default memo(ProjectModal)
