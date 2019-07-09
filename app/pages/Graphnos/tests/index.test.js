import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory , BrowserRouter } from 'react-router-dom'

import GraphnosIndex from '../index'
import Graphnos from '../Graphnos'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  fetchGraph: jest.fn(),
  graphnos: {
    data: {
      graph: {
        nodes: {},
        trackFilters: {}
      }
    }
  },
  deleteNode: jest.fn(),
  createNode: jest.fn(),
  updateNode: jest.fn(),
  clearReducer: jest.fn(),
  createOrUpdateDependency: jest.fn(),
  deleteDependency: jest.fn(),
  loadSimulatedGraph: jest.fn(),
  updateSimulationNode: jest.fn(),
  duplicateNode: jest.fn(),
  resetSimulation: jest.fn(),
  finishSimulation: jest.fn(),
  applyPBro: jest.fn(),
  applyReversePBro: jest.fn(),
  magnify: jest.fn(),
  redirectToEditor: jest.fn(),
  updateTrackFilters: jest.fn(),
  updateNodeFilters: jest.fn(),
  loadSimulatedNodes: jest.fn(),
  roles: '',
  intl: 0,
  selectNode: jest.fn(),
  setPreviousNode: jest.fn(),
  setLink: jest.fn(),
}

describe('<GraphnosIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <GraphnosIndex {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <GraphnosIndex {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })
})
describe('<Graphnos />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Graphnos {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

})
