import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthForm from './components/AuthForm';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthForm />
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
