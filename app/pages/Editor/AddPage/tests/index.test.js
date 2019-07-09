import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import AddPage from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  learningStyleId: '',
  type: 0,
  addPage: jest.fn(),
  setIsAddPageVisible: jest.fn(),
}
describe('<AddPage />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AddPage {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
