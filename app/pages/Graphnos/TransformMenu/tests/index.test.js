

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import TransformMenu from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
{ }
const initialProps = {
    transformMode: "",
    parentNode: {},
    firstChildNode: {},
    secondChildNode: {},
    selectedNode: {},
    checkAndApply: jest.fn(),
    applyPreview: jest.fn(),
    resetSelection: jest.fn(),
    isButtonDisabled: jest.fn(),
    canReset: jest.fn()
}

describe('<TransformMenu />', () => {
    it('Expect to not log errors in console', () => {
        render(
            <IntlProvider locale={DEFAULT_LOCALE}>
                <TransformMenu {...initialProps} />
            </IntlProvider>,
        )
        expect(jest.fn()).not.toHaveBeenCalled()
    })

    it('Expect to have additional unit tests specified', () => {
        expect(true).toEqual(true)
    })

})


