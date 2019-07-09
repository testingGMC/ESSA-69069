/**
 *
 * Traversal
 *
 */

import React, { memo, useEffect, useState } from 'react'
import { Row, Col, Empty } from 'antd'
import Card from 'shared/components/Card'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import { pushNotification } from 'shared/utils/notification'
import { NOTIFICATION_TYPES } from 'shared/constants'
import { isEmpty } from 'lodash'
import routes from 'shared/routes'
import messages from './messages'

import TraversalMenu from '../TraversalMenu'
import TraversalTitle from '../TraversalTitle'
import GraphContainer from '../GraphContainer'
import { traversalSimulation, graphTransformation } from '../helpers'

import './traversal.scss'

function Traversal({
  graphData,
  match,
  simulatedGraph,
  loadSimulatedGraph,
  updateSimulationNode,
  resetSimulation,
  finishSimulation,
  push,
}) {
  const [simulationSpeed, setSimulationSpeed] = useState(50)
  const [counter, setCounter] = useState([])
  const [isSimulating, setIsSimulating] = useState(false)
  const { nodeId } = match.params
  const entryNode =
    graphData.nodes && graphData.nodes.find(node => node.id === nodeId)

  const counters = []
  const startSimulation = nodes => {
    setIsSimulating(true)
    if (nodes[0]) {
      if (nodes[0].type !== 6) {
        const nextNode = setTimeout(() => {
          updateSimulationNode(nodes[0].id)
          startSimulation(nodes.slice(1))
        }, 1000 - 10 * simulationSpeed)
        counters.push(nextNode)
        setCounter(counters)
      } else {
        startSimulation(nodes.slice(1))
      }
    }
  }
  useEffect(() => {
    if (graphData.nodes && entryNode) {
      loadSimulatedGraph(traversalSimulation(entryNode, graphData))
    }
  }, [graphData])

  useEffect(() => {
    if (simulatedGraph.dependencies && isEmpty(simulatedGraph.dependencies)) {
      pushNotification(
        NOTIFICATION_TYPES.error,
        <FormattedMessage {...messages.noTraversalTitle} />,
        <FormattedMessage {...messages.noTraversalDescription} />,
      )
      push(routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.skillNetwork))
    }
  }, [simulatedGraph])
  return (
    <div className="traversal">
      <Row>
        <TraversalTitle nodeName={entryNode ? entryNode.name : ''} />
      </Row>
      <Row>
        <Col span={17}>
          <Card title={<FormattedMessage {...messages.title} />}>
            {simulatedGraph.nodes ? (
              <GraphContainer
                graphToDisplay={graphTransformation(simulatedGraph)}
              />
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Col offset={1} span={6}>
          <TraversalMenu
            resetSimulation={resetSimulation}
            finishSimulation={finishSimulation}
            startSimulation={startSimulation}
            simulatedGraph={simulatedGraph}
            counter={counter}
            setSimulationSpeed={setSimulationSpeed}
            simulationSpeed={simulationSpeed}
            nodes={simulatedGraph.nodes}
            isSimulating={isSimulating}
            setIsSimulating={setIsSimulating}
          />
        </Col>
      </Row>
    </div>
  )
}

Traversal.propTypes = {
  graphData: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  simulatedGraph: PropTypes.objectOf(PropTypes.any).isRequired,
  loadSimulatedGraph: PropTypes.func.isRequired,
  updateSimulationNode: PropTypes.func.isRequired,
  resetSimulation: PropTypes.func.isRequired,
  finishSimulation: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

export default memo(Traversal)
