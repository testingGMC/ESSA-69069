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

import './node-root-modal.scss'

const { TextArea } = Input
class NodeRootModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
  }

  state = {
    canUpload: true,
  }

  // @review : duplicate function
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
              initialValue: 'skill',
            })(
              <Radio.Group>
                <Radio value="skill">skill</Radio>
                <Radio value="superskill">superskill</Radio>
                <Radio value="track">track</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(NodeRootModal)
