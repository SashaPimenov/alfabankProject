import React from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from "react-native-responsive-dimensions";

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

        <TouchableNativeFeedback>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.buttonText}>Сменить пароль</Text>
          </TouchableOpacity>
        </TouchableNativeFeedback>
      </View>
      <View style={[{alignItems: "center"}]}>
        <TouchableNativeFeedback>
          <TouchableOpacity style={[styles.buttonStyle,{backgroundColor: '#FF4A4A', marginBottom: 20}]} onPress={() => {}}>
            <Text style={styles.buttonText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </TouchableNativeFeedback>
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

  buttonText: {
    color: '#434343',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.0),
    paddingHorizontal: '10%',
  },

  buttonStyle: {
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#7FDA77',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    minWidth: '40%',
    maxWidth: '60%',
    marginTop: '10%',
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
