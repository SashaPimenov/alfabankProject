import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CameraComponent from "../components/forCamera/CameraComponent";

export default function CameraScreen({navigation}) {
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container} >
      <CameraComponent />
      <TouchableOpacity onPress={goBack}>
        <Text style={[{ color:'#7FDA77',fontSize:40, fontWeight:'bold'}]}>Назад</Text>
      </TouchableOpacity>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  }});

