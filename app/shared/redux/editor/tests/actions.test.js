import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchSkills action', () => {
  it('has a type of FETCH_SKILL_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_SKILL_REQUEST,
    }
    expect(ACTIONS.fetchSkill()).toEqual(expected)
  })
})

describe('addLearningStyle action', () => {
  it('has a type of ADD_LEARNING_STYLE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_LEARNING_STYLE_REQUEST,
    }
    expect(ACTIONS.addLearningStyle()).toEqual(expected)
  })
})

describe('deleteLearningStyle action', () => {
  it('has a type of DELETE_LEARNING_STYLE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_LEARNING_STYLE_REQUEST,
    }
    expect(ACTIONS.deleteLearningStyle()).toEqual(expected)
  })
})

describe('addPage action', () => {
  it('has a type of ADD_PAGE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_PAGE_REQUEST,
    }
    expect(ACTIONS.addPage()).toEqual(expected)
  })
})

describe('updatePage action', () => {
  it('has a type of UPDATE_PAGE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_PAGE_REQUEST,
    }
    expect(ACTIONS.updatePage()).toEqual(expected)
  })
})

describe('deletePage action', () => {
  it('has a type of DELETE_PAGE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_PAGE_REQUEST,
    }
    expect(ACTIONS.deletePage()).toEqual(expected)
  })
})

describe('addAssessment action', () => {
  it('has a type of ADD_ASSESSMENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_ASSESSMENT_REQUEST,
    }
    expect(ACTIONS.addAssessment()).toEqual(expected)
  })
})

describe('deleteAssessment action', () => {
  it('has a type of DELETE_ASSESSMENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_ASSESSMENT_REQUEST,
    }
    expect(ACTIONS.deleteAssessment()).toEqual(expected)
  })
})

describe('updateSelectedAssessmentId action', () => {
  it('has a type of UPDATE_SELECTED_ASSESSMENT_ID_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_REQUEST,
    }
    expect(ACTIONS.updateSelectedAssessmentId()).toEqual(expected)
  })
})

describe('fetchTemplates action', () => {
  it('has a type of FETCH_TEMPLATES_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_TEMPLATES_REQUEST,
    }
    expect(ACTIONS.fetchTemplates()).toEqual(expected)
  })
})

describe('addTemplate action', () => {
  it('has a type of ADD_TEMPLATE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_TEMPLATE_REQUEST,
    }
    expect(ACTIONS.addTemplate()).toEqual(expected)
  })
})

describe('deleteTemplate action', () => {
  it('has a type of DELETE_TEMPLATE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_TEMPLATE_REQUEST,
    }
    expect(ACTIONS.deleteTemplate()).toEqual(expected)
  })
})

describe('updateTemplate action', () => {
  it('has a type of UPDATE_TEMPLATE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_TEMPLATE_REQUEST,
    }
    expect(ACTIONS.updateTemplate()).toEqual(expected)
  })
})

describe('updateSelectedLearningStyleId action', () => {
  it('has a type of UPDATE_SELECTED_LEARNING_STYLE_ID_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_REQUEST,
    }
    expect(ACTIONS.updateSelectedLearningStyleId()).toEqual(expected)
  })
})

describe('addKeyword action', () => {
  it('has a type of ADD_KEYWORD_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_KEYWORD_REQUEST,
    }
    expect(ACTIONS.addKeyword()).toEqual(expected)
  })
})

describe('updateKeyword action', () => {
  it('has a type of UPDATE_KEYWORD_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_KEYWORD_REQUEST,
    }
    expect(ACTIONS.updateKeyword()).toEqual(expected)
  })
})

describe('deleteKeyword action', () => {
  it('has a type of DELETE_KEYWORD_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_KEYWORD_REQUEST,
    }
    expect(ACTIONS.deleteKeyword()).toEqual(expected)
  })
})

describe('updateSelectedKeywordId action', () => {
  it('has a type of UPDATE_SELECTED_KEYWORD_ID_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_REQUEST,
    }
    expect(ACTIONS.updateSelectedKeywordId()).toEqual(expected)
  })
})

describe('addReorderChallengeStatement action', () => {
  it('has a type of ADD_REORDER_CHALLENGE_STATEMENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_REQUEST,
    }
    expect(ACTIONS.addReorderChallengeStatement()).toEqual(expected)
  })
})

describe('updateReorderChallengeStatement action', () => {
  it('has a type of UPDATE_REORDER_CHALLENGE_STATEMENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    }
    expect(ACTIONS.updateReorderChallengeStatement()).toEqual(expected)
  })
})

describe('deleteReorderChallengeStatement action', () => {
  it('has a type of DELETE_REORDER_CHALLENGE_STATEMENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    }
    expect(ACTIONS.deleteReorderChallengeStatement()).toEqual(expected)
  })
})
