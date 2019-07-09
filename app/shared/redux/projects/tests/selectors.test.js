// import { selectProjectsDomain } from '../selectors';

// describe('selectProjectsDomain', () => {
//   it('Expect to have unit tests specified', () => {
//     expect(true).toEqual(true)
//   })
// })
import makeSelectProjects from '../selectors'

describe('makeSelectProjects', () => {
  it('should return sprints object', () => {
    makeSelectProjects
    const mockedState = {
      data: [],
      loading: false,
      selectedSprintId: '',
    }
    const selected = makeSelectProjects().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})
