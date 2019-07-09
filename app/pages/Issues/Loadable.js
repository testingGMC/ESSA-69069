/**
 *
 * Asynchronously loads the component for Graphnos
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
