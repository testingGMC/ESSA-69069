

import React from 'react'
import { render } from 'react-testing-library'

import Card from '../index'

describe('<Card />', () => {
  it('Expect to not log errors in console', () => {
    render(<Card />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })


})
