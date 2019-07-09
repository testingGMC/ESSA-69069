/**
 *
 * Graphnos
 *
 */

import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet'
import { injectIntl, intlShape } from 'react-intl'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isContentArchitect } from 'shared/utils/access-token'
import routes from 'shared/routes'
import FourOfFour from 'pages/FourOfFour/'
import messages from './messages'
// sub pages
import SkillNetwork from './SkillNetwork'
import Traversal from './Traversal'
import Transform from './Transform'
import { traversalSimulation } from './helpers'

import './graphnos.scss'

const redirectSkillNetwork = () => <Redirect to="/graphnos/skill-network" />

const Graphnos = ({
  fetchGraph,
  graphnos,
  deleteNode,
  createNode,
  updateNode,
  createOrUpdateDependency,
  deleteDependency,
  loadSimulatedGraph,
  updateSimulationNode,
  duplicateNode,
  resetSimulation,
  finishSimulation,
  applyPBro,
  applyReversePBro,
  magnify,
  redirectToEditor,
  updateTrackFilters,
  updateNodeFilters,
  loadSimulatedNodes,
  roles,
  intl,
  selectNode,
  setPreviousNode,
  setLink,
  setShowModal,
  clearReducer,
  push,
  connectionStatus
}) => {
  useEffect(
    () => () => {
      clearReducer()
    },
    [],
  )
  useEffect(() => {
    async function fetchGraphWrapper() {
      await fetchGraph()
    }
    fetchGraphWrapper()
  }, [])
  const findNode = (nodeId, graph) =>
    graph.nodes.find(node => node.id === nodeId)
  const subGraphs = []
  const graphToDisplay = {
    nodes: [],
    dependencies: [],
  }
  if (graphnos.data.graph.nodes.length) {
    graphnos.data.trackFilters.forEach(track => {
      subGraphs.push(traversalSimulation(track, graphnos.data.graph))
    })
    graphnos.data.nodeFilters.forEach(node => {
      subGraphs.push({
        nodes: [findNode(node.id, graphnos.data.graph)],
        dependencies: [],
      })
    })
  }

  subGraphs.forEach(subGraph => {
    graphToDisplay.nodes = [...graphToDisplay.nodes, ...subGraph.nodes]
    graphToDisplay.dependencies = [
      ...graphToDisplay.dependencies,
      ...subGraph.dependencies,
    ]
  })
  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }
  return (
    <div className="graphnos">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>
      <Switch>
        <Route
          exact
          path={routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.skillNetwork)}
          render={props => (
            <SkillNetwork
              loading={graphnos.loading}
              graphToDisplay={
                graphToDisplay.nodes.length
                  ? graphToDisplay
                  : graphnos.data.graph
              }
              graphData={graphnos.data.graph}
              deleteNode={deleteNode}
              createNode={createNode}
              updateNode={updateNode}
              createOrUpdateDependency={createOrUpdateDependency}
              deleteDependency={deleteDependency}
              duplicateNode={duplicateNode}
              loadSimulatedGraph={loadSimulatedGraph}
              redirectToEditor={redirectToEditor}
              simulatedGraph={graphnos.data.simulatedGraph}
              updateTrackFilters={updateTrackFilters}
              updateNodeFilters={updateNodeFilters}
              nodeFilters={graphnos.data.nodeFilters}
              trackFilters={graphnos.data.trackFilters}
              loadSimulatedNodes={loadSimulatedNodes}
              roles={roles}
              selectedNode={graphnos.data.selectedNode}
              previousNode={graphnos.data.previousNode}
              link={graphnos.data.link}
              selectNode={selectNode}
              setPreviousNode={setPreviousNode}
              setLink={setLink}
              showModal={graphnos.data.showModal}
              setShowModal={setShowModal}
              connectionStatus={connectionStatus}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.traversal())}
          render={props => (
            <Traversal
              simulatedGraph={graphnos.data.simulatedGraph}
              graphData={graphnos.data.graph}
              loadSimulatedGraph={loadSimulatedGraph}
              updateSimulationNode={updateSimulationNode}
              isSimulating={graphnos.data.isSimulating}
              resetSimulation={resetSimulation}
              finishSimulation={finishSimulation}
              graphToDisplay={
                graphToDisplay.nodes.length
                  ? graphToDisplay
                  : graphnos.data.graph
              }
              push={push}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={routes.GRAPHNOS.linkPath(routes.GRAPHNOS.children.transform)}
          render={props =>
            isContentArchitect(roles) ? (
              <Transform
                applyPBro={applyPBro}
                applyReversePBro={applyReversePBro}
                magnify={magnify}
                graphData={
                  graphToDisplay.nodes.length
                    ? graphToDisplay
                    : graphnos.data.graph
                }
                graphToDisplay={
                  graphToDisplay.nodes.length
                    ? graphToDisplay
                    : graphnos.data.graph
                }
                {...props}
              />
            ) : (
              <Redirect
                to={routes.GRAPHNOS.linkPath(
                  routes.GRAPHNOS.children.skillNetwork,
                )}
              />
            )
          }
        />
        <Route component={FourOfFour} />
      </Switch>
    </div>
  )
}

Graphnos.propTypes = {
  fetchGraph: PropTypes.func.isRequired,
  graphnos: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteNode: PropTypes.func.isRequired,
  createNode: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,
  createOrUpdateDependency: PropTypes.func.isRequired,
  deleteDependency: PropTypes.func.isRequired,
  loadSimulatedGraph: PropTypes.func.isRequired,
  updateSimulationNode: PropTypes.func.isRequired,
  duplicateNode: PropTypes.func.isRequired,
  resetSimulation: PropTypes.func.isRequired,
  finishSimulation: PropTypes.func.isRequired,
  applyPBro: PropTypes.func.isRequired,
  applyReversePBro: PropTypes.func.isRequired,
  magnify: PropTypes.func.isRequired,
  redirectToEditor: PropTypes.func.isRequired,
  updateTrackFilters: PropTypes.func.isRequired,
  updateNodeFilters: PropTypes.func.isRequired,
  loadSimulatedNodes: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  selectNode: PropTypes.func.isRequired,
  setPreviousNode: PropTypes.func.isRequired,
  setLink: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  clearReducer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  connection: PropTypes.object.isRequired,
  isConnectedToLiveshare: PropTypes.bool.isRequired,
  connectionStatus: PropTypes.number.isRequired,
}

export default injectIntl(Graphnos)
