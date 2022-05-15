import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../components/forAuth/useAuth";
import Icon from "react-native-vector-icons/AntDesign";
import TextInputHidePassComponent from "../components/TextInputHidePassComponent";

const SettingsScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { isAuth, setIsAuth } = useAuth();
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const [isSucccess, setIsSuccess] = useState(false)

  const goBack = () => {
    navigation.goBack();
  };

  async function Exit() {
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("token").then(() => {
      setIsAuth(false);
      navigation.navigate("Auth");
    });
  }


  const updatePassword = async () => {
    const rightOldPassword = await AsyncStorage.getItem("password");
    console.log(rightOldPassword)
    if (oldPassword !== rightOldPassword || oldPassword === '' || newPassword === '') {
      setError(true)
      setText("Вы ввели неправильный старый пароль")
    } else {
      if (oldPassword === newPassword) {
        setError(true)
        setText("Пароли совпадают")
      } else {
        try {
          let url = "http://192.248.177.166:8000/login/change_password";
          let token = await AsyncStorage.getItem("token");
          let request = await fetch(url, {
            method: "PUT",
            headers: {
              "Authorization": "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              new_password: newPassword
            })
          }).then(response => response.json());
          await AsyncStorage.removeItem("password");
          await AsyncStorage.setItem("password", newPassword);
          setError(true)
          setText("Вы сменили пароль")
          setIsSuccess(true)
        } catch (e) {
          if (e instanceof Error) {
            setError(true)
            setText(e.message)
          }
        }
      }
    }
  };

  const focus = () => {
    setError(false)
    setIsSuccess(false)
  }

  return (
    <View style={styles.container}>
      <View  style={[{marginTop:10, marginHorizontal:20 }]}>
        <TouchableOpacity onPress={goBack}>
          <Icon  name={"arrowleft"} size={35} color={"#7FDA77"} />
        </TouchableOpacity>
        <Text style={styles.textSettings}>Настройки</Text>
      </View>

      <View style={[{ alignItems: "center" }]}>
        <View style={[{ flexDirection: "row" }]}>
          <TextInputHidePassComponent place={"Старый пароль"} value={oldPassword} func={setOldPassword} focus = {focus} />
        </View>

        <View style={[{ flexDirection: "row" }]}>
          <TextInputHidePassComponent place={"Новый пароль"} value={newPassword} func={setNewPassword} focus = {focus}/>
        </View>
        <GlobalButton color={"#7FDA77"} text={"Сменить пароль"} func={updatePassword} />

        {error && <Text style={[{fontSize: 15,marginTop:'5%' ,color: !isSucccess? "#ff4c5b" : "#7FDA77", fontWeight:'bold', alignSelf:'center'}]}>{text}</Text>}


      </View>

      <View style={[{ alignItems: "center", marginBottom: 20 }]}>
        <GlobalButton color={"#ff4c5b"} text={"Выйти из аккаунта"} func={Exit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    justifyContent: "space-between"
  },

  textSettings: {
    color: "#C5C5C5",
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "center"
  },

  default: {
    borderStyle: "solid",
    borderColor: "#C5C5C5",
    borderBottomWidth: 2,
    margin: "2%",
    padding: "2%",
    width: "70%",
    fontSize: responsiveFontSize(2.2)
  }
});

export default SettingsScreen;
