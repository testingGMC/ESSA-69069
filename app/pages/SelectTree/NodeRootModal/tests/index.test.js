

import React from 'react'
import { render } from 'react-testing-library'


import NodeRootModal from '../index'

describe('<NodeRootModal />', () => {
  it('Expect to not log errors in console', () => {
    render(<NodeRootModal />)
    expect(jest.fn()).not.toHaveBeenCalled()
  })

})
