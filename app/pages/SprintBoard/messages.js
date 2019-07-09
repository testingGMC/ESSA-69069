/*
 * SprintBoard Messages
 *
 * This contains all the text for the SprintBoard container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.SprintBoard'

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Sprint Board',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: '"Description of Sprint Board',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },

  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this workitem?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  createSprint: {
    id: `${scope}.addSprint`,
    defaultMessage: 'Create Sprint',
  },
  workDays: {
    id: `${scope}.workDays`,
    defaultMessage: 'Work Days',
  },
  todo: {
    id: `${scope}.todo`,
    defaultMessage: 'TO DO',
  },
  active: {
    id: `${scope}.active`,
    defaultMessage: 'ACTIVE',
  },
  resolved: {
    id: `${scope}.resolved`,
    defaultMessage: 'RESOLVED',
  },
  done: {
    id: `${scope}.done`,
    defaultMessage: 'DONE',
  },
  noSprintsTitle: {
    id: `${scope}.noSprints`,
    defaultMessage: 'No active sprint',
  },
  noSprintsContent: {
    id: `${scope}.noSprints`,
    defaultMessage: 'There is no active sprint. Add a new sprint',
  },
  chooseSprint: {
    id: `${scope}.chooseSprint`,
    defaultMessage: 'Choose sprint',
  },
})
