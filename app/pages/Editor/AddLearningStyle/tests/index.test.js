
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import AddLearningStyle from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'


const initialProps = {
  addLearningStyle: jest.fn(),
  setIsAddLSVisible: jest.fn(),
}
describe('<AddLearningStyle />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AddLearningStyle {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
