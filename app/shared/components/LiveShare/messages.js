/*
 * LiveShare Messages
 *
 * This contains all the text for the LiveShare component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.LiveShare'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LiveShare component!',
  },
  skillSavedTitle: {
    id: `${scope}.SkillSaved.header`,
    defaultMessage: ' saved this skill',
  },
  skillSavedMessage: {
    id: `${scope}.SkillSaved.message`,
    defaultMessage: 'This operation might result in conflicts, if you click save you will overwrite his changes.',
  }

})
