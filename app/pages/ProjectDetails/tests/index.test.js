import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import ProjectDetailsIndex from '../index'
import ProjectDetails from '../ProjectDetails'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  deleteMember: jest.fn(),
  fetchProjectById: jest.fn(),
  fetchProjectStatsById: jest.fn(),
  addMember: jest.fn(),
  updateProject: jest.fn(),
  selectedProject: { loading: false },
  match: {
    params: { projectId: '1' },
  },
}

describe('<ProjectDetailsIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ProjectDetailsIndex {...initialProps} />
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
          <ProjectDetailsIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })
})
describe('<ProjectDetails />', () => {
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
          <ProjectDetails {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('should fetch the selectedProject on mount if the projectId exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ProjectDetails {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchProjectById).toHaveBeenCalled()
  })
})
