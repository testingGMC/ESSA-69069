
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import EditorIndex from '../index'
import Editor from '../Editor'
import { DEFAULT_LOCALE } from '../../../i18n'
import configureStore from '../../../configureStore'


const initialProps = {
  learningStyles: [],
  clearState: jest.fn(),
  createOrLoadSkillInstance: jest.fn(),
  keywords: [],
  assessments: [],
  connectedUsers: [],
  fetchSkill: jest.fn(),
  updateSkill: jest.fn(),
  addLearningStyle: jest.fn(),
  addPage: jest.fn(),
  deletePage: jest.fn(),
  deleteLearningStyle: jest.fn(),
  updateSelectedLearningStyleId: jest.fn(),
  addAssessment: jest.fn(),
  deleteAssessment: jest.fn(),
  updateSelectedAssessmentId: jest.fn(),
  addKeyword: jest.fn(),
  updateKeyword: jest.fn(),
  deleteKeyword: jest.fn(),
  updateSelectedKeywordId: jest.fn(),
  addReorderChallengeStatement: jest.fn(),
  updateReorderChallengeStatement: jest.fn(),
  deleteReorderChallengeStatement: jest.fn(),
  addQuizQuestion: jest.fn(),
  updateQuizQuestion: jest.fn(),
  deleteQuizQuestion: jest.fn(),
  addQuizChoice: jest.fn(),
  updateQuizChoice: jest.fn(),
  deleteQuizChoice: jest.fn(),
  skill: { data: {} },
  match: {},
  match: {
    params: { skillId: '' }
  }
}

describe('<EditorIndex />', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('Expect to not log in console', () => {
    const spy = jest.spyOn(global.console, 'log')
    render(

      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <EditorIndex {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    )
    expect(spy).not.toHaveBeenCalled()
  })


  it('Expect to not log errors in console', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <EditorIndex {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
  })

})

describe('<Editor/>', () => {
  let store
  beforeAll(() => {
    store = configureStore({}, browserHistory)
  })

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Editor {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
    expect(firstChild).toMatchSnapshot()

  })

  it('should fetch the editor on mount if the skillId exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <Editor {...initialProps} />
          </IntlProvider>
        </BrowserRouter>
      </Provider>,
    )
    expect(initialProps.fetchSkill).toHaveBeenCalled()
  })
})