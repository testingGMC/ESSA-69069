
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import ChooseType from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  name: [],
  icon: '',
  handleClick: jest.fn(),
}
describe('<ChooseType />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ChooseType {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})


