import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Dashboard'

export default defineMessages({
  allproject: {
    id: `${scope}.allproject`,
    defaultMessage: 'All Projects',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search project name...',
  },
  createproject: {
    id: `${scope}.createProject`,
    defaultMessage: 'Create Project',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Description of Dashboard',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Dashboard',
  },
})
