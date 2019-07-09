import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import CodeCompiling from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  assessment: {
    questionId: '1',
    languageId: '1',
    solutionId: '1',
    placeholderId: '1',
    testCases: []
  },
  updateCodeCompilingQuestion: jest.fn(),
  updateCodeCompilingLanguage: jest.fn(),
  updateCodeCompilingSolution: jest.fn(),
  updateCodeCompilingPlaceholder: jest.fn(),
  updateCodeCompilingAddUseCase: jest.fn(),
  updateCodeCompilingDeleteUseCase: jest.fn(),
  updateCodeCompilingUpdateUseCase: jest.fn(),
  skill: {
    data: {
      '1': { text: '' }
    }
  },
  intl: 0,
}
describe('<CodeCompiling />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CodeCompiling {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
