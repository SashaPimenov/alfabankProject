import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../components/forAuth/useAuth";
import Icon from 'react-native-vector-icons/AntDesign';
import TextInputHidePassComponent from "../components/TextInputHidePassComponent";

const SettingsScreen = ({navigation}) => {

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

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
    const rightOldPassword = await AsyncStorage.getItem('password')
    if(oldPassword !== rightOldPassword)
    {
      Alert.alert("Ошибка", "Вы ввели неправильный старый пароль.", [
        { text: "OK" }])
    }
    else {
      if(oldPassword === newPassword)
      {
        Alert.alert("Ошибка", "Пароли совпадают.", [
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
              new_password: newPassword
            })
          }).then(response => response.json());
          console.log(request)
          Alert.alert('Успешно', 'Ваш пароль сменён.', [
            { text: "OK", onPress: () => (setNewPassword(''), setOldPassword('')) }])
        } catch (e) {
          Alert.alert("Ошибка", e.message, [
            { text: "OK" }])
        }
      }
    }
  }

  return (
    <View style={styles.container}>

      <View>
          <TouchableOpacity onPress={goBack}>
            <Icon style={styles.back} name={'arrowleft'} size={35} color={'#7FDA77'} />
          </TouchableOpacity>
          <Text style={styles.textSettings}>Настройки</Text>
      </View>

      <View style={[{alignItems: "center"}]}>
        <View style={[{flexDirection: "row"}]}>
          <TextInputHidePassComponent place ={'Старый пароль'} value ={newPassword} func = {setNewPassword}/>
        </View>

        <View style={[{flexDirection: "row"}]}>
          <TextInputHidePassComponent place ={'Новый пароль'} value ={oldPassword} func = {setOldPassword}/>
        </View>
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
    marginLeft: 20,
    marginTop: 25,
  },
});

export default SettingsScreen;
