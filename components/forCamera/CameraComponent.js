import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-vector-icons/Ionicons';

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
        }} >
          <BarcodeMask showAnimatedLine={false} width={350} height={250} edgeColor={'#7FDA77'}/>
          <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Icon style={styles.cameraButton} name={'camera-outline'} size={60} color={'#C5C5C5'} />
              </TouchableOpacity>
          </View>
      </RNCamera>


        </View>
    );
  }}

const styles = StyleSheet.create({
    cameraButton: {
        position: "absolute",
        alignSelf: "center",

    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#403a3a',
        zIndex: 2
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        justifyContent: "center",
        marginBottom: 40,
        width: 70,
        height: 70,
    },
});
