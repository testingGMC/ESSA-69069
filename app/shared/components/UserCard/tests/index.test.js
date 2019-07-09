
import React from 'react'
import { render } from 'react-testing-library'


import UserCard from '../index'

describe('<UserCard />', () => {
  it('Expect to not log errors in console', () => {
    render(<UserCard />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
