import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the editor state domain
 */

const selectEditorDomain = state => state.editor || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Editor
 */

const makeSelectEditor = () =>
  createSelector(
    selectEditorDomain,
    substate => substate,
  )
const getLearningStyles = () =>
  createSelector(
    selectEditorDomain,
    substate => substate.data.learningStyles.map(lsId => substate.data[lsId]),
  )
const getAssessments = () =>
  createSelector(
    selectEditorDomain,
    substate => substate.data.assessments.map(assId => substate.data[assId]),
  )

const getKeywords = () =>
  createSelector(
    selectEditorDomain,
    substate =>
      substate.data.keywords.map(keywordId => substate.data[keywordId]),
  )
const getSelections = () =>
  createSelector(
    selectEditorDomain,
    substate =>
      substate.selections,
  )
const getData = () =>
  createSelector(
    selectEditorDomain,
    substate =>
      substate.data,
  )

const getChangeTracking = () =>
  createSelector(
    selectEditorDomain,
    substate =>
      substate.trackChanges,
  ) 
export default makeSelectEditor
export { selectEditorDomain, getLearningStyles, getAssessments, getKeywords, getData, getChangeTracking, getSelections }
