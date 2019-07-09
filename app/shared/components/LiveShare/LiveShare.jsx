/**
 *
 * LiveShare
 *
 */

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { notification } from 'antd'
import { HubConnectionState } from '@aspnet/signalr'
import messages from './messages'
import * as Commands from '../../utils/liveshare-commands'
import * as CONSTANTS from './constants'
import { selectElement } from 'shared/redux/liveshare/actions'

let heartBeatInterval = null
let reconnectInterval = null
function LiveShare({
  createHubConnection,
  collaboratorJoined,
  collaboratorLeft,
  applyPatch,
  setChangeTracking,
  receiveChatMessage,
  addContentOperations,
  nodeOperationReceived,
  linkOperationReceived,
  heartBeat,
  connectionStatus,
  selectElementById
}) {
  const skillSavedNotification = collaborator => {
    notification[CONSTANTS.NOTIFICATION_TYPE]({
      message: `${collaborator.fullName} ${
        messages.skillSavedTitle.defaultMessage
      }`,
      description: messages.skillSavedMessage.defaultMessage,
      duration: 10,
    })
  }

  const getSelectedElementId = patch => {
    const selectedElements = Object.keys(JSON.parse(patch)).filter(
      e =>
        e !== 'learningStyles' &&
        e !== 'assessments' &&
        e !== 'keywords' &&
        e !== 'templates' &&
        e.indexOf("co_") !== 0,
    )
    return selectedElements.length > 0 ? selectedElements[0] : null
  }
  const onMessageReceivedCallback = message => {
    const messageObject = JSON.parse(message)
    switch (messageObject.command) {
      case Commands.CollaboratorJoined:
        collaboratorJoined(messageObject.source)
        break
      case Commands.CollaboratorLeft:
        collaboratorLeft(messageObject.source)
        break
      case Commands.SkillUpdate:
        applyPatch(messageObject.origin, messageObject.patch)
        let selectedElement =  getSelectedElementId(messageObject.patch)
        selectElementById (messageObject.source, selectedElement)
        setChangeTracking(true)
  
        break
      case Commands.Chat:
        receiveChatMessage({
          message: messageObject.message,
          source: messageObject.source,
          date: messageObject.date,
          id: messageObject.id,
        })
        break
      case Commands.ContentOperations:
        addContentOperations(messageObject.pageId, messageObject.operations)
        selectElementById (messageObject.source, messageObject.pageId)
        break
      case Commands.NodeUpdated:
      case Commands.NodeCreated:
      case Commands.NodeDeleted:
        nodeOperationReceived(
          messageObject.id,
          messageObject.name,
          messageObject.type,
          messageObject.command,
        )
        break
      case Commands.LinkUpdated:
      case Commands.LinkCreated:
      case Commands.LinkDeleted:
        linkOperationReceived(
          messageObject.sourceId,
          messageObject.targetId,
          messageObject.weight,
          messageObject.command,
        )
        break
      case Commands.InstanceSaved:
        skillSavedNotification(messageObject.source)
        break
    }
  }
  const heartBeatCallback = connection => {
    if (heartBeatInterval === null)
      heartBeatInterval = setInterval(() => {
        heartBeat(connection)
      }, 5000)
  }

  useEffect(() => {
    createHubConnection(onMessageReceivedCallback, heartBeatCallback)
  }, [])

  useEffect(() => {
    if (
      connectionStatus !== HubConnectionState.Connected &&
      heartBeatInterval !== null
    ) {
      clearInterval(heartBeatInterval)
      heartBeatInterval = null
    }
    if (
      connectionStatus === HubConnectionState.Disconnected &&
      reconnectInterval === null
    ) {
      reconnectInterval = setInterval(
        () => {
          if (connectionStatus === HubConnectionState.Disconnected)
            createHubConnection(onMessageReceivedCallback, heartBeatCallback)
        },
        3000,
      )
    }
    if (connectionStatus === HubConnectionState.Connected) {
      clearInterval(reconnectInterval)
      reconnectInterval = null
    }
  }, [connectionStatus])
  return <div className="live-share" />
}

LiveShare.propTypes = {
  createHubConnection: PropTypes.func,
  collaboratorJoined: PropTypes.func,
  collaboratorLeft: PropTypes.func,
  applyPatch: PropTypes.func,
  setChangeTracking: PropTypes.func,
  receiveChatMessage: PropTypes.func,
  addContentOperations: PropTypes.func,
  nodeOperationReceived: PropTypes.func,
  linkOperationReceived: PropTypes.func,
}

export default LiveShare
