import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import AuthActions from '../ducks/auth';

export function* signIn({ email, password }) {
  try {
    // pegando a resposta da rota .post
    const response = yield call(api.post, '/sessions', { email, password });

    // salvando no local storage
    localStorage.setItem('@Omni:token', response.data.token);

    // disparando a action de success
    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique seu e-mail/senha!',
    }));
  }
}

export function* signOut() {
  localStorage.removeItem('@Omni:token');
  localStorage.removeItem('@Omni:team');

  yield put(push('/signin'));
}

export function* signUp({ name, email, password }) {
  try {
    // pegando a resposta da rota .post
    const response = yield call(api.post, '/users', { name, email, password });

    // salvando no local storage
    localStorage.setItem('@Omni:token', response.data.token);

    // disparando a action de success
    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no cadastro!',
      message: 'Verifique se os campos estão preenchidos.',
    }));
  }
}

export function* getPermissions() {
  const team = yield select((state) => state.teams.active);
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn || !team) return;

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
