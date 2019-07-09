import React from 'react'
import { FormattedMessage } from 'react-intl'
import { TYPES_TO_STRINGS } from 'shared/constants'
import messages from './messages'

export const generateDependencyDeleteMessage = (
  sourceNodeName,
  targetNodeName,
) => (
  <FormattedMessage
    {...messages.deleteDependencyMessage}
    values={{
      sourceNodeName,
      targetNodeName,
    }}
  />
)

export const generateDependencyCreationErrorMessage = (
  sourceNode,
  targetNode,
) => (
  <FormattedMessage
    {...messages.dependencyCreationError}
    values={{
      sourceNodeType: TYPES_TO_STRINGS[sourceNode.type],
      targetNodeType: TYPES_TO_STRINGS[targetNode.type],
    }}
  />
)
