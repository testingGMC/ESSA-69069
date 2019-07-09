/**
 *
 * SkillNetworkMenu
 *
 */

import React, { memo, useState } from 'react'
import { Button, Select, Input, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { COLORS, NODE_TYPES } from 'shared/constants'
import routes from 'shared/routes'

import { FormattedMessage } from 'react-intl'
import { isContentArchitect } from 'shared/utils/access-token'
import { generateNodeDeleteMessage } from './helpers'
import messages from './messages'
import Card from '../../../shared/components/Card'
import './skill-network-menu.scss'

const { Option } = Select

function SkillNetworkMenu({
  nodes,
  selectedNode,
  filter,
  setFilter,
  duplicateNode,
  onUpdateNode,
  deleteNode,
  simulateCourse,
  updateTrackFilters,
  updateNodeFilters,
  nodeFilters,
  trackFilters,
  roles,
  loadSimulatedNodes,
  loadSimulatedGraph,
  resetSelection,
}) {
  const [showDeletePopConfirm, setShowDeletePopConfirm] = useState(false)
  const canEdit = () =>
    isContentArchitect(roles) ||
    (selectedNode.type === NODE_TYPES.checkpoint ||
      selectedNode.type === NODE_TYPES.reward ||
      selectedNode.type === NODE_TYPES.workshop)
  return (
    <div className="skill-network-menu">
      <Card title={<FormattedMessage {...messages.title} />} className="menu">
        <div className="main">
          <div className="selected-node">
            <div>
              <span className="title">
                <FormattedMessage {...messages.name} />
              </span>
              {selectedNode.name ? (
                <span style={{ color: COLORS[selectedNode.type] }}>
                  {selectedNode.name}
                </span>
              ) : (
                <span className="nothing-selected">
                  <FormattedMessage {...messages.nothing} />
                </span>
              )}
            </div>
            <div>
              <span className="title">
                <FormattedMessage {...messages.description} />
              </span>
              {selectedNode.description ? (
                <span style={{ color: COLORS[selectedNode.type] }}>
                  {selectedNode.description}
                </span>
              ) : (
                <span className="nothing-selected">
                  <FormattedMessage {...messages.nothing} />
                </span>
              )}
            </div>
          </div>
          <div className="buttons">
            <Button
              disabled={
                selectedNode.type !== NODE_TYPES.skill &&
                selectedNode.type !== NODE_TYPES.superSkill
              }
              // className="open"
            >
              <Link
                onClick={() => loadSimulatedNodes([])}
                to={routes.EDITOR.linkPath(selectedNode.id)}
              >
                <FormattedMessage {...messages.open} />
              </Link>
            </Button>

            {isContentArchitect(roles) && (
              <Button
                onClick={() => duplicateNode(selectedNode)}
                className="duplicate"
                disabled={!selectedNode.id}
              >
                <FormattedMessage {...messages.duplicate} />
              </Button>
            )}
            <Link
              onClick={() => loadSimulatedGraph({})}
              to={routes.GRAPHNOS.linkPath(
                routes.GRAPHNOS.children.traversal(selectedNode.id),
              )}
            >
              <Button
                disabled={
                  selectedNode.type !== NODE_TYPES.skill &&
                  selectedNode.type !== NODE_TYPES.superSkill &&
                  selectedNode.type !== NODE_TYPES.track
                }
                className="traversal"
              >
                <FormattedMessage {...messages.traversal} />
              </Button>
            </Link>
            <Button
              onClick={() => {
                simulateCourse()
              }}
              disabled={
                selectedNode.type !== NODE_TYPES.skill &&
                selectedNode.type !== NODE_TYPES.superSkill &&
                selectedNode.type !== NODE_TYPES.track
              }
              className="simulate"
            >
              <FormattedMessage {...messages.simulate} />
            </Button>
            {isContentArchitect(roles) && (
              <Link
                to={routes.GRAPHNOS.linkPath(
                  routes.GRAPHNOS.children.transform,
                )}
              >
                <Button className="transform">
                  <FormattedMessage {...messages.transform} />
                </Button>
              </Link>
            )}
            {canEdit() && (
              <Button
                onClick={() => onUpdateNode()}
                disabled={!selectedNode.id}
                className="edit"
              >
                <FormattedMessage {...messages.edit} />
              </Button>
            )}
            {isContentArchitect(roles) && (
              <Popconfirm
                visible={showDeletePopConfirm}
                placement="topLeft"
                title={generateNodeDeleteMessage(selectedNode.name)}
                onConfirm={() => {
                  deleteNode(selectedNode.id, selectedNode.type)
                  setShowDeletePopConfirm(false)
                }}
                onCancel={() => setShowDeletePopConfirm(false)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button
                  onClick={() => setShowDeletePopConfirm(true)}
                  disabled={!selectedNode.id}
                  className="delete"
                >
                  <FormattedMessage {...messages.delete} />
                </Button>
              </Popconfirm>
            )}
            {isContentArchitect(roles) && (
              <Button
                onClick={() => resetSelection(true)}
                disabled={!selectedNode.id}
                className="delete"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="input-container">
            <span className="input-title">
              <FormattedMessage {...messages.tracks} />
            </span>

            <Select
              defaultValue={trackFilters.map(track => track.id)}
              onChange={e => {
                updateTrackFilters(e)
              }}
              mode="multiple"
              optionFilterProp="name"
            >
              {nodes &&
                nodes
                  .filter(node => node.type === NODE_TYPES.track)
                  .map(node => (
                    <Option name={node.name} key={node.id}>
                      {node.name}
                    </Option>
                  ))}
            </Select>
          </div>
          <div className="input-container">
            <span className="input-title">
              <FormattedMessage {...messages.nodes} />
            </span>

            <Select
              defaultValue={nodeFilters.map(node => node.id)}
              onChange={e => {
                updateNodeFilters(e)
              }}
              optionFilterProp="name"
              mode="multiple"
            >
              {nodes &&
                nodes
                  .filter(node => node.type !== NODE_TYPES.track)
                  .map(node => (
                    <Option name={node.name} key={node.id}>
                      {node.name}
                    </Option>
                  ))}
            </Select>
          </div>
          <div className="input-container">
            <span className="input-title">
              <FormattedMessage {...messages.search} />
            </span>

            <Input
              value={filter}
              placeholder="html"
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

SkillNetworkMenu.propTypes = {
  selectedNode: PropTypes.objectOf(PropTypes.any).isRequired,
  filter: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.any).isRequired,
  setFilter: PropTypes.func.isRequired,
  duplicateNode: PropTypes.func.isRequired,
  onUpdateNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  simulateCourse: PropTypes.func.isRequired,
  updateTrackFilters: PropTypes.func.isRequired,
  updateNodeFilters: PropTypes.func.isRequired,
  nodeFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  trackFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  roles: PropTypes.array.isRequired,
  loadSimulatedNodes: PropTypes.func.isRequired,
  loadSimulatedGraph: PropTypes.func.isRequired,
}

export default memo(SkillNetworkMenu)
