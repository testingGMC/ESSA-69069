/**
 *
 * SkillNetwork
 *
 */

import React, { memo, useState, Fragment } from 'react'
import { Row, Col, Icon, Popconfirm, Empty, Spin } from 'antd'
import PropTypes from 'prop-types'
import { HubConnectionState } from '@aspnet/signalr'
import { FormattedMessage } from 'react-intl'
import Card from 'shared/components/Card'
import {
  CREATION,
  UPDATE,
  CHANGE_ME,
  WEIGHT_STEP,
  MINIMUM_WEIGHT,
  NODE_TYPES,
  NOTIFICATION_TYPES,
  ALLOWED_DEPENDENCIES,
} from 'shared/constants'
import { isContentArchitect } from 'shared/utils/access-token'
import { pushNotification } from 'shared/utils/notification'
import messages from './messages'
import * as CONSTANTS from './constants'
import SkillNetworkTitle from '../SkillNetworkTitle'
import SkillNetworkMenu from '../SkillNetworkMenu'
import GraphContainer from '../GraphContainer'
import NodeCreation from '../NodeCreation'

import {
  checkCircularDependency,
  traversalSimulation,
  findNode,
  findLink,
  retrieveNodes,
  newGraphStruct,
  newGraphStructDuplicateSkill,
  graphTransformation,
} from '../helpers'
import {
  generateDependencyCreationErrorMessage,
  generateDependencyDeleteMessage,
} from './helpers'

import './skill-network.scss'

const legend = [
  <span>
    <div className="circle skill" />
    <FormattedMessage {...messages.skill} />
  </span>,
  <span>
    <div className="circle super-skill" />
    <FormattedMessage {...messages.superSkill} />
  </span>,
  <span>
    <div className="circle track" />
    <FormattedMessage {...messages.track} />
  </span>,
  <span>
    <div className="circle checkpoint" />
    <FormattedMessage {...messages.checkpoint} />
  </span>,
  <span>
    <div className="circle reward" />
    <FormattedMessage {...messages.reward} />
  </span>,
  <span>
    <div className="circle workshop" />
    <FormattedMessage {...messages.workshop} />
  </span>,
]

function SkillNetwork({
  loading,
  graphData,
  graphToDisplay,
  deleteNode,
  createNode,
  updateNode,
  createOrUpdateDependency,
  deleteDependency,
  duplicateNode,
  updateTrackFilters,
  updateNodeFilters,
  nodeFilters,
  trackFilters,
  loadSimulatedNodes,
  loadSimulatedGraph,
  roles,
  selectedNode,
  previousNode,
  link,
  selectNode,
  setPreviousNode,
  setLink,
  showModal,
  setShowModal,
  connectionStatus,
}) {
  const [formRef, setFormRef] = useState(null)
  const [filter, setFilter] = useState('')
  const [modalMode, setModalMode] = useState('')
  const [showDeletePopConfirm, setShowDeletePopConfirm] = useState(false)

  const resetSelection = () => {
    selectNode({})
    setPreviousNode({})
  }

  const onClickNode = node => {
    if (node && node !== selectedNode.id) {
      setPreviousNode(selectedNode)
      const populatedNode = findNode(graphData.nodes, node)
      selectNode(populatedNode)
      const foundLink = findLink(graphData.dependencies, selectedNode.id, node)
      if (foundLink) {
        setLink(foundLink)
      } else {
        setLink({
          ...link,
          id: '',
          weight: 0,
        })
      }
    }
  }
  const onClickLink = (source, target) => {
    const { links, nodes } = graphTransformation(graphData)
    const populatedLink = findLink(links, source, target)
    setLink(populatedLink)
    const [newSource, newTarget] = retrieveNodes(nodes, source, target)
    setPreviousNode(newSource)
    selectNode(newTarget)
  }

  const simulateCourse = () => {
    const nodes = traversalSimulation(selectedNode, graphData).nodes.reduce(
      (acc, node) => {
        if (
          node.type === NODE_TYPES.skill ||
          node.type === NODE_TYPES.superSkill
        ) {
          acc.push(node.id)
        }
        return acc
      },
      [],
    )
    if (nodes.length) {
      loadSimulatedNodes(nodes)
    } else {
      pushNotification(
        NOTIFICATION_TYPES.error,
        <FormattedMessage {...messages.noSkill} />,
      )
    }
  }

  const onNodeCreationOkClick = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const node = {
        type: values.type,
        name: values.name,
        description: values.description,
        content: values.content,
        instructions: values.instructions,
        image: values.image,
        icon: values.icon,
        condition: values.condition,
      }
      createNode(node)
    })
  }
  const getLiveShareConnectionClassName = connectionStatus =>
    connectionStatus === HubConnectionState.Connected
      ? CONSTANTS.LIVESHARE_CONNECTED
      : connectionStatus === HubConnectionState.Disconnected
      ? CONSTANTS.LIVESHARE_DISCONNECTED
      : CONSTANTS.LIVESHARE_RECONNECTING
  const onNodeUpdateOkClick = nodeId => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const node = {
        id: nodeId,
        type: values.type,
        name: values.name,
        description: values.description,
        content: values.content,
        instructions: values.instructions,
        image: values.image,
        icon: values.icon,
        condition: values.condition,
      }
      updateNode(nodeId, node)
    })
  }
  const handleDeleteNode = (id, type) => {
    deleteNode(id, type)
    if (previousNode.id) {
      selectNode(previousNode)
      setPreviousNode({})
    } else {
      selectNode({})
    }
  }
  let handleOk = async (nodeId, mode) => {
    if (mode === CREATION) {
      await onNodeCreationOkClick()
    } else {
      await onNodeUpdateOkClick(nodeId)
    }
  }
  handleOk = handleOk.bind(null, selectedNode.id, modalMode)
  const OnNewCreation = () => {
    setModalMode(CREATION)
    setShowModal(true)
  }

  const onUpdateNode = () => {
    setModalMode(UPDATE)
    setShowModal(true)
  }

  const onNodeCreationCancelClick = () => {
    setShowModal(false)
  }

  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }

  const filterNodes = (filterTerm, graph) => {
    if (filterTerm === '') {
      return graph
    }

    const newGraph = newGraphStruct(graph)
    const newNodesIds = Object.keys(newGraph.nodes).filter(nodeId =>
      newGraph.nodes[nodeId].name
        .toLowerCase()
        .includes(filterTerm.toLowerCase()),
    )
    if (newNodesIds.length === 0) {
      return {
        nodes: [{ id: 0, name: 'no skill found', color: 'black' }],
        dependencies: [],
      }
    }
    let newDependenciesIds = []
    newNodesIds.forEach(nodeId => {
      newDependenciesIds.push(...newGraph.nodes[nodeId].dependencies)
    })

    newNodesIds.forEach(nodeId => {
      newGraph.nodes[nodeId].successors.forEach(successorId => {
        newNodesIds.push(successorId)
      })
    })

    newDependenciesIds = newDependenciesIds.filter(dependencyId => {
      const { sourceId, targetId } = newGraph.dependencies[dependencyId]
      return newNodesIds.includes(sourceId) && newNodesIds.includes(targetId)
    })

    return {
      nodes: newNodesIds.map(id => newGraph.nodes[id]),
      dependencies: newDependenciesIds.map(id => newGraph.dependencies[id]),
    }
  }
  const updateWeight = step => {
    setLink({
      ...link,
      weight: Number((link.weight + step).toFixed(1)),
    })
  }

  const onDuplicateClick = async node => {
    const newGraph = newGraphStructDuplicateSkill(graphData)
    const dependency = newGraph.nodes[node.id].dependencies.find(
      id => newGraph.dependencies[id].targetId === node.id,
    )

    if (newGraph.dependencies[dependency]) {
      const source = newGraph.nodes[newGraph.dependencies[dependency].sourceId]
      duplicateNode(
        {
          ...node,
          name: `${node.name} ${Math.floor(Math.random() * 100)}`,
          description: CHANGE_ME,
        },
        source,
        newGraph.dependencies[dependency].weight,
      )
    } else {
      pushNotification(
        NOTIFICATION_TYPES.error,
        <FormattedMessage {...messages.duplicateErrorTitle} />,
        <FormattedMessage {...messages.duplicateErrorDescription} />,
      )
    }
  }
  return (
    <Spin spinning={loading}>
      <div className="skill-network">
        {showModal && (
          <NodeCreation
            wrappedComponentRef={saveFormRef}
            isVisible={showModal}
            handleCancel={onNodeCreationCancelClick}
            handleOk={handleOk}
            mode={modalMode}
            nodeName={selectedNode.name}
            nodeDescription={selectedNode.description}
            nodeType={selectedNode.type}
            nodeContent={selectedNode.content}
            nodeInstructions={selectedNode.instructions}
            nodeImage={selectedNode.image}
            nodeIcon={selectedNode.icon}
            nodeCondition={selectedNode.condition}
          />
        )}

        <SkillNetworkTitle roles={roles} onNewCreation={OnNewCreation} />
        <Row>
          <Col span={17}>
            <Card
              title={
                <div>
                  <div
                    className={`liveshare-connection-status ${getLiveShareConnectionClassName(
                      connectionStatus,
                    )}`}
                  />
                  <FormattedMessage {...messages.title} />
                </div>
              }
              extra={
                <div className="header-actions">
                  <div className="selected-nodes">
                    {previousNode.name} {previousNode.id && '>'}{' '}
                    {selectedNode.name}
                  </div>
                  {selectedNode.id &&
                    previousNode.id &&
                    (isContentArchitect(roles) && (
                      <div className="weight-edit">
                        <span>{link.weight}</span>
                        <div className="arrows">
                          <button
                            onClick={() => updateWeight(WEIGHT_STEP)}
                            className="global-clean-button"
                            type="button"
                          >
                            <Icon type="up" />
                          </button>
                          <button
                            onClick={() => {
                              if (link.weight > MINIMUM_WEIGHT) {
                                updateWeight(-WEIGHT_STEP)
                              }
                            }}
                            className="global-clean-button"
                            type="button"
                          >
                            <Icon type="down" />
                          </button>
                        </div>
                        {!link.id ? (
                          <button
                            onClick={() => {
                              if (
                                checkCircularDependency(
                                  previousNode,
                                  selectedNode,
                                  graphData,
                                )
                              ) {
                                pushNotification(
                                  NOTIFICATION_TYPES.error,
                                  <FormattedMessage
                                    {...messages.circularDependency}
                                  />,
                                  <FormattedMessage
                                    {...messages.circularDependencyMessage}
                                  />,
                                )
                              }

                              if (link.weight <= 0) {
                                pushNotification(
                                  NOTIFICATION_TYPES.error,
                                  <FormattedMessage
                                    {...messages.dependencyWeight}
                                  />,
                                )
                              }
                              const isAllowed =
                                ALLOWED_DEPENDENCIES[
                                  `${previousNode.type}${selectedNode.type}`
                                ]
                              if (!isAllowed) {
                                pushNotification(
                                  NOTIFICATION_TYPES.error,
                                  generateDependencyCreationErrorMessage(
                                    previousNode,
                                    selectedNode,
                                  ),
                                )
                              }
                              if (
                                !checkCircularDependency(
                                  previousNode,
                                  selectedNode,
                                  graphToDisplay,
                                ) &&
                                link.weight > 0 &&
                                isAllowed
                              ) {
                                createOrUpdateDependency(
                                  previousNode,
                                  selectedNode,
                                  link.weight,
                                )
                              }
                            }}
                            type="button"
                            className="global-clean-button"
                          >
                            <span className="link">
                              <Icon type="shrink" />
                            </span>
                          </button>
                        ) : (
                          <Fragment>
                            <Popconfirm
                              visible={showDeletePopConfirm}
                              placement="topLeft"
                              title={generateDependencyDeleteMessage(
                                previousNode.name,
                                selectedNode.name,
                              )}
                              onConfirm={() => {
                                deleteDependency(previousNode, selectedNode)
                                setShowDeletePopConfirm(false)
                              }}
                              onCancel={() => setShowDeletePopConfirm(false)}
                              okText="Delete"
                              cancelText="Cancel"
                            >
                              <button
                                disabled={!link.id}
                                onClick={() => {
                                  setShowDeletePopConfirm(true)
                                }}
                                type="button"
                                className="global-clean-button"
                              >
                                <span className="link">
                                  <Icon type="arrows-alt" />
                                </span>
                              </button>
                            </Popconfirm>

                            <button
                              disabled={!selectedNode.id && !previousNode.id}
                              onClick={() => {
                                if (link.weight <= 0) {
                                  pushNotification(
                                    NOTIFICATION_TYPES.error,
                                    <FormattedMessage
                                      {...messages.dependencyWeight}
                                    />,
                                  )
                                }
                                if (
                                  !checkCircularDependency(
                                    previousNode,
                                    selectedNode,
                                    graphToDisplay,
                                  ) &&
                                  link.weight > 0
                                ) {
                                  createOrUpdateDependency(
                                    previousNode,
                                    selectedNode,
                                    link.weight,
                                  )
                                }
                              }}
                              type="button"
                              className="global-clean-button"
                            >
                              <span className="link">
                                <Icon type="edit" />
                              </span>
                            </button>
                          </Fragment>
                        )}
                      </div>
                    ))}
                </div>
              }
              actions={legend}
            >
              <div className="graph-zone">
                {graphData.nodes.length ? (
                  <GraphContainer
                    graphToDisplay={graphTransformation(
                      filterNodes(filter, graphToDisplay),
                    )}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                  />
                ) : (
                  <Empty />
                )}
              </div>
            </Card>
          </Col>

          <Col offset={1} span={6}>
            <SkillNetworkMenu
              setFilter={setFilter}
              filter={filter}
              selectedNode={selectedNode}
              duplicateNode={onDuplicateClick}
              nodes={graphData.nodes}
              onUpdateNode={onUpdateNode}
              deleteNode={handleDeleteNode}
              simulateCourse={simulateCourse}
              updateTrackFilters={updateTrackFilters}
              updateNodeFilters={updateNodeFilters}
              nodeFilters={nodeFilters}
              trackFilters={trackFilters}
              loadSimulatedNodes={loadSimulatedNodes}
              loadSimulatedGraph={loadSimulatedGraph}
              roles={roles}
              resetSelection={resetSelection}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

SkillNetwork.propTypes = {
  graphData: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteNode: PropTypes.func.isRequired,
  createNode: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,
  createOrUpdateDependency: PropTypes.func.isRequired,
  deleteDependency: PropTypes.func.isRequired,
  duplicateNode: PropTypes.func.isRequired,
  graphToDisplay: PropTypes.objectOf(PropTypes.any).isRequired,
  updateTrackFilters: PropTypes.func.isRequired,
  updateNodeFilters: PropTypes.func.isRequired,
  nodeFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  trackFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadSimulatedNodes: PropTypes.func.isRequired,
  loadSimulatedGraph: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  selectedNode: PropTypes.objectOf(PropTypes.any).isRequired,
  previousNode: PropTypes.objectOf(PropTypes.any).isRequired,
  link: PropTypes.objectOf(PropTypes.any).isRequired,
  selectNode: PropTypes.func.isRequired,
  setPreviousNode: PropTypes.func.isRequired,
  setLink: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  connection: PropTypes.object.isRequired,
  isConnectedToLiveshare: PropTypes.bool.isRequired,
  connectionStatus: PropTypes.number.isRequired,
}

export default memo(SkillNetwork)
