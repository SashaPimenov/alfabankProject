import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Image, Alert, TouchableWithoutFeedback,
} from "react-native";
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import GlobalButton from "../GlobalButton.js";
import { useAuth } from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Entypo';

const AuthForm = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth, setIsAuth } = useAuth()
  const [hidePass, setHidePass] = useState(true);

  React.useEffect(() => {
    if (isAuth)
      navigation.navigate('AllCard')
  }, )

  const LoadRegistration = () => {
    navigation.navigate('Registration')
  }

  async function request() {
    try {
      let formData = new FormData();
      formData.append("username", login);
      formData.append("password", password);
      const url = 'http://192.248.177.166:8000/login/token';
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })
      return await result.json()
    }catch(e){
      Alert.alert("Ошибка", e.message, [
        {text: "OK"}])    }
  }

  const authFunction = async () => {
    if (login === '' || password === '') {
      Alert.alert("Ошибка", "Не все поля заполнены", [
        { text: "OK" }])
    }
    else{
    let a = await request();
      if (typeof a !== "undefined"){
      try {
        await AsyncStorage.setItem('token', a.access_token).then(() => {
          setIsAuth(true)
          navigation.navigate('AllCard')})
        await AsyncStorage.setItem('password', password)
        await AsyncStorage.setItem('password', password)
        setPassword('')
        setLogin('')
        setHidePass(true)
      } catch (e) {
        Alert.alert("Ошибка", "Неправильный логин или пароль", [
          {text: "OK"},
        ])
      }}
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
        <View style={[{flexDirection: 'row', maxWidth: '100%'}]}>
          <TextInput
            style={styles.default}
            value={login}
            onChangeText={setLogin}
            placeholder="Login.."
            placeholderTextColor="#C5C5C5"
            keyboardType="email-address"
            color="#ffffff"
          />
        </View>

        <View style={[{flexDirection: "row", maxWidth: '90%'}]}>
          <TextInput
            style={styles.default}
            value={password}
            onChangeText={setPassword}
            autoCapitalize = 'none'
            placeholder="Password.."
            placeholderTextColor="#C5C5C5"
            secureTextEntry={hidePass ? true : false}
            color="#ffffff"
          />
          <TouchableWithoutFeedback style={[{alignSelf: "center"}]} onPress={() => setHidePass(!hidePass)}>
            {hidePass ?
                <Icon name="eye-with-line" size={25} color={'white'} style={[{alignSelf: 'center'}]}/>
                :
                <Icon name="eye" size={25} color={'white'} style={[{alignSelf: 'center'}]}/>
            }
          </TouchableWithoutFeedback>
        </View>

        <GlobalButton text = {'Войти'} color = {'#7FDA77'} func = {authFunction} />

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
  eye: {
    height: 35,
    width: 35,
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
