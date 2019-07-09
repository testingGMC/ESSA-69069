/**
 *
 * AddWorkItem
 *
 */

import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Switch, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './add-work-item.scss'
import { TASK_TYPE } from '../../../shared/constants'
import { isEmpty } from 'lodash'
function AddWorkItem({ addWorkItem, onCancel }) {
  const [type, setType] = useState(0)
  const [name, setName] = useState('')
  const onAddWorkItem = e => {
    const keycode = e.keyCode ? e.keyCode : e.which
    if (keycode === 13) {
      name === '' ? '' : addWorkItem(name, type)
    }
  }
  return (
    <div className={`add-work-item ${type ? 'bug' : 'task'}`}>
      <Input
        onChange={e => setName(e.target.value)}
        onKeyPress={onAddWorkItem}
        className="input-name"
      />
      <div className="global-flex-horizontal-between">
        <Switch
          checkedChildren={<FormattedMessage {...messages.task} />}
          unCheckedChildren={<FormattedMessage {...messages.bug} />}
          checked={type === TASK_TYPE}
          onChange={checked => setType(Number(!checked))}
        />
        <div className="global-flex-horizontal-end">
          <Button type="link" onClick={onCancel}>
            <FormattedMessage {...messages.cancel} />
          </Button>
          <Button
            type="link"
            onClick={() => addWorkItem(name, type)}
            disabled={isEmpty(name)}
          >
            <FormattedMessage {...messages.add} />
          </Button>
        </div>
      </div>
    </div>
  )
}

AddWorkItem.propTypes = {
  addWorkItem: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default memo(AddWorkItem)
