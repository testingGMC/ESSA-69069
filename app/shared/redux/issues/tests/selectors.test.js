import makeSelectIssues from '../selectors'

describe('makeSelectIssues', () => {
  it('should return sprints object', () => {
    const mockedState = {
      data: [],
    }
    const selected = makeSelectIssues().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})