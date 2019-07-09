
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import AddWorkItem from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<AddWorkItem />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AddWorkItem />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

})
