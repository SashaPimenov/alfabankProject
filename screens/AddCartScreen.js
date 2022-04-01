import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddCardScreen({navigation}) {
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.settings} source={require('../images/settings.png')} />
      </TouchableOpacity>
      <Text style={[{color: 'white'}]}>Добавить карту</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '13%',
    backgroundColor: '#232323',
    height: '100%',
  },
  settings: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
  },
});
