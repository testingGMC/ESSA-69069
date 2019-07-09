/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Chat
 *
 */
import React, { memo, useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Row, Col, Avatar } from 'antd'
import { decodeToken } from 'shared/utils/decode-header'
import './chat.scss'
import uuidv5 from 'uuid/v5'
import ColorHash from 'color-hash'
import initials from 'initials'
import moment from 'moment'
import { intlShape, injectIntl } from 'react-intl'
import messages from './messages'

const Chat = ({
  closeChat,
  instantMessages,
  sendChatMessage,
  connection,
  skillId,
  intl,
}) => {
  const [message, setMessage] = useState('')
  const messageList = createRef()
  const onChangeMessage = e => setMessage(e.target.value)

  const colorHash = new ColorHash()
  useEffect(() => {
    messageList.current.scrollIntoView({ behavior: 'smooth' })
  }, [instantMessages])
  const messageClassName = id => {
    if (
      id ===
      decodeToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ]
    ) {
      return 'message-sent'
    }
    return 'message-received'
  }
  return (
    <div className="chat">
      <div className="chat-close" onClick={closeChat}>
        x
      </div>
      <div className="message-block">
        {instantMessages !== undefined &&
          instantMessages !== null &&
          instantMessages.map(el => (
            <Row>
              <Col className={messageClassName(el.source.id)}>
                {messageClassName(el.source.id) === 'message-received' && (
                  <Avatar
                    style={{
                      backgroundColor: colorHash.hex(el.source.fullName),
                      verticalAlign: 'middle',
                    }}
                    alt={el.source.fullName}
                  >
                    {initials(el.source.fullName)}
                  </Avatar>
                )}
                <div className="message">
                  <div className="message-text">{el.message}</div>
                  <div className="message-date">
                    {moment(el.date).fromNow()}
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        <div ref={messageList} />
      </div>
      <div className="type-message">
        <Input
          value={message}
          placeholder={intl.formatMessage({ ...messages.placeholder })}
          allowClear
          onKeyUp={event => {
            if (event.key === 'Enter') {
              sendChatMessage(
                connection,
                skillId,
                message,
                `${uuidv5(message, uuidv5.URL)}`,
              )
              setMessage('')
            }
          }}
          suffix={
            <Icon
              type="right-circle"
              theme="twoTone"
              onClick={() => {
                sendChatMessage(
                  connection,
                  skillId,
                  message,
                  `${uuidv5(message, uuidv5.URL)}`,
                )
                setMessage('')
              }}
            />
          }
          className="message-input"
          onChange={onChangeMessage}
        />
      </div>
    </div>
  )
}

Chat.propTypes = {
  closeChat: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  instantMessages: PropTypes.array.isRequired,
  sendChatMessage: PropTypes.array.isRequired,
  connection: PropTypes.object.isRequired,
  skillId: PropTypes.string.isRequired,
}

export default memo(injectIntl(Chat))
