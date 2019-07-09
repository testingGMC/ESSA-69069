/**
 *
 * FourOfFour
 *
 */

import React from 'react'

// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import './four-of-four.scss'
import { Link } from 'react-router-dom'
import routes from 'shared/routes'
import messages from './messages'

const FourOfFour = () => (
  <div className="four-of-four error-pages">
    <Helmet>
      <title>FourOfFour</title>
      <meta name="description" content="Description of FourOfFour" />
    </Helmet>

    <div className="content">
      <div className="page-not-found-title">
        <FormattedMessage {...messages.pageNotFound} />
      </div>
      <div className="page-not-found-description">
        <FormattedMessage {...messages.descriptionPart1} />
        <br />
        <FormattedMessage {...messages.descriptionPart2} />
        <Link to={routes.DASHBOARD.path}>
          {' '}
          <FormattedMessage {...messages.descriptionPart3} />
        </Link>
        .
      </div>
    </div>
  </div>
)

FourOfFour.propTypes = {}

export default FourOfFour
