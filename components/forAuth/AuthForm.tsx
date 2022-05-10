import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, Alert } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import GlobalButton from "../GlobalButton";
import { useAuth } from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputHidePassComponent from "../TextInputHidePassComponent";
import TextInputForLogin from "../TextInputForLogin";

const AuthForm = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setIsAuth } = useAuth();


  const LoadRegistration = () => {
    navigation.navigate("Registration");
    setPassword("");
    setLogin("");
  };

  async function request() {
    try {
      let formData = new FormData();
      formData.append("username", login);
      formData.append("password", password);
      const url = "http://192.248.177.166:8000/login/token";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
      return await result.json();
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          { text: "OK" }]);
      }
    }
  }

  const authFunction = async () => {
    if (login === "" || password === "") {
      Alert.alert("Ошибка", "Не все поля заполнены", [
        { text: "OK" }]);
    } else {
      let a = await request();
      if (typeof a !== "undefined") {
        try {
          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem("token", a.access_token).then(() => {
            setIsAuth(true);
            navigation.navigate("AllCard");
          });
          setPassword("");
          setLogin("");
        } catch (e) {
          Alert.alert("Ошибка", "Неправильный логин или пароль", [
            { text: "OK" }
          ]);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.back}>
      <View style={[{ alignItems: "center", maxHeight: "40%", marginTop: "5%" }]}>
        <Image
          style={[{ width: "85%", height: "85%" }]}
          source={require("../../images/logo.png")}
        />
      </View>
      <View style={[{ alignItems: "center" }]}>
        <View style={[{ flexDirection: "row", maxWidth: "100%" }]}>
          <TextInputForLogin place="Login.." value={login} func={setLogin} />
        </View>

        <View style={[{ flexDirection: "row", maxWidth: "90%" }]}>
          <TextInputHidePassComponent place={"Password.."} value={password} func={setPassword} />
        </View>
        <GlobalButton text={"Войти"} color={"#7FDA77"} func={authFunction} />
        <TouchableOpacity style={[{ marginTop: "3%" }]} onPress={LoadRegistration}>
          <Text style={[{ fontWeight: "bold", color: "#C5C5C5" }]}>
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#434343",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.0),
    paddingHorizontal: "10%"
  },

  buttonStyle: {
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "#7FDA77",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    minWidth: "40%",
    maxWidth: "60%",
    height: "5%",
    marginTop: "3%"
  },

  default: {
    borderStyle: "solid",
    borderColor: "#C5C5C5",
    borderBottomWidth: 2,
    margin: "2%",
    padding: "2%",
    width: "70%",
    fontSize: responsiveFontSize(2.2),
    color: "#ffffff"
  },

  back: {
    flex: 1,
    backgroundColor: "#232323"
  }
});

export default AuthForm;
