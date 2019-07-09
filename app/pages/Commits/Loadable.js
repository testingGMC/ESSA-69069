/**
 *
 * Asynchronously loads the component for Commits
 *
 */

import loadable from 'utils/loadable'
export default loadable(() => import('./index'))
