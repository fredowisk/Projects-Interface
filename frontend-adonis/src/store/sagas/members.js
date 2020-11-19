import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, '/members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    // precisamos fazer um map, pois "roles" é um objeto cheio de informações
    // e queremos apenas o id
    yield call(api.put, `/members/${id}`, { roles: roles.map((role) => role.id) });

    yield put(toastrActions.add({
      type: 'success',
      title: 'Membro atualizado!',
      message: 'Membro atualizado com sucesso.',
    }));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro ao atualizar as roles!',
      message: 'Ocorreu um erro, tente novamente.',
    }));
  }
}

export function* inviteMember({ email }) {
  try {
    // criamos a opção de receber um array de emails, pois podemos mandar mais de um convide
    yield call(api.post, '/invites', { invites: [email] });

    yield put(toastrActions.add({
      type: 'success',
      title: 'Convite enviado!',
      message: 'Usuário convidado com sucesso.',
    }));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro ao enviar convite!',
      message: 'Ocorreu um erro, tente novamente.',
    }));
  }
}
