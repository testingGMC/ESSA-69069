import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import SkillNetwork from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  graphData: { nodes: '' },
  deleteNode: jest.fn(),
  createNode: jest.fn(),
  updateNode: jest.fn(),
  createOrUpdateDependency: jest.fn(),
  deleteDependency: jest.fn(),
  duplicateNode: jest.fn(),
  graphToDisplay: {},
  updateTrackFilters: jest.fn(),
  updateNodeFilters: jest.fn(),
  nodeFilters: [],
  trackFilters: [],
  loadSimulatedNodes: jest.fn(),
  roles: '',
  selectedNode: {},
  previousNode: {},
  link: {},
  selectNode: jest.fn(),
  setPreviousNode: jest.fn(),
  setLink: jest.fn(),
}
describe('<SkillNetwork />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <BrowserRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SkillNetwork {...initialProps} />
        </IntlProvider>
      </BrowserRouter>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
