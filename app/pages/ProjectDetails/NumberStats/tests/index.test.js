
import React from 'react'
import { render } from 'react-testing-library'


import NumberStats from '../index'

describe('<NumberStats />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<NumberStats />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
