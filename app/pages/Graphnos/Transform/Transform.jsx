/**
 *
 * Transform
 *
 */

import React, { memo, useState, useEffect } from 'react'
import { Row, Col, Radio, Empty } from 'antd'
import PropTypes from 'prop-types'

import Card from 'shared/components/Card'
import { FormattedMessage } from 'react-intl'
import {
  ORIGINAL,
  DEPTH_TO_BREADTH,
  BREADTH_TO_DEPTH,
  MAGNIFY,
  PREVIEW,
  DEFAULT_WEIGHT,
  NOTIFICATION_TYPES,
} from 'shared/constants'
import { pushNotification } from 'shared/utils/notification'
import { graphTransformation } from '../helpers'
import messages from './messages'

import TransformMenu from '../TransformMenu'
import TransformTitle from '../TransformTitle'
import GraphContainer from '../GraphContainer'

import './transform.scss'

function Transform({ graphData, applyPBro, applyReversePBro, magnify }) {
  const [transformMode, setTransformMode] = useState('')
  const [firstLink, setFirstLink] = useState({})
  const [secondLink, setSecondLink] = useState({})
  const [selectedNode, setSelectedNode] = useState({})
  const [parentNode, setParentNode] = useState({})
  const [firstChildNode, setFirstChildNode] = useState({})
  const [secondChildNode, setSecondChildNode] = useState({})
  const [graphMode, setGraphMode] = useState(ORIGINAL)
  const [previewGraph, setPreviewGraph] = useState({ ...graphData })

  useEffect(() => {
    setPreviewGraph({ ...graphData })
  }, [graphData])

  const resetSelection = () => {
    setFirstLink({})
    setSecondLink({})
    setSelectedNode({})
    setParentNode({})
    setSecondChildNode({})
    setFirstChildNode({})
    setGraphMode(ORIGINAL)
    setPreviewGraph({ ...graphData })
  }

  const findNodeById = (id, graph) => graph.nodes.find(node => id === node.id)
  const findLink = (source, target, dependencies) =>
    dependencies.find(
      dependency =>
        dependency.source === source && dependency.target === target,
    )

  const selectLink = (source, target) => {
    const populatedLink = findLink(source, target, graphData.dependencies)
    if (transformMode === DEPTH_TO_BREADTH) {
      if (firstLink.id) {
        if (populatedLink.source === firstLink.target) {
          setSecondLink(populatedLink)
          setSecondChildNode(findNodeById(populatedLink.target, graphData))
        }
      } else {
        setFirstLink(populatedLink)
        setParentNode(findNodeById(populatedLink.source, graphData))
        setFirstChildNode(findNodeById(populatedLink.target, graphData))
      }
    } else if (transformMode === BREADTH_TO_DEPTH) {
      setFirstLink(populatedLink)
      setParentNode(findNodeById(populatedLink.source, graphData))
      setFirstChildNode(findNodeById(populatedLink.target, graphData))
    }
  }

  const selectNode = node => {
    const populatedNode = findNodeById(node, graphData)
    if (transformMode === MAGNIFY && populatedNode.type === 0) {
      setSelectedNode(populatedNode)
    }
  }

  const checkIsLowestDependency = dependency => {
    const isLowestDependency = true
    // eslint-disable-next-line no-restricted-syntax
    for (const d of graphData.dependencies) {
      if (dependency.source === d.source && d.weight < dependency.weight)
        return false
    }
    return isLowestDependency
  }

  const checkAndApply = () => {
    setGraphMode(ORIGINAL)
    switch (transformMode) {
      case DEPTH_TO_BREADTH:
        applyPBro(parentNode.id, firstChildNode.id, secondChildNode.id)
        break
      case BREADTH_TO_DEPTH:
        if (checkIsLowestDependency(firstLink))
          applyReversePBro(firstLink.source, firstLink.target)
        break
      case MAGNIFY:
        magnify(selectedNode.id)
        break
      default:
        break
    }
    resetSelection()
  }

  const applyPBroPreview = () => {
    let newGraph = {
      ...previewGraph,
      dependencies: [
        ...previewGraph.dependencies.filter(
          dependency =>
            !(
              dependency.source === secondLink.source &&
              dependency.target === secondLink.target
            ),
        ),
      ],
    }
    newGraph = applyMagnifyPreview(parentNode.id, newGraph)
    newGraph.dependencies = [
      ...newGraph.dependencies,
      {
        sourceId: firstLink.source,
        targetId: secondLink.target,
        weight: 1,
        id: firstLink.source + secondLink.target,
      },
    ]
    setPreviewGraph(newGraph)
  }
  const applyReversePBroPreview = () => {
    let newPreviewGraph = {
      ...previewGraph,
      dependencies: [
        ...previewGraph.dependencies.filter(
          dependency =>
            !(
              dependency.source === firstLink.source &&
              dependency.target === firstLink.target
            ),
        ),
      ],
    }
    newPreviewGraph.dependencies.forEach(dependency => {
      if (dependency.source === firstLink.source) {
        newPreviewGraph = applyMagnifyPreview(
          dependency.target,
          newPreviewGraph,
        )
      }
    })
    const newDependencies = []
    newPreviewGraph.dependencies.forEach(dependency => {
      if (dependency.source === firstLink.source) {
        newDependencies.push({
          sourceId: dependency.target,
          targetId: firstLink.target,
          weight: DEFAULT_WEIGHT,
          id: dependency.source + firstLink.target,
        })
      }
    })
    if (!newDependencies.length) {
      pushNotification(
        NOTIFICATION_TYPES.error,
        <FormattedMessage {...messages.previewError} />,
      )
      return
    }
    newPreviewGraph = {
      ...newPreviewGraph,
      dependencies: [...newPreviewGraph.dependencies, ...newDependencies],
    }
    setPreviewGraph(newPreviewGraph)
  }
  const applyMagnifyPreview = (sourceNode, graph = previewGraph) => {
    setPreviewGraph({
      ...graph,
      dependencies: graph.dependencies.map(dependency => {
        if (dependency.source === sourceNode) {
          return {
            ...dependency,
            weight: dependency.weight + 1,
          }
        }
        return dependency
      }),
    })

    return {
      ...graph,
      dependencies: graph.dependencies.map(dependency => {
        if (dependency.source === sourceNode) {
          return {
            ...dependency,
            weight: dependency.weight + 1,
          }
        }
        return dependency
      }),
    }
  }

  const applyPreview = () => {
    setGraphMode(PREVIEW)
    switch (transformMode) {
      case DEPTH_TO_BREADTH:
        applyPBroPreview()
        break
      case BREADTH_TO_DEPTH:
        if (checkIsLowestDependency(firstLink)) applyReversePBroPreview()
        break
      case MAGNIFY:
        applyMagnifyPreview(selectedNode.id)
        break
      default:
        break
    }
  }

  const canReset = () => {
    switch (transformMode) {
      case DEPTH_TO_BREADTH:
      case BREADTH_TO_DEPTH:
        if (firstLink.id) return false
        break
      case MAGNIFY:
        if (selectedNode.id) return false
        return true
      default:
        return true
    }
    return true
  }

  const isButtonDisabled = () => {
    switch (transformMode) {
      case DEPTH_TO_BREADTH:
        if (firstLink.id && secondLink.id) return false
        return true
      case BREADTH_TO_DEPTH:
        if (firstLink.id) return false
        break
      case MAGNIFY:
        if (selectedNode.id) return false
        return true
      default:
        return true
    }
    return true
  }
  const legend = [
    <Radio.Group onChange={e => setTransformMode(e.target.value)}>
      <Radio value={MAGNIFY}>
        <FormattedMessage {...messages.magnify} />
      </Radio>
      <Radio value={BREADTH_TO_DEPTH}>
        <FormattedMessage {...messages.reverse} />
      </Radio>
      <Radio value={DEPTH_TO_BREADTH}>
        <FormattedMessage {...messages.pBro} />
      </Radio>
    </Radio.Group>,
  ]
  return (
    <div className="transform">
      <Row>
        <TransformTitle />
      </Row>
      <Row>
        <Col span={17}>
          <Card
            // this feature is commented because it will be implemented later
            // extra={
            //   <button type="button" className="global-clean-button download">
            //     <Icon type="download" />
            //   </button>
            // }
            actions={legend}
            title={<FormattedMessage {...messages.title} />}
          >
            {graphData.nodes && graphData.nodes.length ? (
              <GraphContainer
                onClickLink={selectLink}
                onClickNode={selectNode}
                graphToDisplay={
                  graphMode === ORIGINAL
                    ? graphTransformation(graphData)
                    : graphTransformation(previewGraph)
                }
              />
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Col offset={1} span={6}>
          <TransformMenu
            firstLink={firstLink}
            secondLink={secondLink}
            transformMode={transformMode}
            parentNode={parentNode}
            firstChildNode={firstChildNode}
            secondChildNode={secondChildNode}
            selectedNode={selectedNode}
            checkAndApply={checkAndApply}
            applyPreview={applyPreview}
            resetSelection={resetSelection}
            isButtonDisabled={isButtonDisabled}
            canReset={canReset}
          />
        </Col>
      </Row>
    </div>
  )
}

Transform.propTypes = {
  graphData: PropTypes.objectOf(PropTypes.any).isRequired,
  applyPBro: PropTypes.func.isRequired,
  applyReversePBro: PropTypes.func.isRequired,
  magnify: PropTypes.func.isRequired,
}

export default memo(Transform)
