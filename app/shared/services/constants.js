const treeSelect = {
  post: 'krypton-graph/sector-from-tree',
}

const graphnos = {
  list: 'krypton-graph',
  pBro: 'krypton-graph/depth-to-breadth',
  reversePbro: 'krypton-graph/breadth-to-depth',
  magnify: 'krypton-graph/magnify',

  // this part will serve for skills and superskills
  postSkill: 'skills',
  getSkill: id => `skills/${id}`,
  updateSkill: id => `skills/${id}`,
  deleteSkill: id => `skills/${id}`,
  // ********************* //

  postTrack: 'tracks',
  getTrack: id => `tracks/${id}`,
  updateTrack: id => `tracks/${id}`,
  deleteTrack: id => `tracks/${id}`,

  postCheckpoint: 'checkpoints',
  getCheckpoint: id => `checkpoints/${id}`,
  updateCheckpoint: id => `checkpoints/${id}`,
  deleteCheckpoint: id => `checkpoints/${id}`,

  postReward: 'rewards',
  getReward: id => `rewards/${id}`,
  updateReward: id => `rewards/${id}`,
  deleteReward: id => `rewards/${id}`,

  postWorkshop: 'workshops',
  getWorkshops: id => `workshops/${id}`,
  updateWorkshop: id => `workshops/${id}`,
  deleteWorkshop: id => `workshops/${id}`,

  postSkillToCheckpoint: (skillId, checkpointId) =>
    `skill-to-checkpoint/${skillId}/${checkpointId}`,
  deleteSkillToCheckpoint: (skillId, checkpointId) =>
    `skill-to-checkpoint/${skillId}/${checkpointId}`,

  postSkillToReward: (skillId, rewardId) =>
    `skill-to-reward/${skillId}/${rewardId}`,
  deleteSkillToReward: (skillId, rewardId) =>
    `skill-to-reward/${skillId}/${rewardId}`,

  postSkillToSkill: (sourceId, targetId) =>
    `skill-to-skill/${sourceId}/${targetId}`,
  deleteSkillToSkill: (sourceId, targetId) =>
    `skill-to-skill/${sourceId}/${targetId}`,

  postSkillToWorkshop: (skillId, workshopId) =>
    `skill-to-workshop/${skillId}/${workshopId}`,
  deleteSkillToWorkshop: (skillId, workshopId) =>
    `skill-to-workshop/${skillId}/${workshopId}`,

  postTrackToSkill: (trackId, skillId) =>
    `track-to-skill/${trackId}/${skillId}`,
  deleteTrackToSkill: (trackId, skillId) =>
    `track-to-skill/${trackId}/${skillId}`,
}

const project = {
  list: 'projects',
  get: id => `projects/${id}`,
  getStats: id => `projectstats/project/${id}`,
  postMember: `project-members`,
  deleteMember: id => `project-members/${id}`,
  getMembersByProjectId: id => `project-members/project/${id}`,
  getMembersByNameOrEmail: filter => `project-members/users/${filter}`,
}

const sprint = {
  listByProject: id => `sprints/projects/${id}`,
  post: 'sprints',
  get: id => `sprints/${id}`,
  getWorkItems: 'workitems',
  getWorkItemById: id => `workitems/${id}`,
  postWorkItem: 'workitems',
  getWorkItemsBySprintId: id => `workitems/sprint/${id}`,
  updateWorkItemStateById: id => `workitems/state/${id}`,
}

const issue = {
  list: 'issues',
  get: id => `issues/${id}`,
}

const versionControl = {
  list: 'version-control/commits',
  latestCommits: 'version-control/latest-commits',
  revert: id => `version-control/commits/revert/${id}`,
  get: id => `version-control/commits/${id}`,
}

const liveShare = {
  pageOperations: (skillId, pageId) => `live-share/operations/${skillId}/${pageId}`,
  createOrLoadSkillInstance:  skillId => `live-share/instances/${skillId}`,
  closeOrUnloadSkillInstance:  skillId => `live-share/instances/${skillId}`,
  hub: token => `live-share?token=${token}`
}

const editor = {
  listTemplates: 'templates',
  postTemplate: 'templates',
  getTemplate: id => `templates/${id}`,
  updateTemplate: id => `templates/${id}`,
  deleteTemplate: id => `templates/${id}`,
}

export default {
  baseApiUrl: 'https://api.x.gomycode.co/v1/',
  project,
  sprint,
  issue,
  graphnos,
  treeSelect,
  versionControl,
  editor,
  liveShare
}
