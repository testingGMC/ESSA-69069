// import produce from 'immer';
import liveShareReducer from '../reducer'
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('liveShareReducer', () => {
  let state
  beforeEach(() => {
    state = {
     connected: false, 
     connectionStatus: 0
    }
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(liveShareReducer(undefined, {})).toEqual(expectedResult)
  })

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
})
