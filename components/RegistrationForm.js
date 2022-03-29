import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity, Text, Image,
} from "react-native";
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import BackCIcon from '../images/BackIcon';
import Logo from '../images/mainLogo';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  return (
    <SafeAreaView style={styles.back}>
      <View style={[{alignItems: 'center', maxHeight: '40%', marginTop: '5%'}]}>
        <Image
          style={[{width: '85%', height: '85%'}]}
          source={require('../images/logo.png')}
        />
      </View>
      <View style={[{alignItems: 'center'}]}>
        <TextInput
          style={styles.default}
          value={email}
          onChangeText={setEmail}
          placeholder="Введите почту"
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
        <TouchableNativeFeedback >
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
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

  back: {
    flex: 1,
    backgroundColor: '#232323',
  },
});

export default RegistrationForm;
