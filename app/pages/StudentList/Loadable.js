/**
 *
 * Asynchronously loads the component for StudentList
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
