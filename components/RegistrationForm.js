import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import BackCIcon from '../images/BackIcon';
import Logo from '../images/mainLogo';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  return (
    <SafeAreaView style={styles.back}>
      <View
        style={[
          {
            marginTop: '-5%',
            marginHorizontal: '5%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
        ]}>
        <TouchableNativeFeedback>
          <TouchableOpacity onPress={() => {}}>
            <BackCIcon />
          </TouchableOpacity>
        </TouchableNativeFeedback>
        <Logo />
      </View>
      <View>
        <TextInput
          style={[styles.default, {marginTop: 80}]}
          value={email}
          onChangeText={setEmail}
          placeholder="Введите почту"
          placeholderTextColor="rgb(80, 87, 89)"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.default}
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          placeholderTextColor="rgb(80, 87, 89)"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.default}
          value={secondPassword}
          onChangeText={setSecondPassword}
          placeholder="Повторите пароль"
          placeholderTextColor="rgb(80, 87, 89)"
          secureTextEntry={true}
        />
      </View>
      <View style={[{marginBottom: '40%'}] }>
        <AuthButton text={'Зарегистрироваться'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.1),
    paddingHorizontal: '5%',
  },
  buttonStyle: {
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#EF3124',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    height: '5%',
    marginTop: '9%',
  },
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

export default RegistrationForm;
