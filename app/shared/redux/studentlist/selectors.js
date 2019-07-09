import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentList state domain
 */

const selectStudentListDomain = state => state.studentList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentList
 */

const makeSelectStudentList = () =>
  createSelector(selectStudentListDomain, substate => substate);

export default makeSelectStudentList;
export { selectStudentListDomain };
