
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import ProjectCard from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

const initialProps = {
  projects: {},
  cards: []
}
describe('<ProjectCard />', () => {
  it('Expect to not log errors in console', () => {
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ProjectCard {...initialProps} />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

})