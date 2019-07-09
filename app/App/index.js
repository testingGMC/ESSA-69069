/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import { makeSelectRoles } from 'shared/redux/profile/selectors'
import reducer from 'shared/redux/profile/reducer'
import * as actions from 'shared/redux/profile/actions'
import saga from 'shared/redux/profile/saga'
import { X_IDENTITY_URL } from 'shared/constants'
import FourOfFour from 'pages/FourOfFour'
import {
  setAccessTokenIfDefined,
  getRoles,
  isContentArchitect,
} from '../shared/utils/access-token'
import Layout from './Layout'
import routes from '../shared/routes'
import { registerPushNotification } from '../shared/utils/onesignal'
import './global-styles.scss'

function App({ setRoles, roles }) {
  useInjectReducer({ key: 'profile', reducer })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location = `${X_IDENTITY_URL}?redirectUrl=${window.location.href}`
    }
  })
  useEffect(() => {
    const rolesFromToken = getRoles()
    setRoles(rolesFromToken)
  }, [])
  setAccessTokenIfDefined()
  useEffect(() => {
    registerPushNotification()
  }, [])

  return (
    <div>
      <Layout>
        {roles.length ? (
          <Switch>
            <Route
              exact
              path={routes.ROOT.path}
              render={() => <Redirect to={routes.DASHBOARD.path} />}
            />
            <Route
              exact
              path={routes.DASHBOARD.path}
              render={props => (
                <routes.DASHBOARD.component roles={roles} {...props} />
              )}
            />
            <Route
              exact
              path={routes.STUDENTLIST.path}
              render={props => (
                <routes.STUDENTLIST.component roles={roles} {...props} />
              )}
            />
            <Route
              exact
              path={routes.PROJECT_DETAILS.path}
              render={props => (
                <routes.PROJECT_DETAILS.component roles={roles} {...props} />
              )}
            />
            <Route
              path={routes.GRAPHNOS.path}
              render={props => (
                <routes.GRAPHNOS.component roles={roles} {...props} />
              )}
            />
            <Route
              path={routes.ISSUES.path}
              render={props => (
                <routes.ISSUES.component roles={roles} {...props} />
              )}
            />
            <Route
              path={routes.TREE.path}
              render={props =>
                isContentArchitect(roles) ? (
                  <routes.TREE.component roles={roles} {...props} />
                ) : (
                    <Redirect
                      to={routes.GRAPHNOS.linkPath(
                        routes.GRAPHNOS.children.skillNetwork,
                      )}
                    />
                  )
              }
            />
            <Route
              path={routes.SPRINT_BOARD.path}
              render={props => (
                <routes.SPRINT_BOARD.component roles={roles} {...props} />
              )}
            />
            <Route
              path={routes.EDITOR.path}
              render={props => (
                <routes.EDITOR.component roles={roles} {...props} />
              )}
            />
            <Route
              path={routes.COMMITS.path}
              render={props => (
                <routes.COMMITS.component roles={roles} {...props} />
              )}
            />
            <Route component={FourOfFour} />
          </Switch>
        ) : (
            <div className="global-loading-spinner">
              <Spin size="large" />
            </div>
          )}
      </Layout>
    </div>
  )
}
App.propTypes = {
  roles: PropTypes.array,
  setRoles: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'profile', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(App)
