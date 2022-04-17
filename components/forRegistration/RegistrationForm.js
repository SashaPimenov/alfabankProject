import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Image, TouchableOpacity,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import GlobalButton from "../GlobalButton.js";

const RegistrationForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{zIndex: 2}]}>
        <TouchableOpacity onPress={goBack}>
          <Image style={styles.backButton} source={require('../../images/back.png')} />
        </TouchableOpacity>
      </View>

      <View style={[{alignItems: 'center', maxHeight: '40%', marginTop: '5%'}]}>
        <Image
          style={[{width: '85%', height: '85%'}]}
          source={require('../../images/logo.png')}
        />
      </View>

      <View style={[{alignItems: 'center'}]}>
        <TextInput
          style={styles.default}
          value={email}
          onChangeText={setEmail}
          placeholder="Введите логин"
          placeholderTextColor="#C5C5C5"
          keyboardType="email-address"
          color="#ffffff"
        />
        <TextInput
          style={styles.default}
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          placeholderTextColor="#C5C5C5"
          secureTextEntry={true}
          color="#ffffff"
        />
        <TextInput
          style={styles.default}
          value={secondPassword}
          onChangeText={setSecondPassword}
          placeholder="Повторите пароль"
          placeholderTextColor="#C5C5C5"
          secureTextEntry={true}
          color="#ffffff"
        />
        <GlobalButton color = {'#7FDA77'} text = {'Зарегистрироваться'}/>
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
    marginTop: '10%',
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

  container: {
    flex: 1,
    backgroundColor: '#232323',
  },

  backButton: {
    position: 'absolute',
    width: 35,
    height: 20,
    marginLeft: 20,
    marginTop: 25,
  },
});

export default RegistrationForm;
