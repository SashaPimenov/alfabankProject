import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../components/forAuth/useAuth";

const SettingsScreen = ({navigation}) => {

  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const { isAuth, setIsAuth } = useAuth()
  const goBack = () => {
    navigation.goBack()
  }

  async function Exit () {
    await AsyncStorage.removeItem('token').then(() => {
      setIsAuth(false)
      navigation.navigate('Auth')
    });
  }

  const updatePassword = async () => {
    if(password !== secondPassword)
    {
      Alert.alert("Ошибка", "Введённые пароли не совпадают", [
        { text: "OK" }])
    }
    else {
      try {
        let url = 'http://192.248.177.166:8000/login/change_password';
        let token = await AsyncStorage.getItem('token')
        let request = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            new_password: password
          })
        }).then(response => response.json());
        console.log(request)
        Alert.alert('Успешно', 'Ваш пароль сменён.', [
          {text: "OK", onPress: () => (setPassword(''), setSecondPassword(''))}])
      }catch(e){
        Alert.alert("Ошибка", e.message, [
          {text: "OK"}])
      }
    }
  }

  return (
    <View style={styles.container}>

      <View>
          <TouchableOpacity onPress={goBack}>
            <Image style={styles.back} source={require('../images/back.png')} />
          </TouchableOpacity>
          <Text style={styles.textSettings}>Настройки</Text>
      </View>

      <View style={[{alignItems: "center"}]}>
        <TextInput
            style={styles.default}
            placeholder="Старый пароль"
            placeholderTextColor="#C5C5C5"
            secureTextEntry={true}
            color="#ffffff"
            value={password}
            onChangeText={setPassword}>
        </TextInput>
        <TextInput
            style={styles.default}
            placeholder="Новый пароль"
            placeholderTextColor="#C5C5C5"
            secureTextEntry={true}
            color="#ffffff"
            value={secondPassword}
            onChangeText={setSecondPassword}
        />
        <GlobalButton color = {'#7FDA77'} text = {'Сменить пароль'} func ={updatePassword}/>
      </View>

      <View style={[{alignItems: "center", marginBottom:20}]}>
        <GlobalButton color = {'#ff4c5b'}  text = {'Выйти из аккаунта'} func = {Exit} />
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
    position: "absolute",
    alignSelf: "center",
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

  back: {
    width: 35,
    height: 20,
    marginLeft: 20,
    marginTop: 25,
  },
});

export default SettingsScreen;
