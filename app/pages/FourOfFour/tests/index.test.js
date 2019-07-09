
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import configureStore from '../../../configureStore'
import FourOfFourIndex from '../index'
import FourOfFour from '../FourOfFour'
import { DEFAULT_LOCALE } from '../../../i18n'


describe('<FourOfFourIndex />', () => {
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
            <FourOfFourIndex />
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
            <FourOfFourIndex />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
  })

})

describe('<FourOfFour/>', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <FourOfFour />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()

  })
})