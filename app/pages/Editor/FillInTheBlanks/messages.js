/*
 * FillInTheBlanks Messages
 *
 * This contains all the text for the FillInTheBlanks component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.FillInTheBlanks'

export default defineMessages({
  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this element?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'validate',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'update',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'delete',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'cancel',
  },
  fillInTheBlanks: {
    id: `${scope}.reorderChallenge`,
    defaultMessage: 'Fill In The Blanks',
  },
  listOfElements: {
    id: `${scope}.listOfElements`,
    defaultMessage: 'List of elements correctly ordered',
  },
  updateTheText: {
    id: `${scope}.updateTheText`,
    defaultMessage: 'update the text',
  },
  addAnElement: {
    id: `${scope}.addAnElement`,
    defaultMessage: 'Add an element',
  },
  addBlank: {
    id: `${scope}.addBlank`,
    defaultMessage: 'Add Blank',
  },
  addPlaceholder: {
    id: `${scope}.addPlaceholder`,
    defaultMessage: 'Add Placeholder',
  },
  addNewLine: {
    id: `${scope}.addNewLine`,
    defaultMessage: 'Add New Line',
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  newLine: {
    id: `${scope}.newLine`,
    defaultMessage: 'New Line (<br>)',
  },
})
