import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Добавить карту</Text>
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
