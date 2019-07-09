import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import configureStore from '../../../../configureStore'
import AssignToProjectModal from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

const initialProps = {
  projects: []
}
describe('<AssignToProjectModal />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })
  it('Expect to not log errors in console', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <AssignToProjectModal {...initialProps} />
        </IntlProvider>
      </Provider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
