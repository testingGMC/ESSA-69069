/**
 *
 * GraphContainer
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Graph from './Graph/graph/Graph'
import graphConfig from './graphConfig'
import './graph-container.scss'

function GraphContainer({ onClickNode, onClickLink, graphToDisplay }) {
  return (
    <div className="graph-container">
      <Graph
        id="graph-id"
        data={graphToDisplay}
        config={graphConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
    </div>
  )
}

GraphContainer.propTypes = {
  onClickNode: PropTypes.func,
  onClickLink: PropTypes.func,
  graphToDisplay: PropTypes.objectOf(PropTypes.any).isRequired,
}

GraphContainer.defaultProps = {
  onClickNode: () => null,
  onClickLink: () => null,
}

export default memo(GraphContainer)
