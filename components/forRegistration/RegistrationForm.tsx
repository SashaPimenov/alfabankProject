import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/AntDesign";
import TextInputHidePassComponent from "../TextInputHidePassComponent";
import GlobalButton from "../GlobalButton";
import TextInputForLogin from "../TextInputForLogin";

const RegistrationForm = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const registrationFunc = async () => {
    if (password !== secondPassword || login === "" || password === "") {
      Alert.alert("Ошибка", "Пароли не совпадают или не все поля заполнены", [
        { text: "OK", onPress: () => (setPassword(""), setSecondPassword("")) }]);
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
        Alert.alert(request.detail ? "" : "Успешно", request.detail ? request.detail : "Ваш аккаунт успешно зарегистрирован.", [
          {
            text: "OK", onPress: request.detail ? undefined : () =>
              navigation.navigate("Auth")
          }]);
      } catch (e) {
        if (e instanceof Error) {
          Alert.alert("Ошибка", e.message, [
            { text: "OK" }]);
        }
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

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
          <TextInputForLogin place="Введите логин" value={login} func={setLogin} />
        </View>
        <View style={[{ flexDirection: "row", maxWidth: "92%" }]}>
          <TextInputHidePassComponent place="Введите пароль" value={password} func={setPassword} />
        </View>
        <View style={[{ flexDirection: "row", maxWidth: "92%" }]}>
          <TextInputHidePassComponent place="Повторите пароль" value={secondPassword} func={setSecondPassword} />
        </View>
        <GlobalButton color={"#7FDA77"} text="Зарегистрироваться" func={registrationFunc} />
      </View>
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
    marginTop: 25
  }
});

export default RegistrationForm;