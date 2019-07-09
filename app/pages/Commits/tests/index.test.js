
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import CommitsIndex from '../index'
import Commits from '../Commits'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  fetchCommits: jest.fn(),
  fetchLatestCommits: jest.fn(),
  revertToACommit: jest.fn(),
  commits: {}
}

describe('<CommitsIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CommitsIndex {...initialProps} />
        </IntlProvider>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })


  it('Expect to not log errors in console', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CommitsIndex {...initialProps} Commits />
        </IntlProvider>
      </Provider>,
    )
  })

})

describe('<Commits/>', () => {
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
          <Commits {...initialProps} commits />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()

  })

  it('should fetch the Commits on mount if the CommitsId exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Commits {...initialProps} commits />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchCommits).toHaveBeenCalled()
  })
})