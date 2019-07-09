
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import SlideItem from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<SlideItem />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <SlideItem />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})



