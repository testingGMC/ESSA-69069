/**
 *
 * NodeModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Radio } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './change-node-modal.scss'
const { TextArea } = Input
class ChangeNodeModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
    disabled: PropTypes.bool.isRequired,
    superDisabled: PropTypes.bool.isRequired,
  }

  state = {
    canUpload: true,
  }

  normFile = e => {
    this.setState({ canUpload: e.fileList.length === 0 })
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      form: { getFieldDecorator },
      node,
      disabled,
      superDisabled,
    } = this.props
    const { canUpload } = this.state

    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.Node} />}
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
          <Form.Item label={<FormattedMessage {...messages.nodeTitle} />}>
            {getFieldDecorator('nodeTitle', {
              initialValue: node && node.title,
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.nodeTitleError} />,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<FormattedMessage {...messages.description} />}>
            {getFieldDecorator('nodeDescription', {
              initialValue: node && node.description,
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage {...messages.nodeDescriptionError} />
                  ),
                },
              ],
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator('nodeType', {
              initialValue: '',
            })(
              <Radio.Group>
                <Radio disabled={superDisabled} value="skill">
                  skill
                </Radio>
                <Radio disabled={disabled} value="superskill">
                  superskill
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(ChangeNodeModal)
