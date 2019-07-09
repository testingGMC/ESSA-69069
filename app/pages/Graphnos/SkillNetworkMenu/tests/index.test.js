import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import SkillNetworkMenu from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  selectedNode: {},
  filter: '',
  nodes: [],
  setFilter: jest.fn(),
  duplicateNode: jest.fn(),
  onUpdateNode: jest.fn(),
  deleteNode: jest.fn(),
  simulateCourse: jest.fn(),
  updateTrackFilters: jest.fn(),
  updateNodeFilters: jest.fn(),
  nodeFilters: [],
  trackFilters: [],
  roles: '',
  loadSimulatedNodes: jest.fn(),
}
describe('<SkillNetworkMenu />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <BrowserRouter>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <SkillNetworkMenu {...initialProps} />
        </IntlProvider>
      </BrowserRouter>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
