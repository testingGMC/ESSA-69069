import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import SelectTreeIndex from '../index'
import SelectTree from '../SelectTree'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  fetchTrees: jest.fn(),
  sendTree: jest.fn(),
  trees: {}
}

describe('<SelectTreeIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SelectTreeIndex {...initialProps} />
        </IntlProvider>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })


  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SelectTreeIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('<SelectTree/>', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SelectTree {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('should fetch the trees on mount if the tree exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SelectTree {...initialProps} trees />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchTrees).not.toHaveBeenCalled()
  })
})