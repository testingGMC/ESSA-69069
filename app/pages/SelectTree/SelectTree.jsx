import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Tree,
  Card,
  Button,
  Row,
  Col,
  PageHeader,
  Empty,
  Popconfirm,
} from 'antd'
import { TYPES_TO_STRINGS, NOTIFICATION_TYPES, TYPES } from 'shared/constants'
import { pushNotification } from '../../shared/utils/notification'
import messages from './messages'
import NodeModal from './NodeModal'
import ChangeNodeModal from './ChangeNodeModal'
import NodeRootModal from './NodeRootModal'
import './select-tree.scss'

const { TreeNode } = Tree

const Leaf = ({ leaf, check, add, change, erase, type }) => (
  <div className={`leaf ${type}`}>
    {leaf}
    <span className={check ? 'showcase' : 'nocase'}>
      <Button
        size="small"
        icon="edit"
        shape="circle"
        className="leaf-button"
        onClick={change}
      />
      <Button
        size="small"
        icon="plus-circle"
        shape="circle"
        className="leaf-button"
        onClick={add}
      />
      <Popconfirm
        placement="topLeft"
        title={<FormattedMessage {...messages.confirmMessage} />}
        onConfirm={e => {
          e.stopPropagation(), erase()
        }}
        okText={<FormattedMessage {...messages.validate} />}
        cancelText={<FormattedMessage {...messages.cancel} />}
      >
        <Button
          size="small"
          icon="minus-circle"
          shape="circle"
          className="leaf-button"
          onClick={e => e.stopPropagation()}
        />
      </Popconfirm>
    </span>
  </div>
)
const SimpleLeaf = ({ leaf, type }) => (
  <div className={`simple-leaf ${type}`}>{leaf}</div>
)

const Footer = ({ add, publish, showcase }) => (
  <Row gutter={24}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <div className="divider">
        <div className="skillset">
          <img
            src={require('../../assets/icons/skill.png')}
            alt="skill"
            className="skillimage"
          />
          Skill
        </div>
        <div className="skillset">
          <img
            src={require('../../assets/icons/superskill.png')}
            alt="skill"
            className="skillimage"
          />
          Superskill
        </div>
        <div className="skillset">
          <img
            src={require('../../assets/icons/track.png')}
            alt="skill"
            className="skillimage"
          />
          Track
        </div>
        <Button type="primary" className="button" onClick={publish}>
          Publish
        </Button>
        <Button
          size="large"
          icon="plus-circle"
          shape="circle"
          className={`${showcase}`}
          onClick={add}
        />
      </div>
    </Col>
  </Row>
)

function SelectTree({ trees, fetchTrees, sendTree }) {
  const [expandedKeys] = useState([])
  const [gData, setGData] = useState([])
  const [checkedKeys, setKey] = useState([])
  const [checked, setCheck] = useState(false)
  const [theNodeType, setType] = useState(null)
  const [isVisible, setVisible] = useState(false)
  const [isChangeVisible, setChangeVisible] = useState(false)
  const [formRef, setFormRef] = useState(null)
  const [formReference, setFormReference] = useState(null)
  const [formRefr, setFormRefr] = useState(null)
  const [isAddVisible, setAddVisible] = useState(false)
  const [nodes, setNodes] = useState([])
  const [updatedNodeType, setUpdatedType] = useState(false)
  useEffect(() => {
    if (trees.data) {
      setGData(trees.data)
    }
  }, [trees])
  const onCheck = (checkedKey, e) => {
    const last = checkedKey.checked.slice(-1)[0]
    const lastEl = []
    lastEl.push(last)
    setKey(lastEl)
    setCheck(true)
    setType(
      e.checkedNodes.filter(el => el.key === last)[0].props.title.props.type,
    )
    checkNode(checkedKey)
  }
  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }
  const saveFormReference = formReferenceParameter => {
    setFormReference(formReferenceParameter)
  }
  const saveFormRefr = formRefrParameter => {
    setFormRefr(formRefrParameter)
  }
  const ModalClose = () => {
    const { form } = formRef.props
    form.resetFields()
    setVisible(false)
  }
  const ModalChangeClose = () => {
    const { form } = formReference.props
    form.resetFields()
    setChangeVisible(false)
  }
  const ModalAddClose = () => {
    const { form } = formRefr.props
    form.resetFields()
    setAddVisible(false)
  }
  const SuperSkillDisabled = type => {
    setUpdatedType(type)
  }
  const checkNode = key => {
    const loop = (data, key, callback) => {
      data.forEach(item => {
        if (item.children) {
          if (item.type === TYPES_TO_STRINGS[0]) {
            setUpdatedType(TYPES_TO_STRINGS[0])
          }
          if (item.children.map(el => el.type).includes(TYPES_TO_STRINGS[6])) {
            setUpdatedType(TYPES_TO_STRINGS[6])
          }
        }
        if (item.children) {
          return loop(item.children, key, callback)
        }
      })
    }
    const data = [...gData]
    loop(data, key, (item, index, arr) => {})
  }
  const changeNode = (key, title, description, type) => {
    let cNode
    const loop = (data, key, callback) => {
      const checkedNode = {
        title,
        name: title,
        key,
        type,
        description,
      }
      data.forEach(item => {
        if (item.children) {
          if (
            item.children.map(el => el.key).includes(checkedNode.key) &&
            item.type === 'skill'
          ) {
            SuperSkillDisabled(item.type)
          }
        }
        if (item.key === key) {
          cNode = item
          cNode.title = title
          cNode.description = description
          cNode.name = title
          cNode.type = type
          setNodes(nodes.map(node => (node.key === key ? cNode : node)))
        }
        if (item.children) {
          return loop(item.children, key, callback)
        }
      })
    }
    const data = [...gData]
    loop(data, key, (item, index, arr) => {})
    setGData(data)
    setChangeVisible(false)
  }

  const validateChange = key => {
    const { form } = formReference.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const { nodeTitle, nodeDescription, nodeType } = values
      changeNode(key, nodeTitle, nodeDescription, nodeType)
    })
  }
  const isUnique = (rootNode, name) =>
    name !== rootNode.name &&
    (!rootNode.children ||
      rootNode.children.reduce(
        (res, next) => isUnique(next, name) && res,
        true,
      ))

  const validate = key => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (!isUnique(gData[0], values.nodeTitle)) {
        pushNotification(
          NOTIFICATION_TYPES.error,
          <FormattedMessage {...messages.duplicatedTitleMessage} />,
          <FormattedMessage {...messages.duplicatedTitleDescription} />,
        )
      } else {
        form.resetFields()
        const { nodeTitle, nodeDescription, nodeType } = values
        nodeAdd(key, nodeTitle, nodeType, nodeDescription)
      }
    })
  }
  const validateAdd = () => {
    const { form } = formRefr.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const { nodeTitle, nodeDescription, nodeType } = values
      addRoot(nodeTitle, nodeType, nodeDescription)
    })
  }
  const addRoot = (nodeTitle, nodeType, nodeDescription) => {
    const newKey = Math.floor(Math.random() * 1000200002).toString()
    setNodes([
      ...nodes,
      {
        title: nodeTitle,
        name: nodeTitle,
        key: newKey,
        type: nodeType,
        description: nodeDescription,
      },
    ])
    setGData([
      ...gData,
      {
        title: nodeTitle,
        name: nodeTitle,
        key: newKey,
        type: nodeType,
        description: nodeDescription,
      },
    ])
    setAddVisible(false)
  }

  const nodeAdd = (key, nodeTitle, nodeType, nodeDescription) => {
    let aNode

    const loop = (data, checkKey, callback) => {
      data.forEach(item => {
        if (item.title !== nodeTitle && item.key === checkKey) {
          aNode = item
          const newKey = `${checkKey}-${Math.floor(Math.random() * 1000200002)}`
          setNodes([
            ...nodes,
            {
              title: nodeTitle,
              name: nodeTitle,
              key: newKey,
              type: nodeType,
              description: nodeDescription,
            },
          ])

          if (!aNode.children && aNode.title !== nodeTitle) {
            aNode.children = []
            aNode.children.push({
              title: nodeTitle,
              name: nodeTitle,
              key: newKey,
              type: nodeType,
              description: nodeDescription,
            })
            checkNode(checkKey)
            onCheck('')
          } else if (aNode.title !== nodeTitle) {
            aNode.children.push({
              title: nodeTitle,
              name: nodeTitle,
              key: newKey,
              type: nodeType,
              description: nodeDescription,
            })
          }
        }
        if (item.children && item.title !== nodeTitle) {
          return loop(item.children, checkKey, callback)
        }
      })
    }
    setVisible(false)
    const data = [...gData]
    loop(data, key, (item, index, arr) => {})
    setGData(data)
  }
  const nodeRemove = key => {
    const loop = (data, key, callback) => {
      data.forEach(item => {
        if (item.key === key) {
          data.splice(data.indexOf(item), 1)
        }
        if (item.children) {
          return loop(item.children, key, callback)
        }
      })
    }
    const data = [...gData]
    loop(data, key, (item, index, arr) => {})
    setGData(data)
  }
  const onDragEnter = info => {}
  const onDrop = info => {
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const dropPos = info.node.props.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr)
        }
        if (item.children) {
          return loop(item.children, key, callback)
        }
      })
    }
    const data = [...gData]

    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    setGData(data)
  }
  const loop = data =>
    data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            title={
              checkedKeys.indexOf(item.key) !== -1 ? (
                <Leaf
                  leaf={item.title}
                  erase={() => nodeRemove(checkedKeys[0])}
                  add={() => setVisible(true)}
                  change={() => setChangeVisible(true)}
                  check={checked}
                />
              ) : (
                <SimpleLeaf type={item.type} leaf={item.title} />
              )
            }
            key={item.key}
          >
            {loop(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={item.key}
          title={
            checkedKeys.indexOf(item.key) !== -1 ? (
              <Leaf
                type={item.type}
                leaf={item.title}
                erase={() => nodeRemove(checkedKeys[0])}
                add={() => setVisible(true)}
                change={() => setChangeVisible(true)}
                check={checked}
              />
            ) : (
              <SimpleLeaf type={item.type} leaf={item.title} />
            )
          }
        />
      )
    })

  const findNodeByKey = key => nodes.find(node => node.key === key)
  return (
    <Row gutter={24} type="flex" className="row-title">
      <Col span={20}>
        <PageHeader
          onBack={() => {
            window.history.back()
          }}
          title="Tree"
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={24} xl={24}>
        <div className="treehouse">
          <Card title="Folders" className="card">
            {gData.length === 0 ? (
              <Empty />
            ) : (
              <Tree
                className="draggable-tree"
                defaultExpandedKeys={expandedKeys}
                draggable
                blockNode
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                checkable
                checkStrictly
                onCheck={onCheck}
              >
                {loop(gData)}
              </Tree>
            )}

            {gData.length === 0 ? (
              <Footer
                showcase="footer-button"
                add={() => setAddVisible(true)}
                publish={() => sendTree(gData)}
              />
            ) : (
              <Footer
                showcase="no-show-button"
                add={() => setAddVisible(true)}
                publish={() => sendTree(gData)}
              />
            )}
          </Card>
          <NodeModal
            wrappedComponentRef={saveFormRef}
            isVisible={isVisible}
            handleCancel={ModalClose}
            handleOk={() => validate(checkedKeys[0])}
            disabled={theNodeType === TYPES_TO_STRINGS[0]}
          />
          <ChangeNodeModal
            wrappedComponentRef={saveFormReference}
            isVisible={isChangeVisible}
            handleCancel={ModalChangeClose}
            handleOk={() => validateChange(checkedKeys[0])}
            node={findNodeByKey(checkedKeys[0])}
            disabled={updatedNodeType === TYPES_TO_STRINGS[0]}
            superDisabled={updatedNodeType === TYPES_TO_STRINGS[6]}
          />
          <NodeRootModal
            wrappedComponentRef={saveFormRefr}
            isVisible={isAddVisible}
            handleCancel={ModalAddClose}
            handleOk={() => validateAdd(checkedKeys[0])}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SelectTree
