


import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'

import CrdtEditor from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'
const initialProps = {
  crdtInformation: {},
  // replicatedPageManager: [],
  replicatedPageOperations: [],
  page: [],
  collaborators: [],
  setPageContent: {},
  pageId: '',
  visible: false,
  replicatedPageManager: { getOrCreatePageEditorManager: { pageId: '' } }
}
describe('<CrdtEditor />', () => {

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})


