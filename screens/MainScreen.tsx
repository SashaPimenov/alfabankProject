import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  BackHandler,
  ScrollView
} from "react-native";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";
import CardComponent from "../components/forCard/CardComponent";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const MainScreen = ({navigation}) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const [modalVisible1, setModalVisible1] = useState(false);
  const [location, setLocation] = useState<GeolocationResponse>()
  const [value, setValue] = useState(null);
  const [chainsStores, setChainsStores] = useState({})

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

  const getChainStore = async (coords) => {
    try{
      const token = await AsyncStorage.getItem('token');
      if (token != null){
        const request = await axios.get('http://192.248.177.166:8000/login/register',
          {headers: {Authorization: 'Bearer ' + token},
          data: {
            // coords
          }},
          )
        let allChainsStores = request.data.map((element, index) =>
          new Object({label: element.stage_name, value: element.id} ) )
      }
    }catch(e){
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          {text: "OK"}])}}
    }

    const allApiRequest = async () => {
    const coords = await findCoordinates()
    const chainStores = await getChainStore(coords)
    }

  useEffect(() => {
      findCoordinates()
    },
    []);

  const LoadSettings = () => {
    navigation.navigate('Settings')
  }

  const LoadCamera = () => {
    navigation.navigate('Camera',{value})
  }

  return (
    <ScrollView style={[{flex: 1, backgroundColor: '#232323'}]}>
      {location?.coords ?
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
                  <Picker.Item label="Выберите магазин" value={null} style={styles.pickerItemStyle} />
                  <Picker.Item label="Пятёрочка" value={1} style={styles.pickerItemStyle} />
                  <Picker.Item label="Магнит" value={2} style={styles.pickerItemStyle} />
                </Picker>
                </View>
                <View style={[{flexDirection: 'row',justifyContent: 'space-evenly',minWidth: '90%', maxWidth: '100%'}]}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#ff4c5b'}]} onPress={() => setModalVisible1(!modalVisible1)}>
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {backgroundColor: "#7FDA77"}]}
                                    onPress={() => value !== null ? (setModalVisible1(!modalVisible1), LoadCamera())
                                      : Alert.alert( "Ошибка","Сначала выберите торговую сеть", [{text: "Ок"}])}>
                    <Text style={styles.modalButtonText}>Далее</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

      <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
        <TouchableOpacity onPress={LoadSettings}>
          <Icon style={[{marginTop: 20,marginLeft:20}]} name={'setting'} size={30} color={'#C5C5C5'} />
        </TouchableOpacity>
        <Text style={styles.textSettings}>Ваши карты</Text>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Icon style={[{marginTop: 20,marginRight:20}]} name={'pluscircleo'} size={30} color={'#C5C5C5'} />
        </TouchableOpacity>
      </View>
      <View>
        <CardComponent maket ='пятёрочка.png'/>
        <CardComponent  maket ='магнит.png'/>
        <CardComponent maket ='пятёрочка.png'/>
        <CardComponent  maket ='магнит.png'/>
      </View>
        </>: <View style={[{marginTop:'50%'}]}>
          <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
        </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#232323',
    width: '100%',
    alignSelf:'center',
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
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width:'85%',
    maxWidth:'86%',
  },
  modalButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    color:'#434343',
  },
  inModalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    color:'white',
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
    marginTop:'10%',
    minWidth:'30%'
  },

  textSettings: {
    color: '#C5C5C5',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:20,
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
