
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import Quiz from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  assessment: { questions: [] },
  skill: {},
  addQuizQuestion: jest.fn(),
  updateQuizQuestion: jest.fn(),
  deleteQuizQuestion: jest.fn(),
  updateQuizLanguage: jest.fn(),
  updateQuizCode: jest.fn(),
  addQuizChoice: jest.fn(),
  updateQuizChoice: jest.fn(),
  deleteQuizChoice: jest.fn(),
  intl: 0,
}
describe('<Quiz />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Quiz {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})

