/*
 * AddPage Messages
 *
 * This contains all the text for the AddPage component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.AddPage'

export default defineMessages({
  templateWithTextOnly: {
    id: `${scope}.templateWithTextOnly`,
    defaultMessage: 'Template with text only',
  },
  templateWithTextAndImage: {
    id: `${scope}.templateWithTextAndImage`,
    defaultMessage: 'Template with text and image',
  },
  templateWithTextAndCode: {
    id: `${scope}.templateWithTextAndCode`,
    defaultMessage: 'Template with text and code',
  },
  templateWithVideo: {
    id: `${scope}.templateWithVideo`,
    defaultMessage: 'Template with Video',
  },
})
