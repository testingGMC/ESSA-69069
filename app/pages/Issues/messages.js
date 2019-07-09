/*
 * Issues Messages
 *
 * This contains all the text for the Issues container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Issues'

export default defineMessages({
  issues: {
    id: `${scope}.issues`,
    defaultMessage: 'Issues',
  },
  filterBy: {
    id: `${scope}.filterBy`,
    defaultMessage: 'Filter by',
  },

  acknowledged: {
    id: `${scope}.issues`,
    defaultMessage: 'Acknowledged',
  },
  rejected: {
    id: `${scope}.rejected`,
    defaultMessage: 'Rejected',
  },
  duplicated: {
    id: `${scope}.duplicated`,
    defaultMessage: 'Duplicated',
  },

  resolved: {
    id: `${scope}.resolved`,
    defaultMessage: 'Resolved',
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage: 'Pending',
  },
  allSkills: {
    id: `${scope}.allSkills`,
    defaultMessage: 'All Skills',
  },
  markAs: {
    id: `${scope}.markAs`,
    defaultMessage: 'Mark As',
  },
  assignTo: {
    id: `${scope}.assignTo`,
    defaultMessage: 'Assign to',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  reporter: {
    id: `${scope}.reporter`,
    defaultMessage: 'Reporter',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  workItemName: {
    id: `${scope}.workItemName`,
    defaultMessage: 'Work item name',
  },
  workItemDescription: {
    id: `${scope}.workItemDescription`,
    defaultMessage: 'Work item description',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'Project name',
  },
  sprint: {
    id: `${scope}.sprint`,
    defaultMessage: 'Sprint name',
  },
  statusError: {
    id: `${scope}.statusError`,
    defaultMessage: 'Please input the status!',
  },
  projectError: {
    id: `${scope}.projectError`,
    defaultMessage: 'Please input the project!',
  },
  sprintError: {
    id: `${scope}.sprintError`,
    defaultMessage: 'Please input the sprint!',
  },
  workItemNameError: {
    id: `${scope}.workItemNameError`,
    defaultMessage: 'Please input the work item name!',
  },
  workItemDescriptionError: {
    id: `${scope}.workItemDescriptionError`,
    defaultMessage: 'Please input the work item description',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Description of Issues',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Issues',
  },
})
