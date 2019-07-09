/**
 *
 * Asynchronously loads the component for NodeCreation
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
