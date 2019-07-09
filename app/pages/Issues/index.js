/**
 *
 * Issues
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'

import makeSelectIssues from 'shared/redux/issues/selectors'
import reducer from 'shared/redux/issues/reducer'
import * as actions from 'shared/redux/issues/actions'
import saga from 'shared/redux/issues/saga'

import makeSelectSkills from 'shared/redux/skills/selectors'
import skillsReducer from 'shared/redux/skills/reducer'
import * as skillsActions from 'shared/redux/skills/actions'
import skillsSaga from 'shared/redux/skills/saga'

import makeSelectSprints from 'shared/redux/sprints/selectors'
import sprintsReducer from 'shared/redux/sprints/reducer'
import { addWorkItem } from 'shared/redux/sprints/actions'
import sprintsSaga from 'shared/redux/sprints/saga'

import makeSelectProjects from 'shared/redux/projects/selectors'
import projectsReducer from 'shared/redux/projects/reducer'
import { fetchProjects } from 'shared/redux/projects/actions'
import projectsSaga from 'shared/redux/projects/saga'

import Issues from './Issues'

const IssuesIndex = props => {
  useInjectReducer({ key: 'issues', reducer })
  useInjectReducer({ key: 'skills', reducer: skillsReducer })
  useInjectReducer({ key: 'sprints', reducer: sprintsReducer })
  useInjectReducer({ key: 'projects', reducer: projectsReducer })

  return <Issues {...props} />
}

const mapStateToProps = createStructuredSelector({
  issues: makeSelectIssues(),
  skills: makeSelectSkills(),
  sprints: makeSelectSprints(),
  projects: makeSelectProjects(),
})

const mapDispatchToProps = {
  ...actions,
  ...skillsActions,
  addWorkItem,
  fetchProjects,
}

const withSaga = injectSaga({ key: 'issues', saga, mode: DAEMON })
const withSkillsSaga = injectSaga({
  key: 'skills',
  saga: skillsSaga,
  mode: DAEMON,
})
const withSprintsSaga = injectSaga({
  key: 'sprints',
  saga: sprintsSaga,
  mode: DAEMON,
})

const withProjectsSaga = injectSaga({
  key: 'projects',
  saga: projectsSaga,
  mode: DAEMON,
})
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
  withSkillsSaga,
  withSprintsSaga,
  withProjectsSaga,
)(IssuesIndex)
