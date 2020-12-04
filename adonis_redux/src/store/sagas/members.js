import {call, put} from 'redux-saga/effects';
import api from '~/services/api';
import {ToastActionsCreators} from 'react-native-redux-toast';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, '/members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({id, roles}) {
  try {
    // precisamos fazer um map, pois "roles" é um objeto cheio de informações
    // e queremos apenas o id
    yield call(api.put, `/members/${id}`, {
      roles: roles.map((role) => role.id),
    });

    yield put(ToastActionsCreators.displayInfo('Membro atualizado!'));
  } catch (err) {
    yield put(
      ToastActionsCreators.displayError(
        'Erro ao atualizar membro! Tente novamente.',
      ),
    );
  }
}

export function* inviteMember({email}) {
  try {
    // criamos a opção de receber um array de emails, pois podemos mandar mais de um convide
    yield call(api.post, '/invites', {invites: [email]});

    yield put(ToastActionsCreators.displayInfo('Convite realizado!'));
  } catch (err) {
    yield put(
      ToastActionsCreators.displayError(
        'Erro ao enviar convite! Tente novamente.',
      ),
    );
  }
}
