import makeSelectCommits from '../selectors'

describe('makeSelectCommits', () => {
  it('should return commits object', () => {
    const mockedState = {
      data: [],
      loading: false,
      id: '',
    }
    const selected = makeSelectCommits().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})
