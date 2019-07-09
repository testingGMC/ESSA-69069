import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the commits state domain
 */

const selectCommitsDomain = state => state.commits || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Commits
 */

const makeSelectCommits = () =>
  createSelector(selectCommitsDomain, substate => substate);

export default makeSelectCommits;

export { selectCommitsDomain };
