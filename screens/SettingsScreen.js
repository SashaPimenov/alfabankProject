import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[{alignItems: "center"}]}>
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
    fontSize: 18,
    marginTop: 30,
  },

  default: {
    borderStyle: 'solid',
    borderColor: '#C5C5C5',
    borderWidth: 2,
    borderRadius: 20,
    margin: '2%',
    padding: '2%',
    width: '70%',
    fontSize: responsiveFontSize(2.2),
  },

});
