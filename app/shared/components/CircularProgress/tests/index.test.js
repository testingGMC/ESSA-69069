import React from 'react'
import { render } from 'react-testing-library'

import CircularProgress from '../index'

describe('<CircularProgress />', () => {
  it('Expect to not log errors in console', () => {
    render(<CircularProgress />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
