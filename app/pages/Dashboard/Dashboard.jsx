/* eslint-disable global-require */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Icon, Skeleton } from 'antd'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Helmet } from 'react-helmet'
import { isEmpty } from 'lodash'
import { isContentArchitect } from 'shared/utils/access-token'
import messages from './messages'
import './dashboard.scss'
import ProjectCard from './ProjectCard/ProjectCard'
import ProjectModal from './ProjectModal'

const { Search } = Input

const Dashboard = ({
  projects,
  fetchProjects,
  addProject,
  deleteProject,
  roles,
  intl,
  setIsVisible,
  updateProject,
  setIsUpdateModalVisible
}) => {
  const { isVisible } = projects
  const [cards, setCards] = useState(projects.data ? projects.data : [])
  const [formRef, setFormRef] = useState(null)
  const handleModalClose = () => {
    setIsVisible(false)
  }

  const handleSearch = value => {
    setCards(
      projects.data.filter(e =>
        e.name.toLowerCase().includes(value.toLowerCase()),
      ),
    )
  }

  const handleDelete = id => {
    deleteProject(id)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.data) {
      setCards(projects.data)
    }
  }, [projects])

  const handleAddProject = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const newProject = {
        name: values.name,
        description: values.description,
        startDate: values.startDate,
        dueDate: values.dueDate,
      }
      addProject(newProject)
    })
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
    <div className="dashboard">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>

      <div className="dashboard-content">
        <Row>
          <Col>
            <Row gutter={48} align="bottom">
              <div className="project">
                <Col xs={24} sm={24} md={13} lg={14} xl={14} xxl={18}>

                  <div className="project-title">
                    <FormattedMessage {...messages.allproject} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={11} lg={10} xl={10} xxl={6}>
                  <div className="right-side">
                    <div className="button-add-project">
                      {!isEmpty(cards)
                        ? isContentArchitect(roles) && (
                          <div>
                            <Button
                              onClick={() => setIsVisible(true)}
                              className="plus-button"
                              type="primary"
                            >
                              Create Project
                            </Button>

                            {isVisible && (
                              <ProjectModal
                                wrappedComponentRef={saveFormRef}
                                isVisible={isVisible}
                                handleCancel={handleModalClose}
                                handleOk={handleAddProject}
                              />
                            )}
                          </div>
                        )
                        : ''}
                    </div>
                    <div className="search-bar">
                      <Search
                        placeholder={intl.formatMessage({
                          ...messages.search,
                        })}
                        onChange={e => handleSearch(e.target.value)}
                        style={{ width: 200 }}
                      />
                    </div>
                  </div>
                </Col>
              </div>
            </Row>
            <Row>
              <ProjectCard
                cards={cards}
                projects={projects}
                deleteProject={handleDelete}
                roles={roles}
                updateProject={updateProject}
                setIsUpdateModalVisible={setIsUpdateModalVisible}
              />
            </Row>
            {projects.loading ? (
              Array.from({ length: 6 }).map(() => (
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Skeleton loading={projects.loading} active avatar />
                </Col>
              ))
            ) : (
                !isEmpty(cards) ? ('') : (
                  isContentArchitect(roles) && (
                    <Row className="row-style">
                      <Col span={8} offset={8}>
                        <Button
                          type="dashed"
                          className="add-card-style"
                          size="large"
                          onClick={() => setIsVisible(true)}
                        >
                          <Icon
                            type="plus-circle"
                            theme="filled"
                            twoToneColor="#2a4bd8"
                            className="project-plus-icon"
                          />
                          <br />
                          <h3>
                            <FormattedMessage {...messages.createproject} />
                          </h3>
                        </Button>

                        {isVisible && (
                          <ProjectModal
                            wrappedComponentRef={saveFormRef}
                            isVisible={isVisible}
                            handleCancel={handleModalClose}
                            handleOk={handleAddProject}
                          />
                        )}
                      </Col>
                    </Row>
                  )
                )
              )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  setIsUpdateModalVisible: PropTypes.func.isRequired,
}

export default injectIntl(Dashboard)
