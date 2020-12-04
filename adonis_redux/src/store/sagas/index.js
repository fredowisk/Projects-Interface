import {all, fork, takeLatest} from 'redux-saga/effects';

import {signIn, signOut, signUp, getPermissions, init} from './auth';

import {AuthTypes} from '../ducks/auth';

import {getTeams, createTeam, setActiveTeam} from './teams';

import {TeamsTypes} from '../ducks/teams';

import {getProjects, createProject} from './projects';

import {ProjectsTypes} from '../ducks/projects';

import {getMembers, updateMember, inviteMember} from './members';

import {MembersTypes} from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    init(),
    // o fork executa instantaneamente toda vez que o saga é inicializado

    takeLatest(AuthTypes.INIT_CHECK_SUCCESS, getPermissions),

    // pegando a ultima action enviada

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),

    takeLatest(AuthTypes.SIGN_OUT, signOut),

    // // toda vez que eu receber uma request de teams, dispare a função getTeams

    takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),

    takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),

    takeLatest(TeamsTypes.SELECT_TEAM, setActiveTeam),

    takeLatest(TeamsTypes.SELECT_TEAM, getProjects),

    takeLatest(TeamsTypes.SELECT_TEAM, getPermissions),

    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),

    takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),

    takeLatest(TeamsTypes.SELECT_TEAM, getMembers),
    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),

    takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),

    takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
  ]);
}
