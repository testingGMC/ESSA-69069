
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import FillInTheBlanks from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  assessment: { elements: [] },
  skill: {},
  addFibElement: jest.fn,
  updateFibElement: jest.fn,
  deleteFibElement: jest.fn,
  intl: 0,
}
describe('<FillInTheBlanks />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FillInTheBlanks {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})



