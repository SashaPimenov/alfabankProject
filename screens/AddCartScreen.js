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
        <Image style={styles.back} source={require('../images/back.png')} />
      </TouchableOpacity>
      <View style={styles.addButton}>
        <GlobalButton color = {'#7FDA77'} text = {'Добавить карту'} func = {LoadCamera} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },
  back: {
    width: 35,
    height: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  addButton: {
    alignSelf: "center"
  },
});

export default AddCardScreen;
