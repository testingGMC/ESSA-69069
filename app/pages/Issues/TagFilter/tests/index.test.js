/**
 *
 * Tests for TagFilter
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TagFilter from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<TagFilter />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TagFilter />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
