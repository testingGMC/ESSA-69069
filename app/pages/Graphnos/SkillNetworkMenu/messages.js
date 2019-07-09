/*
 * SkillNetworkMenu Messages
 *
 * This contains all the text for the SkillNetworkMenu component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SkillNetworkMenu'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SkillNetworkMenu component!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Options',
  },
  open: {
    id: `${scope}.open`,
    defaultMessage: 'Open',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  traversal: {
    id: `${scope}.traversal`,
    defaultMessage: 'Traversal',
  },
  simulate: {
    id: `${scope}.simulate`,
    defaultMessage: 'Simulate Course',
  },
  transform: {
    id: `${scope}.transform`,
    defaultMessage: 'Transform',
  },
  tracks: {
    id: `${scope}.tracks`,
    defaultMessage: 'Tracks',
  },
  skills: {
    id: `${scope}.skills`,
    defaultMessage: 'Skills',
  },
  nodes: {
    id: `${scope}.nodes`,
    defaultMessage: 'Nodes',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search by name',
  },
  tree: {
    id: `${scope}.tree`,
    defaultMessage: 'Tree graph creation',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name:',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  nothing: {
    id: `${scope}.nothing`,
    defaultMessage: 'Nothing selected',
  },
  deleteConfirm: {
    id: `${scope}.deleteConfirm`,
    defaultMessage: 'Are you sure you want to delete {nodeName}?',
  },
})
