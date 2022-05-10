import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CameraComponent from "../components/forCamera/CameraComponent";
import Icon from "react-native-vector-icons/AntDesign";

export default function CameraScreen({ route, navigation }) {

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[{ position: "absolute", zIndex: 3 }]}>
        <TouchableOpacity onPress={goBack}>
          <Icon style={styles.back} name={"arrowleft"} size={35} color={"#7FDA77"} />
        </TouchableOpacity>
      </View>

      <CameraComponent chainStores={route?.params?.value} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323"
  },

  back: {
    marginLeft: 20,
    marginTop: 25
  }
});

