import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CameraComponent from "./CameraComponent";

export default function CameraScreen({navigation}) {
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={goBack}>
        <Text>Отмена</Text>
      </TouchableOpacity>
      <CameraComponent />
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: "space-between"
  }});

