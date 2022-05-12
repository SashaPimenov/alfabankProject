import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, View } from "react-native";
import Main from './components/Main';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "./components/forAuth/AuthContext";
import axios from "axios";

export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuth = async() => {
    try{
      const token = await AsyncStorage.getItem('token');
      if (token != null){
        await axios.get('http://192.248.177.166:8000/me',
          {headers: {Authorization: 'Bearer ' + token}})
          .then(response => {
            setIsAuth(true);
          })
      }
      setIsLoading(true)
    }catch(e){
      Alert.alert("Ошибка", e.message, [
        {text: "OK"}])}
  }

  useEffect(() => {
      checkAuth()
    },
    []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#232323" />
        {isLoading ?
          <Main /> :
          <View style={[{marginTop:'50%'}]}>
            <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
          </View>
        }
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
