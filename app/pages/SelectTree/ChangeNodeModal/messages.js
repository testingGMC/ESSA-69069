/*
 * NodeModal Messages
 *
 * This contains all the text for the NodeModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.ChangeNodeModal'

export default defineMessages({
  Node: {
    id: `${scope}.Node`,
    defaultMessage: 'Node',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  nodeTitle: {
    id: `${scope}.nodeTitle`,
    defaultMessage: 'Node Title',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last Name',
  },
  nodeTitleError: {
    id: `${scope}.nodeTitleError`,
    defaultMessage: 'Please input the node title!',
  },
  nodeDescriptionError: {
    id: `${scope}.nodeDescriptionError`,
    defaultMessage: 'Please input the node description!',
  },
  nodeTypeError: {
    id: `${scope}.nodeTypeError`,
    defaultMessage: 'Please input the node type!',
  },
})
