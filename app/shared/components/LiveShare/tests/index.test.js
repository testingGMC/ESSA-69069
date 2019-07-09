
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import LiveShare from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
import configureStore from '../../../../configureStore'

const initialProps = {
  createHubConnection: jest.fn(),
  collaboratorJoined: jest.fn(),
  collaboratorLeft: jest.fn(),
  applyPatch: jest.fn(),
  setChangeTracking: jest.fn(),
  receiveChatMessage: jest.fn(),
  addContentOperations: jest.fn(),
  nodeOperationReceived: jest.fn(),
  linkOperationReceived: jest.fn()
}
describe('<LiveShare />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LiveShare {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })


})
