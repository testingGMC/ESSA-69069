import ProjectDetails from 'pages/ProjectDetails/Loadable'
import Graphnos from 'pages/Graphnos/Loadable'
import Issues from 'pages/Issues/Loadable'
import SelectTree from 'pages/SelectTree/Loadable'
import Dashboard from 'pages/Dashboard/Loadable'
import SprintBoard from 'pages/SprintBoard/Loadable'
import Editor from 'pages/Editor/Loadable'
import Commits from 'pages/Commits/Loadable'
import FourOFour from 'pages/FourOfFour'
import StudentList from 'pages/StudentList'
export default {
  ROOT: {
    path: '/',
  },
  STUDENTLIST: {
    path: '/student-list',
    component: StudentList
  },
  DASHBOARD: {
    path: '/dashboard',
    component: Dashboard,
  },
  PROJECT_DETAILS: {
    path: '/project-details/:projectId',
    linkPath: id => `/project-details/${id}`,
    component: ProjectDetails,
  },
  GRAPHNOS: {
    path: '/graphnos/',
    linkPath: page => `/graphnos/${page}`,
    component: Graphnos,
    children: {
      skillNetwork: 'skill-network',
      transform: 'transform',
      traversal: (id = ':nodeId') => `traversal/${id}`,
    },
  },
  ISSUES: {
    path: '/issues/',
    component: Issues,
  },
  TREE: {
    path: '/tree/',
    component: SelectTree,
  },
  SPRINT_BOARD: {
    path: '/sprint-board/:projectId',
    linkPath: id => `/sprint-board/${id}`,
    component: SprintBoard,
  },
  EDITOR: {
    path: '/editor/:skillId',
    linkPath: id => `/editor/${id}`,
    component: Editor,
  },
  COMMITS: {
    path: '/commits',
    component: Commits,
  },
  FOUR_O_FOUR: {
    path: '/404',
    component: FourOFour,
  },
}
