import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '~/services/api';
import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList, Invite } from './styles';

class Members extends Component {
  constructor() {
    super();
    this.state = {
      invite: '',
      roles: [],
    };
  }

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

    const response = await api.get('roles');

    this.setState({ roles: response.data });
  }

  handleRolesChange = (id, roles) => {
    const { updateMemberRequest } = this.props;

    updateMemberRequest(id, roles);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = (e) => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
  }

  render() {
    const { closeMembersModal, members } = this.props;
    const { roles, invite } = this.state;
    const customStyles = {
      option: (provided) => ({
        ...provided,
        color: 'black',
      }),
    };

    return (
      <Modal size="big">
        <h1>Membros</h1>
        <Can checkPermissions="invites_create">
          <Invite onSubmit={this.handleInvite}>
            <input
              name="invite"
              placeholder="Convidar para o time"
              value={invite}
              onChange={this.handleInputChange}
            />
            <Button>Enviar</Button>
          </Invite>
        </Can>
        <form>
          <MembersList>
            {members.data.map((member) => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
                {/* Verificando se é administrador
                se for, deixe ele mudar as roles, se não desative */}
                <Can checkRole="administrator">
                  { (can) => (
                    <Select
                      isMulti
                      isDisabled={!can}
                      options={roles}
                      value={member.roles}
                      getOptionLabel={(role) => role.name}
                      getOptionValue={(role) => role.id}
                      styles={customStyles}
                      onChange={(value) => this.handleRolesChange(member.id, value)}
                    />
                  ) }
                </Can>
              </li>
            ))}
          </MembersList>

          <Button onClick={closeMembersModal} filled={false} color="gray">
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

Members.propTypes = {
  inviteMemberRequest: PropTypes.func.isRequired,
  updateMemberRequest: PropTypes.func.isRequired,
  getMembersRequest: PropTypes.func.isRequired,
  closeMembersModal: PropTypes.func.isRequired,
  members: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          name: PropTypes.string,
        }),
        roles: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};

Members.defaultProps = {
  members: {},
};

const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
