import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Image, Alert,
} from "react-native";
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import GlobalButton from "../GlobalButton.js";
import { useAuth } from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthForm = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth, setIsAuth } = useAuth()

  React.useEffect(() => {
    if (isAuth)
      navigation.navigate('AllCard')
  }, )

  const LoadRegistration = () => {
    navigation.navigate('Registration')
  }

  // async function request() {
  //   try {
  //     let url = 'http://studprzi.beget.tech/api/user/login';
  //     let res = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           email: email,
  //           password: password
  //         }
  //       })
  //     });
  //     return await res.json()
  //   }catch(e){
  //     Alert.alert("Ошибка", e.message, [
  //       {text: "OK"}])    }
  // }

  // Сохраняет токен в случае удачной попытки входа и перенаправляет на экран main
  const authHandler = async () => {
    // let a = await req();
      // await AsyncStorage.setItem('token', a.user.token).then(() => {
      if (password == '1' && login == '1') {
        AsyncStorage.setItem('token', '1').then(() => {
          setIsAuth(true)
          navigation.navigate('AllCard')})
      } else {
      Alert.alert("Ошибка", "Неправильный логин или пароль", [
        {text: "OK"},
      ])
    }
  }

  return (
    <SafeAreaView style={styles.back}>
      <View style={[{alignItems: 'center', maxHeight: '40%', marginTop: '5%'}]}>
        <Image
          style={[{width: '85%', height: '85%'}]}
          source={require('../../images/logo.png')}
        />
      </View>
      <View style={[{alignItems: 'center'}]}>
        <TextInput
          style={styles.default}
          value={login}
          onChangeText={setLogin}
          placeholder="Login.."
          placeholderTextColor="#C5C5C5"
          keyboardType="email-address"
          color="#ffffff"
        />
        <TextInput
          style={styles.default}
          value={password}
          onChangeText={setPassword}
          placeholder="Password.."
          placeholderTextColor="#C5C5C5"
          secureTextEntry={true}
          color="#ffffff"
        />

        <GlobalButton text = {'Войти'} color = {'#7FDA77'} func = {authHandler} />

        <TouchableNativeFeedback>
          <TouchableOpacity style={[{marginTop: '3%'}]} onPress={LoadRegistration}>
            <Text style={[{fontWeight: 'bold', color: '#C5C5C5'}] }>
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: '5%',
    marginTop: '3%',
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
    flex: 1,
    backgroundColor: '#232323',
  },
});

export default AuthForm;
