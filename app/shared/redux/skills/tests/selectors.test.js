import makeSelectSkills, { getSelectedSprintId } from '../selectors'

describe('makeSelectSkills', () => {
  it('should return sprints object', () => {
    const mockedState = {
      data: [],
    }
    const selected = makeSelectSkills().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})