/*
 * SkillNetwork Messages
 *
 * This contains all the text for the SkillNetwork component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SkillNetwork'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SkillNetwork component!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Graph',
  },
  skill: {
    id: `${scope}.skill`,
    defaultMessage: 'Skill',
  },
  superSkill: {
    id: `${scope}.superSkill`,
    defaultMessage: 'Super Skill',
  },
  track: {
    id: `${scope}.track`,
    defaultMessage: 'Track',
  },
  checkpoint: {
    id: `${scope}.checkpoint`,
    defaultMessage: 'Checkpoint',
  },
  reward: {
    id: `${scope}.reward`,
    defaultMessage: 'Reward',
  },
  workshop: {
    id: `${scope}.workshop`,
    defaultMessage: 'Workshop',
  },
  circularDependency: {
    id: `${scope}.circularDependency`,
    defaultMessage: 'Circular dependency',
  },
  circularDependencyMessage: {
    id: `${scope}.circularDependencyMessage`,
    defaultMessage:
      'Having a circular dependency in the graph is not permitted.',
  },
  dependencyWeight: {
    id: `${scope}.dependencyWeight`,
    defaultMessage: 'Dependency weight must be superior to 0.',
  },
  noSkill: {
    id: `${scope}.noSkill`,
    defaultMessage: 'There is no skill nor super skill in the selected graph',
  },
  duplicateErrorTitle: {
    id: `${scope}.duplicateErrorTitle`,
    defaultMessage: 'This node has no parents!',
  },
  duplicateErrorDescription: {
    id: `${scope}.duplicateErrorDescription`,
    defaultMessage: 'You can create a new node instead.',
  },
  deleteDependencyMessage: {
    id: `${scope}.deleteDependencyMessage`,
    defaultMessage:
      'Are you sure you want to delete the link between {sourceNodeName} and {targetNodeName}?',
  },
  dependencyCreationError: {
    id: `${scope}.dependencyCreationError`,
    defaultMessage:
      'Link from {sourceNodeType} to {targetNodeType} is not allowed',
  },
})
