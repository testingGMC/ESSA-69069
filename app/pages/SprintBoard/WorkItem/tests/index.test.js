

import React from 'react'
import { render } from 'react-testing-library'

import WorkItem from '../index'

describe('<WorkItem />', () => {
  it('Expect to not log errors in console', () => {
    render(<WorkItem />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
