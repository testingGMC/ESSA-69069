/* eslint-disable react/prefer-stateless-function */
/**
 *
 * SprintModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, DatePicker } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import {
  YEAR_MONTH_DAY_DATE_FORMAT,
  MINIMUM_SPRINT_LENGTH,
} from 'shared/constants'
import messages from './messages'
import './sprint-modal.scss'

class SprintModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
    project: PropTypes.object.isRequired,
    startDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }

  isStartDateLimit = current => {
    const { project } = this.props

    if (project) {
      return (
        current &&
        (current <
          moment(project.startDate)
            .subtract(1, 'days')
            .endOf('day') ||
          current >
            moment(project.dueDate)
              .subtract(MINIMUM_SPRINT_LENGTH - 1, 'days')
              .endOf('day'))
      )
    }
    return false
  }

  isDueDateLimit = current => {
    const { project } = this.props

    if (project) {
      return (
        current &&
        (current <
          moment(project.startDate)
            .add(MINIMUM_SPRINT_LENGTH - 2, 'days')
            .endOf('day') ||
          current > moment(project.dueDate).endOf('day'))
      )
    }
    return false
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      form: { getFieldDecorator },
      project,
    } = this.props

    return (
      <Modal
        visible={isVisible}
        title={
          <FormattedMessage
            {...messages.manageSprint}
            values={{
              startDate: moment(project.startDate).format(
                YEAR_MONTH_DAY_DATE_FORMAT,
              ),
              dueDate: moment(project.dueDate).format(
                YEAR_MONTH_DAY_DATE_FORMAT,
              ),
            }}
          />
        }
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
        <Form layout="vertical">
          <Form.Item label={<FormattedMessage {...messages.startDate} />}>
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.startDateError} />,
                },
              ],
            })(
              <DatePicker
                className="sprint-date"
                disabledDate={current => this.isStartDateLimit(current)}
              />,
            )}
          </Form.Item>
          <Form.Item label={<FormattedMessage {...messages.dueDate} />}>
            {getFieldDecorator('dueDate', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.dueDateError} />,
                },
              ],
            })(
              <DatePicker
                className="sprint-date"
                disabledDate={current => this.isDueDateLimit(current)}
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(SprintModal)
