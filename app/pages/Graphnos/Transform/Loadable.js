/**
 *
 * Asynchronously loads the component for Transform
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
