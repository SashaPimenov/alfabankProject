import React, { useEffect, useState } from "react";
import {StyleSheet, View } from "react-native";
import Main from './components/Main';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "./components/forAuthForm/AuthContext";

export default function App() {
  const [isAuth, setIsAuth] = useState(false)

  const checkAuth = async() => {
      const token = await AsyncStorage.getItem('token');
      if (token != null){
        console.log(token)
            setIsAuth(true);
      }
  }

  useEffect(() => {
      checkAuth()
    },
    []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <View style={styles.container}>
        <Main />
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232323',
    height: '100%',
  },
});
