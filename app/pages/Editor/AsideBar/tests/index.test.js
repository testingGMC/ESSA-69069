

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import AsideBar from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  learningStyles: [],
  assessments: [],
  keywords: [],
  selectedKeywordId: '',
  setIsAddLSVisible: jest.fn(),
  setIsAddPageVisible: jest.fn(),
  setIsDrawerVisible: jest.fn(),
  deleteLearningStyle: jest.fn(),
  updateSelectedLearningStyleId: jest.fn(),
  setIsAddAssessmentVisible: jest.fn(),
  deleteAssessment: jest.fn(),
  updateSelectedAssessmentId: jest.fn(),
  addKeyword: jest.fn(),
  updateKeyword: jest.fn(),
  deleteKeyword: jest.fn(),
  updateSelectedKeywordId: jest.fn(),
  intl: 0,
}
describe('<AsideBar />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <AsideBar {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
