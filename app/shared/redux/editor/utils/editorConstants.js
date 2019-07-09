export const LEARNING_STYLE = 'leaningStyle'
export const PAGE = 'page'
export const ASSESSMENT_ELEMENT = 'assessmentElement'
export const KEYWORD = 'keyword'

export const BLANK_TYPE = 0
export const PLACEHOLDER_TYPE = 1
export const NEW_LINE_TYPE = 2

export const QUIZ_TYPE = 0
export const REORDER_TYPE = 1
export const FILL_IN_THE_BLANKS_TYPE = 2
export const CODE_COMPILING_TYPE = 3

export const QUIZ_QUESTION_WITH_ONLY_TEXT = 0
export const QUIZ_QUESTION_WITH_CODE = 1

export const JAVASCRIPT = 29
export const JAVA = 26
export const PYTHON = 34
export const RUBY = 39
export const CSHARP = 16
export const ELIXIR = 20

export const LANGUAGES = {
  [JAVASCRIPT]: { key: JAVASCRIPT, label: 'javascript' },
  [JAVA]: { key: JAVA, label: 'java' },
  [PYTHON]: { key: PYTHON, label: 'python' },
  [RUBY]: { key: RUBY, label: 'ruby' },
  [CSHARP]: { key: CSHARP, label: 'csharp' },
  [ELIXIR]: { key: ELIXIR, label: 'elixir' },
}

export const TEMPLATE_WITH_TEXT = 0
export const TEMPLATE_WITH_VIDEO = 1
export const IN_QUEUE = 1
export const PROCESSING = 2
export const CORRECT_ANSWER = 3
export const WRONG_ANSWER = 4
export const TIME_LIMIT_EXCEEDED = 5
export const COMPILING_ERROR = 6
export const INTERNAL_ERROR = 13

export const EDITOR_CONTENT_ID = 'editor-content'
