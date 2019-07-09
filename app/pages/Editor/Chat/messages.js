/*
 * Chat Messages
 *
 * This contains all the text for the CrdtEditor component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Chat'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Please select a page',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Type your message',
  },
})
