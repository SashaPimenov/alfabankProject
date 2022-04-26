import React, { useEffect } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CameraComponent from "../components/forCamera/CameraComponent";

export default function CameraScreen({route, navigation}) {
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container} >
      <View style={[{position: "absolute", zIndex: 3}]}>
        <TouchableOpacity onPress={goBack}>
          <Image style={styles.back} source={require('../images/back.png')} />
        </TouchableOpacity>
      </View>

      <CameraComponent chainStores={route.params.value}/>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },

  back: {
    width: 35,
    height: 20,
    marginLeft: 20,
    marginTop: 25,
  },
});

