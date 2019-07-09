/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { NOTIFICATION_TYPES } from 'shared/constants'
import { pushNotification } from 'shared/utils/notification'
import { errorsExtraction } from 'shared/utils/error-interceptors'
import reduxMiddlewares from './reduxMiddlewares'
import createReducer from './reducers'

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  // const error400Handling = store => next => action => {
  //   if (action.e && action.type.slice(-7) === 'FAILURE') {
  //     if (action.e.response.status === 400) {
  //       const errors = errorsExtraction(action.e.response.data.model)
  //       errors.forEach(error =>
  //         pushNotification(NOTIFICATION_TYPES.error, error),
  //       )
  //       next({ ...action, errors })
  //       return
  //     }
  //   }
  //   next(action)
  // }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    ...reduxMiddlewares,
  ]

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {} // Reducer registry
  store.injectedSagas = {} // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}
