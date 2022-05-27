import React, { PureComponent, useState } from "react";
import { RNCamera } from "react-native-camera";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CameraComponent extends PureComponent<{
  chainStores: number;
  navigation: any;
  funcFalse: any;
  funcTrue: any;
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
      let file = {
        uri: image.uri,
        type: "image/jpg",
        name: "image"
      };
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
      this.props.funcFalse()
      Alert.alert(data.id ? "Успешно" : "Ошибка", data.id ? "Вы добавили карту" : "У вас уже есть карта данного магазина", [
        { text: "OK", onPress: () => (this.props.navigation.navigate("AllCard"), this.updateStack())}]);
    } catch (e: any) {
      this.props.funcFalse()
      Alert.alert("Ошибка", "Не удалось сохранить карту", [
        { text: "OK" }]);
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, pauseAfterCapture: true, fixOrientation: true, orientation: "portrait" };
      const data = await this.camera.takePictureAsync(options);
      Alert.alert("Предупреждение", "Вы уверены, что хотите сохранить данное фото?", [
        {
          text: "Сохранить", onPress: () => {
            this.addCard(data);
            this.camera.resumePreview();
            this.props.funcTrue()
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
          <BarcodeMask showAnimatedLine={false} width={'87%'} height={'70%'} edgeColor={"#7FDA77"} />
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
    marginBottom: '4.5%',
    width: '10%',
    height: '10%',
  }
});
