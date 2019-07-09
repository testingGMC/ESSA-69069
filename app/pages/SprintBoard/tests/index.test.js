
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import SprintBoardIndex from '../index'
import SprintBoard from '../SprintBoard'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'

const initialProps = {
  sprints: {},
  selectedSprintId: '',
  selectedProject: {},
  fetchSprintsFirstTime: jest.fn(),
  updateWorkItemState: jest.fn(),
  deleteWorkItem: jest.fn(),
  fetchWorkItems: jest.fn(),
  addWorkItem: jest.fn(),
  fetchProjectById: jest.fn(),
  updateWorkItem: jest.fn(),
  addSprint: jest.fn(),
  match: {},
  match: {
    params: { projectId: '1' },
  },
  // sprints: { data: {} }
}

describe('<SprintBoardIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SprintBoardIndex {...initialProps} />
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
          <SprintBoardIndex {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('<SprintBoard />', () => {
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
          <SprintBoard {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()
  })

  it('should fetch the SprintBoard on mount if the sprintId exists', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SprintBoard {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(initialProps.fetchSprintsFirstTime).toHaveBeenCalled()
  })
})