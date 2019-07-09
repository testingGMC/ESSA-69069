import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import TestCase from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

const initialProps = {
  el: '',
  assessment: {},
  updateCodeCompilingUpdateUseCase: jest.fn(),
  updateCodeCompilingDeleteUseCase: jest.fn(),
  skill: { data: { hello: { input: 5, output: 8 } } },
  intl: 0,
}

describe('<TestCase />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestCase {...initialProps} />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })
  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestCase {...initialProps} />
      </IntlProvider>,
    )
    expect(firstChild).toMatchSnapshot()
  })
})
