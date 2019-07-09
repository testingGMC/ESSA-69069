/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import ColorHash from 'color-hash'
import routes from 'shared/routes'
import ProjectModal from '../ProjectModal'
import './x-card.scss'
import { Card, Avatar, Col, Empty, Skeleton, Menu, Dropdown, Icon, Popconfirm, Pagination } from 'antd'
import { FormattedMessage } from 'react-intl'
import { isContentArchitect } from 'shared/utils/access-token'
import { orderByCreatedAt } from 'shared/utils/group-by'
import QueueAnim from 'rc-queue-anim'
import messages from './messages'
import { fetchMembersByProjectId } from 'shared/services/project.service';
const { Meta } = Card

const ProjectCard = ({ cards, projects, deleteProject, roles, updateProject, setIsUpdateModalVisible }) => {

  const { isUpdateModalVisible } = projects
  const [formRef, setFormRef] = useState(null)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(9)
  const colorHash = new ColorHash()

  const [selectedProject, setSelectedProject] = useState({})

  const selectProject = (id) => {
    const x = projects.data.find(project => project.id === id)
    setSelectedProject(x)
    setIsUpdateModalVisible(true)
  }

  const handleChange = value => {
    value <= 1
      ? (setMinValue(0), setMaxValue(9))
      : setMinValue((value - 1) * 9),
      setMaxValue(value * 9)
  }
  const handleUpdateProject = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const project = {
        name: values.name,
        description: values.description,
        startDate: selectedProject.startDate,
        dueDate: values.dueDate,
      }
      updateProject(selectedProject.id, project)
    })
  }
  const handleUpdateProjectModalClose = () => {
    setIsUpdateModalVisible(false)
  }
  const size = useWindowSize()
  function useWindowSize() {
    const isClient = typeof window === 'object'

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
      }
    }
    const [windowSize, setWindowSize] = useState(getSize)
    useEffect(() => {
      if (!isClient) {
        return false
      }
      function handleResize() {
        setWindowSize(getSize())
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
  }
  const menu = id => (
    <Menu>
      <Menu.Item>
        <div onClick={() => selectProject(id)}        >
          Update
        </div>
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessage} />}
          onConfirm={() => deleteProject(id)}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )
  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }
  return (
    <div>
      {projects.loading ? (
        Array.from({ length: 6 }).map(() => (
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Skeleton loading={projects.loading} active avatar />
          </Col>
        ))
      ) : (
          <div className="x-card">
            {isEmpty(cards) ? (
              <div className="no-members">
                <Empty />
              </div>
            ) : (
                <QueueAnim delay={300} type={['right', 'left']} leaveReverse>
                  {orderByCreatedAt(cards)
                    .slice(minValue, maxValue)
                    .map((el, i) => (
                      <Col xs={24} sm={24} md={8} lg={8} xl={8} key={i}>
                        <div className="project-card">
                          <Link to={`${routes.PROJECT_DETAILS.linkPath(el.id)}`}>
                            <Card className="card-style" key={i}>

                              <div className="card-container">
                                <Fragment>
                                  <Meta
                                    className="card-body-container"
                                    id={el.id}
                                    avatar={
                                      <Avatar
                                        shape="square"
                                        size="large"
                                        style={{
                                          backgroundColor: `${colorHash.hex(el.name)}`,
                                        }}
                                      />
                                    }
                                    title={
                                      <span className="card-title">{el.name}</span>
                                    }
                                    description={
                                      <div className="card-description">
                                        {el.description}
                                      </div>
                                    }
                                  />
                                </Fragment>
                                {isContentArchitect(roles) && (
                                  <div onClick={e => e.stopPropagation()}>
                                    <Dropdown
                                      overlay={menu(el.id)}
                                      placement="bottomRight"
                                      trigger={['click']}
                                    >
                                      <div>
                                        <Icon type="more" style={{ fontSize: '25px' }} />
                                      </div>
                                    </Dropdown>
                                  </div>
                                )}
                              </div>

                            </Card>
                          </Link>
                        </div>

                      </Col>
                    ))}
                </QueueAnim>
              )}

            {!isEmpty(cards) ?
              (
                (size.width <= 767) ?
                  (
                    <Col span={10} offset={10}>
                      <Pagination
                        simple
                        defaultCurrent={1}
                        defaultPageSize={9}
                        onChange={handleChange}
                        total={cards.length}
                      />
                    </Col>
                  ) : <Col span={10} offset={10}>
                    <Pagination
                      defaultCurrent={1}
                      defaultPageSize={9}
                      onChange={handleChange}
                      total={cards.length}
                      size="small"
                    />
                  </Col>
              ) : ('')}
          </div>
        )}
      {isUpdateModalVisible && (
        <ProjectModal
          wrappedComponentRef={saveFormRef}
          project={selectedProject}
          isVisible={isUpdateModalVisible}
          handleCancel={handleUpdateProjectModalClose}
          handleOk={handleUpdateProject}
        />
      )}
    </div>
  )
}

ProjectCard.propTypes = {
  cards: PropTypes.array,
  updateProject: PropTypes.func.isRequired,
  setIsUpdateModalVisible: PropTypes.func.isRequired,
  deleteProject: PropTypes.func,
  roles: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired,
}

export default memo(ProjectCard)
