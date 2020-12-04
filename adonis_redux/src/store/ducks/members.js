import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  openMembersModal: null,
  closeMembersModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false,
});

export const openModal = (state) => state.merge({membersModalOpen: true});
export const closeModal = (state) => state.merge({membersModalOpen: false});
export const getSuccess = (state, {data}) => state.merge({data});
// pegando o estado, o id e as roles...
export const updateMember = (state, {id, roles}) =>
  state.merge({
    // fazendo um map no data...
    // se o id do membro dentro do data, for igual ao id passado como parâmetro...
    // coloque todas as informações novamente no data, e adicione as roles ao membro
    data: state.data.map((member) =>
      member.id === id ? {...member, roles} : member,
    ),
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBERS_MODAL]: openModal,
  [Types.CLOSE_MEMBERS_MODAL]: closeModal,
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});
