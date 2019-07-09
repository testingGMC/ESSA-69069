import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

export const generateNodeDeleteMessage = nodeName => (
  <FormattedMessage
    {...messages.deleteConfirm}
    values={{
      nodeName,
    }}
  />
)
