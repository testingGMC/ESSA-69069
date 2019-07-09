import { COLORS } from 'shared/constants'

export const findNode = (nodes, nodeId) =>
  nodes.find(node => node.id === nodeId)

export const findLink = (links, source, target) =>
  links.find(
    link =>
      (link.source === source && link.target === target) ||
      (link.source === target && link.target === target),
  )

export const retrieveNodes = (nodes, source, target) => {
  const result = nodes.reduce(
    (acc, node) => {
      if (node.id === source) {
        acc[0] = node
      } else if (node.id === target) {
        acc[1] = node
      }
      return acc
    },
    ['source', 'target'],
  )
  return result
}

const nodesStructTransformation = nodes => {
  const newNodes = {}
  nodes.forEach(node => {
    newNodes[node.id] = { ...node, successors: [], dependencies: [] }
  })
  return newNodes
}

const dependenciesStructTransformation = dependencies => {
  const newDependencies = {}
  dependencies.forEach(dependency => {
    newDependencies[dependency.id] = { ...dependency }
  })
  return newDependencies
}

const fillSuccessors = graph => {
  const newGraph = { ...graph }
  const dependenciesId = Object.keys(newGraph.dependencies)
  dependenciesId.forEach(id => {
    const dependency = newGraph.dependencies[id]
    newGraph.nodes[dependency.sourceId].successors.push(dependency.targetId)
  })
  return newGraph.nodes
}

const fillNodesOutgoingDependencies = graph => {
  const newGraph = { ...graph }
  const dependenciesId = Object.keys(newGraph.dependencies)
  dependenciesId.forEach(id => {
    const dependency = newGraph.dependencies[id]
    newGraph.nodes[dependency.sourceId].dependencies.push(id)
  })
  return newGraph.nodes
}

const fillNodesDependencies = graph => {
  const newGraph = { ...graph }
  const dependenciesId = Object.keys(newGraph.dependencies)
  dependenciesId.forEach(id => {
    const dependency = newGraph.dependencies[id]
    newGraph.nodes[dependency.sourceId].dependencies.push(id)
    newGraph.nodes[dependency.targetId].dependencies.push(id)
  })
  return newGraph.nodes
}

export const newGraphStructDuplicateSkill = graph => {
  const newGraph = {
    nodes: nodesStructTransformation(graph.nodes),
    dependencies: dependenciesStructTransformation(graph.dependencies),
  }
  newGraph.nodes = fillSuccessors(newGraph)
  newGraph.nodes = fillNodesDependencies(newGraph)
  return newGraph
}

export const newGraphStruct = graph => {
  const newGraph = {
    nodes: nodesStructTransformation(graph.nodes),
    dependencies: dependenciesStructTransformation(graph.dependencies),
  }
  newGraph.nodes = fillSuccessors(newGraph)
  newGraph.nodes = fillNodesOutgoingDependencies(newGraph)
  return newGraph
}

// here we assume we have a graph with nodes with
// with the right structure and filled with their
// successors and dependencies (where the node is
// the source)

const extractSubGraphNodes = (initialNode, graph, newNodes) => {
  if (initialNode.successors.length) {
    initialNode.successors.forEach(successor => {
      extractSubGraphNodes(graph.nodes[successor], graph, newNodes)
    })
  }
  // newNodes.push(initialNode)
  newNodes[initialNode.id] = initialNode
}

const extractSubGraphDependencies = (graph, newNodes) => {
  const dependenciesId = Object.keys(graph.dependencies)
  const dependencies = dependenciesId.filter(id => {
    const dependency = graph.dependencies[id]
    return newNodes[dependency.sourceId] && newNodes[dependency.targetId]
  })

  const result = {}

  dependencies.forEach(el => {
    result[el] = graph.dependencies[el]
  })
  return result
}

export const extractSubGraph = (initialNode, graph) => {
  const newNodes = {}
  extractSubGraphNodes(initialNode, graph, newNodes)
  const newDependencies = extractSubGraphDependencies(graph, newNodes)
  return {
    nodes: newNodes,
    dependencies: newDependencies,
  }
}

const sortDependenciesByWeight = (nodeId, graph) => {
  const { dependencies } = graph.nodes[nodeId]
  return dependencies.sort(
    (a, b) => graph.dependencies[a].weight - graph.dependencies[b].weight,
  )
}

const traversal = (initialNode, subGraph, newNodes) => {
  if (initialNode.successors.length) {
    const sortedDependenciesIds = sortDependenciesByWeight(
      initialNode.id,
      subGraph,
    )
    sortedDependenciesIds.forEach(dependency => {
      const node = subGraph.nodes[subGraph.dependencies[dependency].targetId]
      traversal(node, subGraph, newNodes)
    })
  }
  newNodes.push(initialNode)
}

export const traversalSimulation = (initialNode, graph) => {
  const structuredGraph = newGraphStruct(graph)
  const subGraph = extractSubGraph(
    structuredGraph.nodes[initialNode.id],
    structuredGraph,
  )
  const newNodes = []
  traversal(structuredGraph.nodes[initialNode.id], subGraph, newNodes)
  return {
    nodes: newNodes,
    dependencies: Object.keys(subGraph.dependencies).map(
      key => subGraph.dependencies[key],
    ),
  }
}

const hasCircularDependency = (initialNode, graph, sourceNode) => {
  if (initialNode.successors.length) {
    const sortedDependenciesIds = sortDependenciesByWeight(
      initialNode.id,
      graph,
    )
    // eslint-disable-next-line no-restricted-syntax
    for (const dependency of sortedDependenciesIds) {
      const node = graph.nodes[graph.dependencies[dependency].targetId]
      if (node.id === sourceNode.id) return true
      const isCircular = hasCircularDependency(node, graph, sourceNode)
      if (isCircular) return true
    }
  }
  return false
}

export const checkCircularDependency = (sourceNode, targetNode, graph) => {
  const newGraph = {
    ...graph,
    dependencies: [
      ...graph.dependencies,
      {
        sourceId: sourceNode.id,
        targetId: targetNode.id,
        id: sourceNode.id + targetNode.id,
        weight: 1,
      },
    ],
  }
  const structuredGraph = newGraphStruct(newGraph)
  return hasCircularDependency(
    structuredGraph.nodes[targetNode.id],
    structuredGraph,
    sourceNode,
  )
}

export const graphTransformation = graph => {
  const nodes = graph.nodes.map(node => ({
    id: node.id,
    color: COLORS[node.type],
    name: node.name,
    type: node.type,
    description: node.description,
  }))
  const dependencies = graph.dependencies.map(dependency => ({
    source: dependency.sourceId,
    target: dependency.targetId,
    weight: dependency.weight,
    id: dependency.id,
  }))
  return {
    nodes,
    links: dependencies,
  }
}
