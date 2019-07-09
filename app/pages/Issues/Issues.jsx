/**
 *
 * Issues
 *
 */

import React, { useEffect, useState } from 'react'
import { Table, Row, Col, PageHeader } from 'antd'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Helmet } from 'react-helmet'
import messages from './messages'
import TagFilter from './TagFilter'
import MarkAsModal from './MarkAsModal'
import useActions from './hooks/useActions'

import './issues.scss'
import AssignToProjectModal from './AssignToProjectModal'

const Issues = ({
  issues,
  fetchIssues,
  fetchProjects,
  projects,
  updateStatus,
  addWorkItem,
  intl,
}) => {
  const [statusValue, setStatusValue] = useState(-1)
  const [issuesData, setIssuesData] = useState(issues.data ? issues.data : [])
  const record = useActions()
  const [formRef, setFormRef] = useState(null)

  useEffect(() => {
    fetchIssues()
    fetchProjects()
  }, [])

  useEffect(() => {
    let issuesDataVar = []
    if (statusValue !== -1) {
      issuesDataVar = issues.data
        ? issues.data.filter(i => i.status === statusValue)
        : []
    } else {
      issuesDataVar = issues.data
    }

    setIssuesData(issuesDataVar)
  }, [issues, statusValue])
  const handleStatusValue = title => {
    if (title === statusValue) {
      setStatusValue(-1)
    } else {
      setStatusValue(title)
    }
  }
  const handleMarkAs = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()

      const issue = {
        status: values.status,
      }
      updateStatus(record.issueId, issue)
      handleMarkAsModalClose()
    })
  }
  const handleAssignToProject = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const workItem = {
        ...values,
        issueId: record.issueId,
        type: 1,
        state: 0,
      }
      addWorkItem(workItem)
      handleAssignToProjectModalClose()
    })
  }
  const handleMarkAsModalClose = () => {
    record.setIsMarkAsModalVisible(false)
  }
  const handleAssignToProjectModalClose = () => {
    record.setIsAssignToProjectModalVisible(false)
  }
  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }
  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }
  return (
    <div className="issues">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>
      <Row gutter={24} type="flex" className="row-title">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <PageHeader
            onBack={() => {
              window.history.back()
            }}
            title={<FormattedMessage {...messages.issues} />}
          />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className="issues-filter">
            <span className="filter-by">
              <FormattedMessage {...messages.filterBy} />:
            </span>
            <TagFilter
              handleStatusValue={handleStatusValue}
              statusValue={statusValue}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table
            loading={issues.loading}
            columns={record.columns}
            dataSource={issuesData}
            scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
      {record.isMarkAsModalVisible && (
        <MarkAsModal
          wrappedComponentRef={saveFormRef}
          isVisible={record.isMarkAsModalVisible}
          handleCancel={handleMarkAsModalClose}
          status={record.status}
          handleOk={handleMarkAs}
        />
      )}
      {record.isAssignToProjectModalVisible && (
        <AssignToProjectModal
          wrappedComponentRef={saveFormRef}
          isVisible={record.isAssignToProjectModalVisible}
          handleCancel={handleAssignToProjectModalClose}
          handleOk={handleAssignToProject}
          issueName={record.name}
          issueDescription={record.description}
          projects={projects.data ? projects.data : []}
        />
      )}
    </div>
  )
}

Issues.propTypes = {
  issues: PropTypes.object.isRequired,
  fetchIssues: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired,
  addWorkItem: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Issues)
