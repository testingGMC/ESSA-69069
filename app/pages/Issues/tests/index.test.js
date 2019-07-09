import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import IssuesIndex from '../index'
import Issues from '../Issues'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  fetchIssues: jest.fn(),
  updateStatus: jest.fn(),
  issues: {},
  skills: {},
  projects: [],
  fetchSkills: jest.fn(),
  updateStatus: jest.fn(),
  addWorkItem: jest.fn(),
  fetchProjects: jest.fn(),
}

describe('<IssuesIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <IssuesIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <IssuesIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

})

describe('<Issues />', () => {
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
          <Issues {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('should fetch the issues on mount if the issueId exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Issues {...initialProps} issues skills projects />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchIssues).toHaveBeenCalled()
  })
})