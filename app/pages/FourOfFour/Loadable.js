/**
 *
 * Asynchronously loads the component for FourOfFour
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
