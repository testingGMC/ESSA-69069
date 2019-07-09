/**
 *
 * MarkAsModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import { STATUS } from 'shared/constants'
import messages from '../messages'
import './mark-as-modal.scss'

class MarkAsModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired,
    form: PropTypes.any,
  }

  state = {}

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      status,
      form: { getFieldDecorator },
    } = this.props

    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.markAs} />}
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
          <Form.Item label={<FormattedMessage {...messages.status} />}>
            {getFieldDecorator('status', {
              initialValue: status,
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.statusError} />,
                },
              ],
            })(
              <Select>
                {Object.keys(STATUS).map(s => (
                  <Select.Option key={STATUS[s].key} value={STATUS[s].key}>
                    {STATUS[s].title}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(MarkAsModal)
