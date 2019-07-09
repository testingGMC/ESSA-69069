
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import ProjectsIndex from '../index'
import Dashboard from '../Dashboard'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'


const initialProps = {
  fetchProjects: jest.fn(),
  addProject: jest.fn(),
  deleteProject: jest.fn(),
  projects: {}
}

describe('<ProjectsIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ProjectsIndex {...initialProps} />
        </IntlProvider>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })


  it('Expect to not log errors in console', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ProjectsIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    })

})

describe('<Dashboard/>', () => {
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
          <Dashboard {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()

  })

  it('should fetch the Projects on mount if the projectId exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Dashboard {...initialProps} projects />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchProjects).toHaveBeenCalled()
  })
})