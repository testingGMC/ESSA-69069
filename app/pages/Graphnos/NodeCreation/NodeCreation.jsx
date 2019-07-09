/**
 *
 * NodeCreation
 *
 */

import React, { memo, Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Form, Input, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import { NODE_TYPES, UPDATE, CREATION } from 'shared/constants'
import messages from './messages'
import './node-creation.scss'

const { Option } = Select
const { TextArea } = Input

class NodeCreation extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
    mode: PropTypes.string.isRequired,
    nodeName: PropTypes.string,
    nodeDescription: PropTypes.string,
    nodeType: PropTypes.number,
    nodeIcon: PropTypes.string,
    nodeCondition: PropTypes.string,
    nodeImage: PropTypes.string,
    nodeContent: PropTypes.string,
    nodeInstructions: PropTypes.string,
  }

  state = {
    type: NODE_TYPES.skill,
  }

  componentWillReceiveProps = props => {
    if (props.nodeType !== this.state.type && props.mode === UPDATE) {
      this.setState({
        type: props.nodeType,
      })
    }
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      mode,
      nodeName,
      nodeDescription,
      nodeIcon,
      nodeCondition,
      nodeImage,
      nodeContent,
      nodeInstructions,
      form: { getFieldDecorator },
    } = this.props
    const { type } = this.state
    return (
      <div className="node-creation">
        <Modal
          visible={isVisible}
          title={<FormattedMessage {...messages.title} />}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              <FormattedMessage {...messages.cancel} />
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {mode === CREATION ? (
                <FormattedMessage {...messages.create} />
              ) : (
                <FormattedMessage {...messages.update} />
              )}
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onKeyPress={e => {
              e.key === 'Enter' ? handleOk() : ''
            }}
          >
            <Form.Item label={<FormattedMessage {...messages.type} />}>
              {getFieldDecorator('type', {
                initialValue: mode === UPDATE ? type : NODE_TYPES.skill,
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage {...messages.isRequired} />,
                  },
                ],
              })(
                <Select
                  onChange={e => {
                    this.setState({ type: e })
                  }}
                  disabled={mode === UPDATE}
                >
                  <Option value={NODE_TYPES.skill}>
                    <FormattedMessage {...messages.skill} />
                  </Option>
                  <Option value={NODE_TYPES.superSkill}>
                    <FormattedMessage {...messages.superSkill} />
                  </Option>
                  <Option value={NODE_TYPES.track}>
                    <FormattedMessage {...messages.track} />
                  </Option>
                  <Option value={NODE_TYPES.checkpoint}>
                    <FormattedMessage {...messages.checkpoint} />
                  </Option>
                  <Option value={NODE_TYPES.reward}>
                    <FormattedMessage {...messages.reward} />
                  </Option>
                  <Option value={NODE_TYPES.workshop}>
                    <FormattedMessage {...messages.workshop} />
                  </Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label={<FormattedMessage {...messages.name} />}>
              {getFieldDecorator('name', {
                initialValue: mode === UPDATE ? nodeName : '',
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage {...messages.isRequired} />,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            {type === NODE_TYPES.checkpoint && (
              <Fragment>
                <Form.Item label={<FormattedMessage {...messages.image} />}>
                  {getFieldDecorator('image', {
                    initialValue: mode === UPDATE ? nodeImage : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage {...messages.instructions} />}
                >
                  {getFieldDecorator('instructions', {
                    initialValue: mode === UPDATE ? nodeInstructions : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={<FormattedMessage {...messages.content} />}>
                  {getFieldDecorator('content', {
                    initialValue: mode === UPDATE ? nodeContent : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<TextArea rows={4} />)}
                </Form.Item>
              </Fragment>
            )}
            {Number(type) === NODE_TYPES.reward && (
              <Fragment>
                <Form.Item label={<FormattedMessage {...messages.icon} />}>
                  {getFieldDecorator('icon', {
                    initialValue: mode === UPDATE ? nodeIcon : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={<FormattedMessage {...messages.condition} />}>
                  {getFieldDecorator('condition', {
                    initialValue: mode === UPDATE ? nodeCondition : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Fragment>
            )}
            {Number(type) === NODE_TYPES.workshop && (
              <Fragment>
                <Form.Item label={<FormattedMessage {...messages.image} />}>
                  {getFieldDecorator('image', {
                    initialValue: mode === UPDATE ? nodeImage : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={<FormattedMessage {...messages.content} />}>
                  {getFieldDecorator('content', {
                    initialValue: mode === UPDATE ? nodeContent : '',
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage {...messages.isRequired} />,
                      },
                    ],
                  })(<TextArea rows={4} />)}
                </Form.Item>
              </Fragment>
            )}
            <Form.Item label={<FormattedMessage {...messages.description} />}>
              {getFieldDecorator('description', {
                initialValue: mode === UPDATE ? nodeDescription : '',
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage {...messages.isRequired} />,
                  },
                ],
              })(<TextArea rows={4} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default memo(NodeCreation)
