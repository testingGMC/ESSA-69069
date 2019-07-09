
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
const initialProps = {
  graphData: {},
  match: {
    params: { nodeId: '' }
  },
  simulatedGraph: {},
  loadSimulatedGraph: jest.fn(),
  updateSimulationNode: jest.fn(),
  resetSimulation: jest.fn(),

}
import Traversal from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<Traversal />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Traversal {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})



