import React from 'react';

import PropTypes from 'prop-types';

import {
  View,
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
} from 'react-native';

import styles from './styles';
const Modal = ({visible, children, onRequestClose}) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.content}>{children}</View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  // nos podemos receber 1 ou mais filhos, neste modal
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Modal;
