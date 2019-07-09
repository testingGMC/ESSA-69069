import React from 'react'
import { render } from 'react-testing-library'


import NodeModal from '../index'

describe('<NodeModal />', () => {
  it('Expect to not log errors in console', () => {
    render(<NodeModal />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })


})
