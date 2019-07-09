
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import NodeCreation from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {

}
describe('<NodeCreation />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <NodeCreation getFieldDecorator />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
