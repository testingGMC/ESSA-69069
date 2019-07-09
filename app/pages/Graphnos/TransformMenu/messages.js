/*
 * TransformMenu Messages
 *
 * This contains all the text for the TransformMenu component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.TransformMenu'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Possible Changes',
  },
  changes: {
    id: `${scope}.changes`,
    defaultMessage: 'Changes',
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  check: {
    id: `${scope}.check`,
    defaultMessage: 'Check & Apply',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Reset',
  },
  selectDependencies: {
    id: `${scope}.selectDependencies`,
    defaultMessage:
      'Select two dependencies where the target of the first one is the source of the second',
  },
  parentNode: {
    id: `${scope}.parentNode`,
    defaultMessage: 'Parent node: ',
  },
  childNode: {
    id: `${scope}.childNode`,
    defaultMessage: 'Child node: ',
  },
  none: {
    id: `${scope}.none`,
    defaultMessage: 'None',
  },
  selectNode: {
    id: `${scope}.selectNode`,
    defaultMessage: 'Select a target node to magnify',
  },
  selectedNode: {
    id: `${scope}.selectedNode`,
    defaultMessage: 'Selected node: ',
  },
  selectMode: {
    id: `${scope}.selectMode`,
    defaultMessage: 'Please select an operation first first',
  },
})
