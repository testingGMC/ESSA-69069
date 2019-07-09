/*
 * FourOfFour Messages
 *
 * This contains all the text for the FourOfFour container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.FourOfFour'

export default defineMessages({
  pageNotFound: {
    id: `${scope}.pageNotFound`,
    defaultMessage: 'Page not found',
  },
  descriptionPart1: {
    id: `${scope}.descriptionPart1`,
    defaultMessage: 'Sorry, nothing to see here',
  },
  descriptionPart2: {
    id: `${scope}.descriptionPart2`,
    defaultMessage: 'Visit our',
  },
  descriptionPart3: {
    id: `${scope}.descriptionPart3`,
    defaultMessage: 'home page',
  },
})
