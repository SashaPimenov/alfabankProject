import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../components/forAuth/useAuth";

const SettingsScreen = ({navigation}) => {
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
