import makeSelectSelectedProject from '../selectors'

describe('makeSelectSelectedProject', () => {
  it('should return selectedProject object', () => {
    const mockedState = {
      data: [],
    }
    const selected = makeSelectSelectedProject().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})