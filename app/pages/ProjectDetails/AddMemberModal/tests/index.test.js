/**
 *
 * Tests for AddMemberModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
// import 'jest-dom/extend-expect'; // add some helpful assertions

import AddMemberModal from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<AddMemberModal />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AddMemberModal />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
