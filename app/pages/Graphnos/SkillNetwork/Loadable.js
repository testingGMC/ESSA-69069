/**
 *
 * Asynchronously loads the component for SkillNetwork
 *
 */

import loadable from 'utils/loadable'

export default loadable(() => import('./index'))
