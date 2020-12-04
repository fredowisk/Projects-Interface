import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';
import Members from '~/components/Members';

class Main extends Component {
  state = {
    leftOpen: false,
    rightOpen: false,
  };

  //função que serve para os dois estados
  toggleMenu = (position, isOpen) => {
    this.setState({[`${position}Open`]: isOpen});
  };

  render() {
    const {activeTeam} = this.props;
    const {leftOpen, rightOpen} = this.state;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGestures
          onChange={(isOpen) => this.toggleMenu('left', isOpen)}
          openMenuOffset={70}
          menu={<TeamSwitcher />}>
          <SideMenu
            isOpen={rightOpen}
            disableGestures
            onChange={(isOpen) => this.toggleMenu('right', isOpen)}
            openMenuOffset={285}
            menuPosition="right"
            menu={<Members />}>
            <View style={styles.container}>
              <View style={styles.header}>
                {/* o hitslop aumenta o tamanho da area clicavel do botão */}
                <TouchableOpacity
                  hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}
                  onPress={() => this.toggleMenu('left', true)}>
                  <Icon name="menu" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.teamTitle}>
                  {activeTeam ? activeTeam.name : 'Selecione um time'}
                </Text>
                <TouchableOpacity
                  hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}
                  onPress={() => {
                    this.toggleMenu('right', true);
                  }}>
                  <Icon name="group" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
              <Projects />
            </View>
          </SideMenu>
        </SideMenu>
      </View>
    );
  }
}

Main.propTypes = {
  activeTeam: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

Main.defaultProps = {
  activeTeam: null,
};

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);
