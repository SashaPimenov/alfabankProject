import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, TextInput} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import AuthButton from './forAuthForm/Button';
import Icon from '../images/mainLogo';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.back}>
      <View
        style={[
          {marginTop: '-5%', marginHorizontal: '5%', alignItems: 'flex-end'},
        ]}>
        <Icon/>
      </View>
      <View>
        <TextInput
          style={[styles.default, {marginTop: 80}]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email.."
          placeholderTextColor="#a0a0a4"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.default}
          value={password}
          onChangeText={setPassword}
          placeholder="Password.."
          placeholderTextColor="#a0a0a4"
          secureTextEntry={true}
        />

        <AuthButton text={'Войти'} font ={2.4} />
      </View>
      <View style={[{marginBottom: '10%'}]}>
        <AuthButton text={'Регистрация'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {
    borderStyle: 'solid',
    borderColor: 'red',
    borderBottomWidth: 2,
    margin: '2%',
    padding: '2%',
    width: '70%',
    color: 'rgba(239,49,36,.85)',
    fontSize: responsiveFontSize(2.2),
    marginLeft: '15%',
  },

  back: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
});

export default AuthForm;
