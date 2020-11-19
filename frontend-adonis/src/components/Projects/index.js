import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

import { Container, Project } from './styles';
import Members from '../Members';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      newProject: '',
    };
  }

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreateProject = (e) => {
    e.preventDefault();

    const { createProjectRequest } = this.props;

    const { newProject } = this.state;

    createProjectRequest(newProject);
  }

  render() {
    const {
      activeTeam,
      projects,
      openProjectModal,
      closeProjectModal,
      openMembersModal,
      members,
    } = this.props;

    const { newProject } = this.state;

    if (!activeTeam) return null;
    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ Novo</Button>
            </Can>
            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects.data.map((project) => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar projeto</h1>
            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange} />

              <div>
                <Button>Salvar</Button>

                <Button
                  onClick={closeProjectModal}
                  type="button"
                  size="small"
                  color="gray"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Modal>
        )}

        {members.membersModalOpen && (
          <Members />
        )}
      </Container>
    );
  }
}

Projects.propTypes = {
  createProjectRequest: PropTypes.func.isRequired,
  openProjectModal: PropTypes.func.isRequired,
  closeProjectModal: PropTypes.func.isRequired,
  getProjectsRequest: PropTypes.func.isRequired,
  openMembersModal: PropTypes.func.isRequired,
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
  projects: PropTypes.shape({
    projectModalOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    ),
  }),
  members: PropTypes.shape({
    membersModalOpen: PropTypes.bool.isRequired,
  }),
};

Projects.defaultProps = {
  activeTeam: null,
  projects: null,
  members: null,
};

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
  members: state.members,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
