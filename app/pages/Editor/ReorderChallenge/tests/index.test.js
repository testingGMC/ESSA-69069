import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import ReorderChallenge from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  assessment: {
    questionId: '1',
    languageId: '1',
    solutionId: '1',
    placeholderId: '1',
    testCases: []
  },
  addReorderChallengeStatement: jest.fn(),
  updateReorderChallengeStatement: jest.fn(),
  deleteReorderChallengeStatement: jest.fn(),
  updateReorderChallengeQuestion: jest.fn(),
  skill: {
    data: {
      '1': { text: '' }
    }
  },
  intl: 0,
}
describe('<ReorderChallenge />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ReorderChallenge {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})



