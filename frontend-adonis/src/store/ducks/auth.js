import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  // action que vai ser chamada no request para verificar os dados
  signInRequest: ['email', 'password'],
  // se tudo der certo, ele vai retornar um token
  signInSuccess: ['token'],
  signOut: null,
  signUpRequest: ['name', 'email', 'password'],
  getPermissionsSuccess: ['roles', 'permissions'],
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  // se tiver token, true, senão false
  signedIn: !!localStorage.getItem('@Omni:token'),
  token: localStorage.getItem('@Omni:token') || null,
  roles: [],
  permissions: [],
});

export const success = (state, { token }) => state.merge({ signedIn: true, token });

export const logout = (state) => state.merge({ signedIn: false, token: null });

export const permissionsSuccess = (state, { roles, permissions }) => state.merge({ roles, permissions });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT]: logout,
  [Types.GET_PERMISSIONS_SUCCESS]: permissionsSuccess,
});
