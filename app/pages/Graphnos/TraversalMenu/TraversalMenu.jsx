/**
 *
 * TraversalMenu
 *
 */

import React, { memo } from 'react'
import { Icon, Slider } from 'antd'
import Card from 'shared/components/Card'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './traversal-menu.scss'

function TraversalMenu({
  nodes,
  resetSimulation,
  finishSimulation,
  startSimulation,
  simulatedGraph,
  counter,
  setSimulationSpeed,
  simulationSpeed,
  isSimulating,
  setIsSimulating,
}) {
  const clearSimulationTimeout = () => {
    counter.forEach(c => {
      clearTimeout(c)
    })
  }
  return (
    <div className="simulate-menu">
      <Card title={<FormattedMessage {...messages.title} />}>
        <ol className="nodes">
          {nodes &&
            nodes
              .filter(node => node.type === 6)
              .map(node => <li>{node.name}</li>)}
        </ol>
        <div className="actions">
          <div className="icons">
            {!isSimulating ? (
              <button
                onClick={() => {
                  startSimulation(simulatedGraph.nodes)
                }}
                type="button"
                className="global-clean-button"
              >
                <Icon type="caret-right" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSimulating(false)
                  clearSimulationTimeout()
                }}
                type="button"
                className="global-clean-button"
              >
                <Icon type="pause" />
              </button>
            )}
            <button
              onClick={() => {
                setIsSimulating(false)
                clearSimulationTimeout()
                finishSimulation()
              }}
              type="button"
              className="global-clean-button"
            >
              <Icon type="forward" />
            </button>
            <button
              onClick={() => {
                setIsSimulating(false)
                clearSimulationTimeout()
                resetSimulation()
              }}
              type="button"
              className="global-clean-button"
            >
              <Icon type="rollback" />
            </button>
          </div>
          <div>
            <Slider
              onChange={e => setSimulationSpeed(e)}
              defaultValue={simulationSpeed}
            />

            <span>
              1 node per {(1000 - 10 * simulationSpeed) / 1000} second
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}

TraversalMenu.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  resetSimulation: PropTypes.func.isRequired,
  finishSimulation: PropTypes.func.isRequired,
  startSimulation: PropTypes.func.isRequired,
  simulatedGraph: PropTypes.objectOf(PropTypes.any).isRequired,
  counter: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  setSimulationSpeed: PropTypes.func.isRequired,
  simulationSpeed: PropTypes.number.isRequired,
  isSimulating: PropTypes.bool.isRequired,
  setIsSimulating: PropTypes.func.isRequired,
}

export default memo(TraversalMenu)
