/**
 *
 * StudentList
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectStudentList from '../../shared/redux/studentlist/selectors'
import reducer from '../../shared/redux/studentlist/reducer'

import * as actions from '../../shared/redux/studentlist/actions'

import saga from '../../shared/redux/studentlist/saga'

import StudentList from './StudentList'

const StudentListIndex = props => {
  useInjectReducer({ key: 'studentList', reducer })

  return <StudentList {...props} />
}

const mapStateToProps = createStructuredSelector({
  studentList: makeSelectStudentList(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'studentList', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(StudentListIndex)
