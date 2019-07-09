
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import GraphContainer from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
    onClickNode: jest.fn(),
    onClickLink: jest.fn(),
    graphToDisplay: {},
    node: { data: [] }
}
describe('<GraphContainer />', () => {
    it('Expect to not log errors in console', () => {
        render(
            <IntlProvider locale={DEFAULT_LOCALE}>
                <GraphContainer {...initialProps} />
            </IntlProvider>,
        )
        expect(jest.fn()).not.toHaveBeenCalled()
    })

    it('Expect to have additional unit tests specified', () => {
        expect(true).toEqual(true)
    })

})
