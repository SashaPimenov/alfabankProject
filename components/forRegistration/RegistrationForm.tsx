import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Alert, Text } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/AntDesign";
import TextInputHidePassComponent from "../TextInputHidePassComponent";
import GlobalButton from "../GlobalButton";
import TextInputForLogin from "../TextInputForLogin";

const RegistrationForm = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)


  const registrationFunc = async () => {
    if (login.length < 5 || password.length < 7) {
      setError(true)
      setText('Минимальная длина логина 5, пароля - 7 символов')
      setPassword('')
      setSecondPassword('')
    } else {
      if (password !== secondPassword || login === "" || password === "") {
        setError(true)
        setText("Пароли не совпадают или не все поля заполнены")
        setPassword('')
        setSecondPassword('')
      } else {
        try {
          const url = "http://192.248.177.166:8000/login/register";
          const request = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: login,
              password: password
            })
          }).then(response => response.json());
          if (request.detail) {
            setError(true)
            setText('Пользователь с таким логином уже существует')
            setPassword('')
            setSecondPassword('')
          } else {
            setIsSuccess(true)
            setError(true)
            setText('Вы успешно зарегистрировались')
            setTimeout(
              () => navigation.navigate('Auth'), 1000)
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(true)
            setText(e.message)
          }
        }
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
    setError(false)
  };

  const focus = () => {
    setError(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ zIndex: 2 }]}>
        <TouchableOpacity onPress={goBack}>
          <Icon style={styles.backButton} name={"arrowleft"} size={35} color={"#7FDA77"} />
        </TouchableOpacity>
      </View>

      <View style={[{ alignItems: "center", maxHeight: "40%", marginTop: "5%" }]}>
        <Image
          style={[{ width: "85%", height: "85%" }]}
          source={require("../../images/logo.png")}
        />
      </View>

      <View style={[{ alignItems: "center" }]}>
        <View style={[{ flexDirection: "row", maxWidth: "100%" }]}>
          <TextInputForLogin place="Введите логин" value={login} func={setLogin}  focus = {focus}/>
        </View>
        <View style={[{ flexDirection: "row", maxWidth: "92%" }]}>
          <TextInputHidePassComponent place="Введите пароль" value={password} func={setPassword}  focus = {focus}/>
        </View>
        <View style={[{ flexDirection: "row", maxWidth: "92%" }]}>
          <TextInputHidePassComponent place="Повторите пароль" value={secondPassword} func={setSecondPassword}  focus = {focus}/>
        </View>
        <GlobalButton color={"#7FDA77"} text="Зарегистрироваться" func={registrationFunc} />
      </View>

      {error && <Text style={[{fontSize: 14,marginTop:'7%' ,color: !isSuccess? "#ff4c5b" : "#7FDA77", fontWeight:'bold', alignSelf:'center'}]}>{text}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {
    color: "#ffffff",
    borderStyle: "solid",
    borderColor: "#C5C5C5",
    borderBottomWidth: 2,
    margin: "2%",
    padding: "2%",
    width: "70%",
    fontSize: responsiveFontSize(2.2)
  },

  container: {
    flex: 1,
    backgroundColor: "#232323"
  },

  backButton: {
    position: "absolute",
    marginLeft: 20,
    marginTop: 10
  }
});

export default RegistrationForm;
