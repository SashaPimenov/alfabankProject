import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Мэйн</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '13%',
    backgroundColor: '#232323',
    height: '100%',
  },
});
