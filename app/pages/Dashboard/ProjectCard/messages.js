import { defineMessages } from 'react-intl'

export const scope = 'app.components.ProjectCard'

export default defineMessages({
  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this project?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
})
