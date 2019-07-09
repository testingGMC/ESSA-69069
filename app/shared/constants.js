export const UPDATE_MODE = 'update'
export const ADD_MODE = 'add'

export const EMPTY_VALUE = ''
export const BREAK_LINE = '<br>'

export const TODO_STATE = 0
export const ACTIVE_STATE = 1
export const RESOLVED_STATE = 2
export const DONE_STATE = 3

export const TASK_TYPE = 0
export const BUG_TYPE = 1

export const ACK_STATUS = 0
export const REJECTED_STATUS = 1
export const DUPLICATED_STATUS = 2
export const RESOLVED_STATUS = 3
export const PENDING_STATUS = 4

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const GET = 'get'
export const URL_SEPARATOR = '/'

export const STATUS = {
  [ACK_STATUS]: { key: ACK_STATUS, title: 'Acknowledged', color: 'orange' },
  [REJECTED_STATUS]: {
    key: REJECTED_STATUS,
    title: 'Rejected',
    color: 'red',
  },
  [DUPLICATED_STATUS]: {
    key: DUPLICATED_STATUS,
    title: 'Duplicated',
    color: 'cyan',
  },
  [RESOLVED_STATUS]: {
    key: RESOLVED_STATUS,
    title: 'Resolved',
    color: 'green',
  },
  [PENDING_STATUS]: {
    key: PENDING_STATUS,
    title: 'Pending',
    color: 'geekblue',
    cssColor: 'blue',
  },
}

export const WEIGHT_STEP = 0.1
export const MINIMUM_WEIGHT = 0
export const DEFAULT_WEIGHT = 0.9
export const CHANGE_ME = 'Change me'

export const UPDATE = 'update'
export const CREATION = 'creation'
export const ORIGINAL = 'original'
export const PREVIEW = 'preview'
export const DEPTH_TO_BREADTH = 'depth-to-breadth'
export const BREADTH_TO_DEPTH = 'breadth-to-depth'
export const MAGNIFY = 'magnify'

export const COLORS = {
  0: '#e74c3c', // skill
  1: '#3a9d23', // superSkill
  2: '#2980b9', // track
  3: '#E1A101', // checkpoint
  4: '#800080', // reward
  5: '#FF6633', // workshop
  6: 'blue', // traversed node
}

export const TYPES = {
  '#e74c3c': 0,
  '#3a9d23': 1,
  '#2980b9': 2,
  '#E1A101': 3,
  '#800080': 4,
  '#FF6633': 5,
  blue: 6,
}

export const TYPES_TO_STRINGS = {
  0: 'skill',
  1: 'super skill',
  2: 'track',
  3: 'checkpoint',
  4: 'reward',
  5: 'workshop',
  6: 'superskill',
}

export const NODE_TYPES = {
  skill: 0,
  superSkill: 1,
  track: 2,
  checkpoint: 3,
  reward: 4,
  workshop: 5,
}

export const NOTIFICATION_TYPES = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export const ALLOWED_DEPENDENCIES = {
  // concat of source and target types
  '03': true,
  '04': true,
  '00': true,
  '10': true,
  '11': true,
  '05': true,
  '20': true,
  '21': true,
}

export const CONTENT_ARCHITECT = 'CONTENT_ARCHITECT'
export const CONTENT_CREATOR = 'CONTENT_CREATOR'
export const ONESIGNAL_APPID = '01563127-9476-499c-a17e-783e249084bf'

export const X_IDENTITY_URL = 'https://identity.x.gomycode.co/token'

export const YEAR_MONTH_DAY_DATE_FORMAT = 'YYYY-MM-DD'

export const NO_NAME = 'No Name'

export const MINIMUM_SPRINT_LENGTH = 7

export const SENTRY_DSN_URL =
  'https://0e4dbb2b161e43eababa59eb2205b792@sentry.io/1495968'
