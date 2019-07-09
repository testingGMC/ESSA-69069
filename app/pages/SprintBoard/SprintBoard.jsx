/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * SprintBoard
 *
 */

import React, { useState, useEffect } from 'react'
import { DragDropContext , Draggable,  Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Popconfirm,
  Menu,
  Badge,
  Row,
  Col,
  Select,
  PageHeader,
  Divider,
  Icon,
  Spin,
  Alert,
} from 'antd'
import QueueAnim from 'rc-queue-anim'
import {
  FormattedDate,
  injectIntl,
  FormattedMessage,
  intlShape,
} from 'react-intl'
import { Helmet } from 'react-helmet'
import { isEmpty } from 'lodash'
import {
  TODO_STATE,
  RESOLVED_STATE,
  ACTIVE_STATE,
  DONE_STATE,
  TASK_TYPE,
  BUG_TYPE,
  EMPTY_VALUE,
  YEAR_MONTH_DAY_DATE_FORMAT,
} from 'shared/constants'
import { isContentArchitect, getUserId } from 'shared/utils/access-token'

import routes from 'shared/routes'
import messages from './messages'
import WorkItem from './WorkItem'
import WorkItemModal from './WorkItemModal'
import SprintModal from './SprintModal'
import AddWorkItem from './AddWorkItem'

import './sprint-board.scss'

const PostDate = injectIntl(({ date, intl }) => (
  <span title={intl.formatDate(date)}>
    <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
  </span>
))

const SprintBoard = ({
  selectedSprintId,
  sprints,
  selectedProject,
  fetchSprintsFirstTime,
  updateWorkItemState,
  deleteWorkItem,
  fetchWorkItems,
  addWorkItem,
  updateWorkItem,
  addSprint,
  match: {
    params: { projectId },
  },
  intl,
  roles,
  errors,
  push,
  members,
  setIsAddWorkItemModalVisible,
  setIsUpdateWorkItemModalVisible,
  setIsAddSprintModalVisible,
}) => {
  const {
    isAddWorkItemModalVisible,
    isUpdateWorkItemModalVisible,
    isAddSprintModalVisible,
  } = sprints
  const [todoList, setTodoList] = useState([])
  const [activeList, setActiveList] = useState([])
  const [resolvedList, setResolvedList] = useState([])
  const [doneList, setDoneList] = useState([])
  // const [isAddWorkItemModalVisible, setIsAddWorkItemModalVisible] = useState(
  //   false,
  // )
  // const [
  //   isUpdateWorkItemModalVisible,
  //   setIsUpdateWorkItemModalVisible,
  // ] = useState(false)
  // const [isAddSprintModalVisible, setIsAddSprintModalVisible] = useState(false)
  const [isMenuOpenProps, setIsMenuOpenProps] = useState(false)

  const [selectedWorkItem, setSelectedWorkItem] = useState({})

  const [formRef, setFormRef] = useState(null)
  const [selectedSprint, setSelectedSprint] = useState({})
  const COLUMNS = [
    { id: TODO_STATE.toString(), 
      title: <FormattedMessage {...messages.todo} />, list: todoList },
    {
      id: ACTIVE_STATE.toString(),
      title: <FormattedMessage {...messages.active} />,
      list: activeList,
    },
    {
      id: RESOLVED_STATE.toString(),
      title: <FormattedMessage {...messages.resolved} />,
      list: resolvedList,
    },
    { id: DONE_STATE.toString(), title: <FormattedMessage {...messages.done} />, list: doneList },
  ]

  useEffect(() => {
    fetchSprintsFirstTime(projectId)
  }, [])

  useEffect(() => {
    if (
      !isEmpty(members) &&
      !members.find(member => member.memberId.toString() === getUserId().toString())
    ) {
      push(routes.PROJECT_DETAILS.linkPath(projectId))
    }
  }, [members])

  const onDragEnd = (end) => {
    if(end.source === undefined || end.destination === undefined || end.source === null || end.destination === null || end.source.droppableId === undefined || end.destination.droppableId === undefined || end.source.droppableId === null || end.destination.droppableId === null)
      return
 
    const workItems = COLUMNS[end.source.droppableId].list.filter(x => x.id === end.draggableId)
    if (workItems.length > 0) {
      if(workItems[0].type.toString() === TASK_TYPE.toString() && end.destination.droppableId.toString() !== RESOLVED_STATE.toString())
        onUpdateWorkItemState(end.destination.droppableId, end.draggableId)
      if(workItems[0].type.toString() === BUG_TYPE.toString() && end.destination.droppableId.toString() !== DONE_STATE.toString())
        onUpdateWorkItemState(end.destination.droppableId, end.draggableId)
    }
  };
  useEffect(() => {
    setTodoList([])
    setActiveList([])
    setResolvedList([])
    setDoneList([])
    setSelectedSprint('')
    if (!isEmpty(selectedSprintId) && selectedSprintId !== undefined) {
      const pos = sprints.data.findIndex(s => s.id === selectedSprintId)

      if (sprints.data[pos].workItems) {
        setTodoList(
          sprints.data[pos].workItems.filter(w => w.state === TODO_STATE),
        )
        setActiveList(
          sprints.data[pos].workItems.filter(w => w.state === ACTIVE_STATE),
        )
        setResolvedList(
          sprints.data[pos].workItems.filter(w => w.state === RESOLVED_STATE),
        )
        setDoneList(
          sprints.data[pos].workItems.filter(w => w.state === DONE_STATE),
        )
      }
      setSelectedSprint(sprints.data[pos])
    }
  }, [sprints])
  const onUpdateWorkItemState = (state, workItemId) => {
    updateWorkItemState(selectedSprintId, workItemId, { state: Number(state) })
  }

  const myMenu = (workItemId, workItem) => (
    <Menu>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessage} />}
          onConfirm={() => {
            deleteWorkItem(selectedSprintId, workItemId)
            setIsAddWorkItemModalVisible(false)
          }}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          <a href="#">{<FormattedMessage {...messages.delete} />}</a>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item>
        <a
          href="#"
          onClick={() => {
            setSelectedWorkItem(workItem)
            setIsUpdateWorkItemModalVisible(true)
            setIsAddWorkItemModalVisible(false)
          }}
        >
          {<FormattedMessage {...messages.update} />}
        </a>
      </Menu.Item>
    </Menu>
  )
  const handleAddWorkItem = (name, type) => {
    const workItem = {
      name,
      type: Number(type),
      state: 0,
      sprintId: selectedSprintId,
      projectId,
    }
    addWorkItem(workItem)
    // setIsAddWorkItemModalVisible(false)
  }
  const handleUpdateWorkItem = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      // form.resetFields()
      let { state } = selectedWorkItem
      if (
        values.type === BUG_TYPE.toString() &&
        selectedWorkItem.state === DONE_STATE
      ) {
        state = RESOLVED_STATE
      } else if (
        values.type === TASK_TYPE.toString() &&
        selectedWorkItem.state === RESOLVED_STATE
      ) {
        state = DONE_STATE
      }
      const workItem = {
        ...selectedWorkItem,
        ...values,
        type: Number(values.type),
        projectId,
      }
      updateWorkItem(selectedSprintId, selectedWorkItem.id, workItem)
      if (state !== selectedWorkItem.state) {
        updateWorkItemState(selectedSprintId, selectedWorkItem.id, {
          state,
        })
      }
      // handleUpdateWorkItemModalClose()
    })
  }
  const handleUpdateWorkItemModalClose = () => {
    setIsUpdateWorkItemModalVisible(false)
  }

  const handleAddSprint = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const Sprint = {
        startDate: values.startDate,
        dueDate: values.dueDate,
        projectId,
      }
      addSprint(Sprint)
    })
  }
  // useEffect(() => {
  //   if (isEmpty(errors) && isAddSprintModalVisible) {
  //     const { form } = formRef.props
  //     form.resetFields()
  //     handleAddSprintModalClose()
  //   }
  // }, [errors])

  const handleAddSprintModalClose = () => {
    setIsAddSprintModalVisible(false)
  }

  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }

  const renderMemberFullName = memberId => {
    if (selectedProject.data.members) {
      const filteredMember = selectedProject.data.members.find(
        member => member.memberId.toString() === memberId.toString(),
      )
      if (filteredMember) {
        return filteredMember.fullName
      }
      return EMPTY_VALUE
    }
    return EMPTY_VALUE
  }

  const canDragWorkItem = () => {
    const { startDate } = selectedSprint
    const now = moment().format(YEAR_MONTH_DAY_DATE_FORMAT)
    if (now >= moment(startDate).format(YEAR_MONTH_DAY_DATE_FORMAT)) {
      return true
    }
    return false
  }

  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }
  const renderSprintPeriod = (startDate, dueDate) => {
    const period = Number(moment(dueDate).diff(startDate, 'days'))
    return `${period + 1} `
  }
  return (
    <div className="sprint-board">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>

      <Row gutter={24} type="flex" className="row-title">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          {selectedProject.data && !sprints.loading && (
            <PageHeader
              onBack={() => {
                window.history.back()
              }}
              title={`${selectedProject.data.name}`}
            />
          )}
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className="sprint-filter global-flex-horizontal-end">
            {sprints.data && !sprints.loading && (
              <Select
                style={{ width: 150 }}
                size="small"
                showSearch
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                placeholder={<FormattedMessage {...messages.chooseSprint} />}
                value={selectedSprintId || undefined}
                onChange={value => {
                  fetchWorkItems(value)
                  setIsAddWorkItemModalVisible(false)
                }}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    {isContentArchitect(roles) && (
                      <>
                        <Divider style={{ margin: '4px 0' }} />

                        <div
                          onMouseDown={() => {
                            setIsAddSprintModalVisible(true)
                            setIsAddWorkItemModalVisible(false)
                          }}
                          className="sprint-item"
                        >
                          <Icon type="plus" />{' '}
                          <FormattedMessage {...messages.createSprint} />
                        </div>
                      </>
                    )}
                  </div>
                )}
              >
                {sprints.data.map(s => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            )}
            {selectedSprint.startDate && selectedSprint.dueDate && (
              <>
                <Divider type="vertical" className="vertical-divider" />

                <div className="sprint-dates">
                  <PostDate date={selectedSprint.startDate} /> -&nbsp;
                  <PostDate date={selectedSprint.dueDate} />
                  <div className="subtitle">
                    {renderSprintPeriod(
                      selectedSprint.startDate,
                      selectedSprint.dueDate,
                    )}
                    <FormattedMessage {...messages.workDays} />
                  </div>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Spin spinning={sprints.loading}>
        <div className="content">
          <Row gutter={24}>
            {sprints.data && !isEmpty(sprints.data) ? (
              <DragDropContext
                // onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              >
                {COLUMNS.map(column => (
                  <Col xs={24} sm={12} md={6} lg={6} xl={6} key={column.id}>
                    <div className="title">
                      <span>{column.title} </span>
                      <Badge
                        count={column.list.length}
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#f9efc8',
                          color: '#ffcf20',
                          fontWeight: 'bold',
                          width: '31px',
                        }}
                      />
                    </div>
                    <Droppable
                      droppableId={column.id}
                      onUpdateWorkItemState={onUpdateWorkItemState}
                      isDragDisabled={false}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={{ backgroundColor: snapshot.isDraggingOver ? '#f2f2f2' : '#fafafa' }}
                          {...provided.droppableProps}
                        >
                          <QueueAnim component="WorkItem" type={['right', 'left']} leaveReverse>

                            {column.list.map((workItem, index) => (
                              <Draggable
                                draggableId={workItem.id}
                                key={workItem.id}
                                type={workItem.type}
                                isDragDisabled={!canDragWorkItem()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <WorkItem
                                      name={workItem.name}
                                      completionDate={
                                        workItem.completionDate && (
                                          <PostDate date={workItem.completionDate} />
                                        )
                                      }
                                      type={workItem.type}
                                      fullName={renderMemberFullName(workItem.assignedTo)}
                                      workItem={workItem}
                                      menu={myMenu(workItem.id, workItem)}
                                      isMenuOpen={isMenuOpenProps}
                                      setIsMenuOpen={setIsMenuOpenProps}
                                      setIsUpdateWorkItemModalVisible={
                                        setIsUpdateWorkItemModalVisible
                                      }
                                      isUpdateWorkItemModalVisible={
                                        isUpdateWorkItemModalVisible
                                      }
                                      setSelectedWorkItem={setSelectedWorkItem}
                                      setIsAddWorkItemModalVisible={
                                        setIsAddWorkItemModalVisible
                                      }
                                    />
                                  </div>
                                )} 
                              </Draggable>
                            ))}
                          </QueueAnim>
                          <div className="drag-region">

                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    {column.id === TODO_STATE.toString() && selectedSprintId && (
                      <>
                        {isAddWorkItemModalVisible && (
                          <AddWorkItem
                            addWorkItem={handleAddWorkItem}
                            onCancel={() => setIsAddWorkItemModalVisible(false)}
                          />
                        )}
                        {!isAddWorkItemModalVisible && (
                          <div
                            className="plus"
                            onClick={() => setIsAddWorkItemModalVisible(true)}
                          >
                            +
                          </div>
                        )}
                      </>
                    )}
            
                  </Col>
                ))
                }</DragDropContext>) : (
              <Alert
                message={<FormattedMessage {...messages.noSprintsTitle} />}
                description={
                  <FormattedMessage {...messages.noSprintsContent} />
                }
                type="info"
              />
            )}
         
          </Row>
    
        </div>
      </Spin>
      {isUpdateWorkItemModalVisible && (
        <WorkItemModal
          wrappedComponentRef={saveFormRef}
          isVisible={isUpdateWorkItemModalVisible}
          handleCancel={handleUpdateWorkItemModalClose}
          handleOk={handleUpdateWorkItem}
          name={selectedWorkItem.name}
          description={selectedWorkItem.description}
          type={selectedWorkItem.type}
          assignTo={selectedWorkItem.assignTo}
          sprints={sprints.data}
          sprintId={selectedSprintId}
          members={selectedProject.data.members}
          memberId={selectedWorkItem.assignedTo}
        />
      )}

      {isAddSprintModalVisible && (
        <SprintModal
          wrappedComponentRef={saveFormRef}
          isVisible={isAddSprintModalVisible}
          handleCancel={handleAddSprintModalClose}
          handleOk={handleAddSprint}
          project={selectedProject.data}
        />
      )}
    </div>
  )
}

SprintBoard.propTypes = {
  sprints: PropTypes.object.isRequired,

  selectedSprintId: PropTypes.string.isRequired,
  selectedProject: PropTypes.object.isRequired,
  fetchSprintsFirstTime: PropTypes.func.isRequired,
  updateWorkItemState: PropTypes.func.isRequired,
  deleteWorkItem: PropTypes.func.isRequired,
  fetchWorkItems: PropTypes.func.isRequired,
  addWorkItem: PropTypes.func.isRequired,
  updateWorkItem: PropTypes.func.isRequired,
  addSprint: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  roles: PropTypes.array.isRequired,
  errors: PropTypes.array,
  push: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
}

export default injectIntl(SprintBoard)
