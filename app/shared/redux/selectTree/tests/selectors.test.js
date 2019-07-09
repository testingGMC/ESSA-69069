import makeSelectTrees from '../selectors'

describe('makeSelectTrees', () => {
  it('should return trees object', () => {
    const mockedState = {
      data: [],
    }
    const selected = makeSelectTrees().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})