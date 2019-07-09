/*
 * SimulateMenu Messages
 *
 * This contains all the text for the SimulateMenu component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SimulateMenu'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SimulateMenu component!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'post visited nodes',
  },
  finish: {
    id: `${scope}.finish`,
    defaultMessage: 'Finish',
  },
})
