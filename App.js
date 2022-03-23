import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthForm from './components/AuthForm';
import RegistrationForm from './components/RegistrationForm';
import Main from './components/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '13%',
    backgroundColor: '#ffffff',
    height: '100%',
  },
});