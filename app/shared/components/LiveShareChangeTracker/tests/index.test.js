
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import LiveShareChangeTracker from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
import configureStore from '../../../../configureStore'

const initialProps = {
  isConnected: false,
  data: {},
  sendPatch: jest.fn(),
  connection: {},
  skillId: '',
  trackChanges: false
}
describe('<LiveShareChangeTracker />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LiveShareChangeTracker {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

})
