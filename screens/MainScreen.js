import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet, Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import CardComponent from "../components/forCard/CardComponent";
import { Picker } from "@react-native-picker/picker";

const MainScreen = ({navigation}) => {

  // const adress = {
  //   'longitude': 60.643235,
  //   'latitude': 56.838937
  // }

  const [modalVisible1, setModalVisible1] = useState(false);
  const [location, setLocation] = useState({})
  const [value, setValue] = useState(null);

  const  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const loc = position;
        setLocation(loc);
        console.log(loc.coords)
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 15000},
    );
  };

  useEffect(() => {
      findCoordinates()
    },
    []);

  const LoadSettings = () => {
    navigation.navigate('Settings')
  }

  const LoadCamera = () => {
    navigation.navigate('Camera')
  }

  // const FindDistance = () => {
  //   let a = (adress.latitude - location.coords.latitude) * 111.111
  //   let b = (adress.longitude - location.coords.longitude) * Math.cos(Math.min(adress.latitude, location.coords.latitude)) * 64
  //   let c = Math.sqrt(a*a + b*b)
  //   console.log(Math.trunc(c*1000))
  // }

  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: '#232323'}]}>
      {location.coords ?
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.centered1View}>
              <View style={styles.modal1View}>
                <Text style={[styles.inModalText]}>Выберите сеть магазинов:</Text>
                <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={value}
                  onValueChange={(value) =>
                    setValue(value)}
                  mode="dropdown"
                  style={[{fontSize: 10,color: '#C5C5C5',fontWeight: 'bold'}]}
                  dropdownIconColor={'#C5C5C5'}>
                  <Picker.Item label="Выбери магазин" value={null} style={styles.pickerItemStyle} />
                  <Picker.Item label="Пятёрочка" value={'p'} style={styles.pickerItemStyle} />
                  <Picker.Item label="Магнит" value={'m'} style={styles.pickerItemStyle} />
                </Picker>
                </View>
                <View style={[{flexDirection: 'row',justifyContent: 'space-evenly',minWidth: '90%', maxWidth: '100%'}]}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#ff4c5b'}]} onPress={() => setModalVisible1(!modalVisible1)}>
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {backgroundColor: "#2196F3"}]}
                                    onPress={() => value !== null ? (setModalVisible1(!modalVisible1), LoadCamera()): Alert.alert( "Ошибка","Сначала выберите торговую сеть", [{text: "Ок"}])}>
                    <Text style={styles.modalButtonText}>Далее</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

      <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
        <TouchableOpacity onPress={LoadSettings}>
          <Image style={[styles.images,{marginLeft:20}]} source={require('../images/settings.png')} />
        </TouchableOpacity>
        <Text style={styles.textSettings}>Ваши карты</Text>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Image style={[styles.images,{marginRight:20}]} source={require('../images/plus.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <CardComponent name = {'пятёрочка'}/>
        <CardComponent name = {'пятёрочка'}/>
      </View>
        </>: <View style={[{marginTop:'50%'}]}>
          <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#232323',
    width: '100%',
    alignSelf:'center'
  },
  pickerItemStyle : {
    color: '#C5C5C5',
    backgroundColor: '#232323',
  },
  centered1View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal1View: {
    margin: 20,
    backgroundColor: "#C5C5C5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width:'85%',
    maxWidth:'86%'
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  inModalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold'
  },
  card: {
    width: 310,
    height: 198,
    marginTop:70,
    alignSelf: 'center',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    marginTop:'40%',
    minWidth:'30%'
  },

  textSettings: {
    color: '#C5C5C5',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:20,
  },

  images: {
    width: 30,
    height: 30,
    marginTop: 20,
  },

  textMain: {
    color: '#C5C5C5',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: "center",
  },
});

export default MainScreen;
