import produce from 'immer'
import moment from 'moment'
import _ from 'lodash'
import * as CONSTANTS from './constants'

export const initialState = {
  loading: false,
  isAddMemberModalVisible: false,
  isUpdateModalVisible: false,
}

/* eslint-disable default-case, no-param-reassign */
const selectedProjectReducer = (state = initialState, action) =>
  produce(state, draft => {
    let memberPos
    let progress
    let estimatedProgress
    let efficiency

    switch (action.type) {
      case CONSTANTS.FETCH_PROJECT_BY_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_PROJECT_BY_ID_SUCCESS:
        draft.data = action.project
        draft.loading = false
        break
      case CONSTANTS.FETCH_PROJECT_BY_ID_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.FETCH_PROJECT_STATS_BY_ID_REQUEST:
        draft.loadingStats = true
        break
      case CONSTANTS.FETCH_PROJECT_STATS_BY_ID_SUCCESS:
        if (!draft.data) {
          draft.data = {}
        }
        draft.data.stats = {}
        draft.data.stats.numberOfTasks = action.numbers.numberOfTasks
        draft.data.stats.numberOfCompletedTasks =
          action.numbers.numberOfCompletedTasks

        if (action.numbers.numberOfSkills === 0) {
          progress = 0
        } else {
          progress =
            action.numbers.numberOfCompletedTasks /
            action.numbers.numberOfSkills
        }
        if (draft.data.startDate && draft.data.dueDate) {
          const { numberOfCompletedTasks } = action.numbers
          const now = moment()
          const { startDate } = draft.data
          const diffPart1 = now.diff(moment(startDate), 'Days')
          const { numberOfTasks } = action.numbers
          const { dueDate } = draft.data
          const diffPart2 = moment(dueDate).diff(moment(startDate), 'Days')
          if (diffPart1 <= 0 || diffPart2 === 0 || numberOfTasks === 0) {
            efficiency = 0
            estimatedProgress = 0
          } else {
            estimatedProgress = diffPart1 / diffPart2
            efficiency = progress - estimatedProgress
          }
          if (numberOfTasks) {
            progress = numberOfCompletedTasks / numberOfTasks
          }
        }
        draft.data.stats.progress = progress
        draft.data.stats.estimatedProgress = estimatedProgress
        draft.data.stats.efficiency = efficiency
        draft.loadingStats = false
        break
      case CONSTANTS.FETCH_PROJECT_STATS_BY_ID_FAILURE:
        draft.loadingStats = false
        break

      case CONSTANTS.ADD_PROJECT_MEMBER_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_PROJECT_MEMBER_SUCCESS:
        draft.data.members.push(action.member)
        draft.isAddMemberModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.ADD_PROJECT_MEMBER_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_SUCCESS:
        draft.data.members = action.members
        draft.loading = false
        break
      case CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_PROJECT_MEMBER_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_PROJECT_MEMBER_SUCCESS:
        memberPos = draft.data.members.findIndex(m => m.id === action.memberId)
        draft.data.members.splice(memberPos, 1)
        draft.loading = false
        break
      case CONSTANTS.DELETE_PROJECT_MEMBER_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_PROJECT_SUCCESS:
        Object.keys(action.project).forEach(key => {
          draft.data[key] = action.project[key]
        })
        draft.isUpdateModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.UPDATE_PROJECT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.SET_IS_ADD_MEMBER_MODAL_VISIBLE_SUCCESS:
        draft.isAddMemberModalVisible = action.isVisible
        break
      case CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_SUCCESS:
        draft.isUpdateModalVisible = action.isVisible
        break
    }
  })

export default selectedProjectReducer
