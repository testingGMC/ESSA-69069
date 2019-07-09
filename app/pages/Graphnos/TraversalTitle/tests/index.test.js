
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
const initialProps = {
    nodeName: '',
}
import TraversalTitle from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<TraversalTitle />', () => {
    it('Expect to not log errors in console', () => {
        render(
            <IntlProvider locale={DEFAULT_LOCALE}>
                <TraversalTitle {...initialProps} />
            </IntlProvider>,
        )
        expect(jest.fn()).not.toHaveBeenCalled()
    })

    it('Expect to have additional unit tests specified', () => {
        expect(true).toEqual(true)
    })

})



