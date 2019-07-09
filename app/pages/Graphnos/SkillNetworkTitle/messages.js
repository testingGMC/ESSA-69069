/*
 * SkillNetworkTitle Messages
 *
 * This contains all the text for the SkillNetworkTitle component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SkillNetworkTitle'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SkillNetworkTitle component!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Skill Network',
  },
  creation: {
    id: `${scope}.creation`,
    defaultMessage: 'Create node',
  },
  treeCreation: {
    id: `${scope}.treeCreation`,
    defaultMessage: 'Create tree',
  },
})
