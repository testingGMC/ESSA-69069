import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'

import VersionsHistory from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
import configureStore from '../../../../configureStore'

describe('<VersionsHistory />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <VersionsHistory ReferenceError groups />
        </IntlProvider>
      </Provider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

})
