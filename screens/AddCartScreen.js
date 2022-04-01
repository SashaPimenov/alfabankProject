import React, {PureComponent} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {RNCamera} from 'react-native-camera';
import GlobalButton from "../components/GlobalButton";

const AddCardScreen = ({navigation}) => {
  const goBack = () => {
    navigation.goBack()
  }
  const LoadCamera = () => {
    navigation.navigate('Camera')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.settings} source={require('../images/settings.png')} />
      </TouchableOpacity>
      <GlobalButton color = {'#7FDA77'} text = {'Добавить карту'} func = {LoadCamera} />
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

export default AddCardScreen;
