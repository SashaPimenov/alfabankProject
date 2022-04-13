import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class CameraComponent extends PureComponent {
  constructor(props) {super(props);}
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, pauseAfterCapture:true};
            const data = await this.camera.takePictureAsync(options);
            Alert.alert( "Предупреждение","Вы уверены, что хотите сохранить данное фото?", [
                {text: "Сохранить",  onPress: () => {
                    console.log(this.props.chainStores)
                    console.log(data.uri);
                    this.camera.resumePreview()}},
                {text: "Переснять",  onPress: () => {this.camera.resumePreview()}}])
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
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }} />


      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
      </View>
        </View>
    );
  }}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
