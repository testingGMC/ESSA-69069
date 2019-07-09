/**
 *
 * Asynchronously loads the component for GraphContainer
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
