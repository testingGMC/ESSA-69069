


import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import TopBar from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
import configureStore from '../../../../configureStore'


const initialProps = {
  children: [],
}

describe('<TopBar />', () => {
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
            <TopBar {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })


  it('Expect to not log errors in console', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <TopBar {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    )
  })

})