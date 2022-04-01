import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";

const SettingsScreen = ({navigation}) => {

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={[{alignItems: "center", flexDirection:'row', justifyContent:'space-between'}]}>
        <TouchableOpacity onPress={goBack}>
          <Image style={styles.settings} source={require('../images/settings.png')} />
        </TouchableOpacity>
        <Text style={styles.textSettings}>Настройки</Text>
      </View>
      <View style={[{alignItems: "center"}]}>
        <TextInput
            style={styles.default}
            placeholder="Старый пароль"
            placeholderTextColor="#C5C5C5"
            keyboardType="email-address"
            color="#ffffff"
        />
        <TextInput
            style={styles.default}
            placeholder="Новый пароль"
            placeholderTextColor="#C5C5C5"
            secureTextEntry={true}
            color="#ffffff"
        />
        <GlobalButton color = {'#7FDA77'} text = {'Сменить пароль'} />
      </View>

      <View style={[{alignItems: "center", marginBottom:20}]}>
        <GlobalButton color = {'#FF4A4A'}  text = {'Выйти из аккаунта'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: "space-between"
  },

  textSettings: {
    color: '#C5C5C5',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  default: {
    borderStyle: 'solid',
    borderColor: '#C5C5C5',
    borderBottomWidth: 2,
    margin: '2%',
    padding: '2%',
    width: '70%',
    fontSize: responsiveFontSize(2.2),
  },

  settings: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default SettingsScreen;
