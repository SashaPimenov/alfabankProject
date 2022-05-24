import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CameraComponent extends PureComponent<{
  chainStores: number;
  navigation: any;
}> {
  constructor(props) {
    super(props);
  }

  camera: any;

  updateStack = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'AllCard' }]
    })
  }

  addCard = async (image) => {
    try {
      let token = await AsyncStorage.getItem("token");
      const url = "http://192.248.177.166:8000/cards/add?store_chain_id=" + this.props.chainStores.toString();
      console.log(image.uri)
      console.log(url)
      let file = {
        uri: image.uri,
        type: "image/jpg",
        name: "image"
      };
      console.log(file)
      let formData = new FormData();
      formData.append("image", file);
      const data = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        },
        body: formData
      }).then(response => response.json());
      console.log(data);
      Alert.alert(data.id ? "Успешно" : "Ошибка", data.id ? "Вы добавили карту" : "Не удалось сохранить карту", [
        { text: "OK", onPress: () => (this.props.navigation.navigate("AllCard"), this.updateStack())}]);
    } catch (e: any) {
      Alert.alert("Ошибка", "Не удалось сохранить карту", [
        { text: "OK" }]);
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, pauseAfterCapture: true };
      const data = await this.camera.takePictureAsync(options);
      Alert.alert("Предупреждение", "Вы уверены, что хотите сохранить данное фото?", [
        {
          text: "Сохранить", onPress: () => {
            this.addCard(data);
            this.camera.resumePreview();
          }
        },
        {
          text: "Переснять", onPress: () => {
            this.camera.resumePreview();
          }
        }]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}>
          <BarcodeMask showAnimatedLine={false} width={'93%'} height={'80%'} edgeColor={"#7FDA77"} />
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Icon style={styles.cameraButton} name={"camera-outline"} size={60} color={"#C5C5C5"} />
            </TouchableOpacity>
          </View>
        </RNCamera>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraButton: {
    position: "absolute",
    alignSelf: "center"

  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#403a3a",
    zIndex: 2
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    justifyContent: "center",
    marginBottom: 10,
    width: 70,
    height: 70
  }
});
