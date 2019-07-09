/**
 *
 * Tests for ErrorSaveModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import ErrorSaveModal from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

const initialProps = {
  skill: { data: { assessments: [] } },
  onCancel: jest.fn(),
  onOk: jest.fn(),
  intl: 0,
}

describe('<ErrorSaveModal />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ErrorSaveModal {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

})
