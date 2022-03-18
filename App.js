import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthForm from './components/AuthForm';
import RegistrationForm from "./components/RegistrationForm";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationForm />
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
