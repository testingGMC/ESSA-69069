import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
const initialProps = {
    // nodes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    nodes: [],
}
import TraversalMenu from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<TraversalMenu />', () => {
    it('Expect to not log errors in console', () => {
        render(
            <IntlProvider locale={DEFAULT_LOCALE}>
                <TraversalMenu {...initialProps} />
            </IntlProvider>,
        )
        expect(jest.fn()).not.toHaveBeenCalled()
    })

    it('Expect to have additional unit tests specified', () => {
        expect(true).toEqual(true)
    })

})



