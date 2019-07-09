/*
 * Transform Messages
 *
 * This contains all the text for the Transform component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Transform'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Transform component!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Transform',
  },
  optimize: {
    id: `${scope}.optimize`,
    defaultMessage: 'Optimize operations',
  },
  magnify: {
    id: `${scope}.magnify`,
    defaultMessage: 'Magnify',
  },
  compact: {
    id: `${scope}.compact`,
    defaultMessage: 'Compact and reduce',
  },
  reverse: {
    id: `${scope}.reverse`,
    defaultMessage: 'Breadth to depth',
  },
  pBro: {
    id: `${scope}.pBro`,
    defaultMessage: 'Depth to breadth',
  },
  previewError: {
    id: `${scope}.previewError`,
    defaultMessage: 'The source node has only one outgoing dependency',
  },
})
