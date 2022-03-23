import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

// Получает навигатор как props для выхода из аккаунта
const AuthButton = props => {
  return (
    <TouchableNativeFeedback>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => {}}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.4),
  },

  buttonStyle: {
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#EF3124',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    minHeight: 40,
    height: '5%',
    marginTop: '9%',
    marginLeft: '27%',
  },
});

export default AuthButton;
