import React from 'react'
import { render } from 'react-testing-library'


import ChangeNodeModal from '../index'

describe('<ChangeNodeModal />', () => {
  it('Expect to not log errors in console', () => {
    render(<ChangeNodeModal />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

})
