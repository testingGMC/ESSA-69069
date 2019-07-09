import { createSelector } from 'reselect'
import React from 'react'
import { FormattedDate, injectIntl } from 'react-intl'
import { initialState } from './reducer'

/**
 * Direct selector to the issues state domain
 */

const PostDate = injectIntl(({ date, intl }) => (
  <span title={intl.formatDate(date)}>
    <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
  </span>
))

const selectIssuesDomain = state => state.issues || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Issues
 */

const makeSelectIssues = () =>
  createSelector(
    selectIssuesDomain,
    substate => {
      if (!substate.data) {
        return substate
      }
      return {
        ...substate,
        data: substate.data.map((s, index) => ({
          ...s,
          key: index,
          creationDateTime: <PostDate date={s.creationDateTime} />,
        })),
      }
    },
  )

export default makeSelectIssues
export { selectIssuesDomain }
