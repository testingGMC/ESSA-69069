/**
 *
 * LiveShareSelection
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ColorHash from 'color-hash'
import './live-share-selection.scss'

function LiveShareSelection({ children, selections, id, extendedStyle }) {
  const colorHash = new ColorHash()
  const renderElements = selectedElements => {
    if (
      selectedElements === undefined ||
      selectedElements === null ||
      selectedElements.length === 0
    )
      return children

    const element = selectedElements[0]
    const divStyle = {
      ...extendedStyle,
      border: `2px solid ${colorHash.hex(element.collaborator.fullName)}`,
    }

    return (
      <div className="live-share-selection" style={divStyle}>
        {renderElements(
          selectedElements.splice(1, selectedElements.length - 1),
        )}
      </div>
    )
  }
  const selectionsArray = Object.keys(selections).map(key => selections[key])
  const filteredSelections = selectionsArray.filter(e => e.id === id)
  return renderElements(filteredSelections)
}

LiveShareSelection.propTypes = {
  children: PropTypes.any,
  selections: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  extendedStyle: PropTypes.object,
}

export default memo(LiveShareSelection)
