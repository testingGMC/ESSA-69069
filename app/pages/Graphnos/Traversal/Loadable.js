/**
 *
 * Asynchronously loads the component for Simulate
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
