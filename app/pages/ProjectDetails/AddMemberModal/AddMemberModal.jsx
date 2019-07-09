import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import { fetchMembersByNameOrEmail } from 'shared/services/project.service'
import messages from './messages'
import './add-member-modal.scss'

class AddMemberModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    membersIds: PropTypes.array.isRequired,
    form: PropTypes.any,
  }

  state = {
    users: [],
  }

  handleChangeNameOrEmail = async filter => {
    const { membersIds } = this.props
    const users = await fetchMembersByNameOrEmail(filter)

    const filteredUsers = users.model.filter(
      user => !membersIds.includes(user.id.toString()),
    )

    this.setState({ users: filteredUsers })
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      form: { getFieldDecorator },
    } = this.props
    const { users } = this.state
    const options = users.map(d => (
      <Select.Option key={d.id}>
        {`${d.userName} < ${d.email} > `}
      </Select.Option>
    ))

    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.addMember} />}
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
          <Form.Item label={<FormattedMessage {...messages.search} />} >
            {getFieldDecorator('memberId', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.searchError} />,
                },
              ],
            })(
              <Select
                showSearch
                value={this.state.value}
                placeholder={<FormattedMessage {...messages.search} />}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleChangeNameOrEmail}
                notFoundContent={null}
              >
                {options}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(AddMemberModal)
