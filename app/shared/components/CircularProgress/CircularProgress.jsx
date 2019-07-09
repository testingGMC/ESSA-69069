import React from 'react'
import PropTypes from 'prop-types'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './circular-progress.scss'

const CircularProgress = ({
  percentage,
  text,
  strokeWidth,
  pathColor,
  textColor,
  textFontSize,
  trailColor,
  title,
  titleFontSize,
  ...restOfProps
}) => (
  <div className="circular-progress">
    <div>
      <CircularProgressbar
        percentage={percentage}
        text={text}
        strokeWidth={strokeWidth}
        styles={{
          path: { stroke: pathColor },
          text: {
            fill: textColor,
            fontSize: `${textFontSize}px`,
            fontWeight: '600',
          },
          trail: { stroke: trailColor },
        }}
        initialAnimation
        className="circular-progress-bar"
        {...restOfProps}
      />
    </div>
    <span
      style={{
        fontSize: `${titleFontSize || 16}px`,
      }}
    >
      {title}
    </span>
  </div>
)

CircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.object.isRequired,
  pathColor: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  textFontSize: PropTypes.number,
  trailColor: PropTypes.string,
  titleFontSize: PropTypes.number,
}

CircularProgress.defaultProps = {
  strokeWidth: 4,
  textColor: '#393c40',
  textFontSize: 14,
  trailColor: '#f6f6f6',
  titleFontSize: 0,
}

export default CircularProgress
