import makeSelectSprints, { getSelectedSprintId } from '../selectors'

describe('makeSelectSprints', () => {
  it('should return sprints object', () => {
    const mockedState = {
      data: [],
      loading: false,
      selectedSprintId: '',
    }
    const selected = makeSelectSprints().resultFunc(mockedState)
    expect(selected).toEqual(mockedState)
  })
})
describe('getSelectedSprintId', () => {
  it('getSelectedSprintId should return string', () => {
    const mockedState = {
      data: [],
      loading: false,
      selectedSprintId: '2',
    }
    const selected = getSelectedSprintId().resultFunc(mockedState)
    expect(selected).toEqual('2')
  })
})
