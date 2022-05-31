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
import Geolocation from 'react-native-geolocation-service';
import CardComponent from "../components/forCard/CardComponent";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {responsiveFontSize} from "react-native-responsive-dimensions";
import GlobalButton from "../components/GlobalButton";
import { PermissionsAndroid } from 'react-native';

const MainScreen = ({ navigation }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [location, setLocation] = useState<any>();
  const [value, setValue] = useState(null);
  const [chainsStores, setChainsStores] = useState<any[]>([]);
  const [allCard, setAllCard] = useState<any[] | null>(null);
  const [granted, setGranted] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState<string>('')
const [addedStoresID,setAddedStoresID] = useState<number[] | null>(null);


  const findCoordinates = () => {
    return new Promise(function(resolve) {
      Geolocation.getCurrentPosition(
        position => {
          const loc = position;
          setLocation(loc);
          resolve(loc);
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true }
      );
    });
  };

  const getChainStore = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const url = "http://192.248.177.166:8000/store_chains/";
        const request = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }).then(request => request.json());
        const allChainsStores = request.map((element, index) =>
          new Object({ label: element.name, value: element.id }));
        setChainsStores(allChainsStores);
      }
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          { text: "OK" }]);
      }
    }
  };

  const getAllCard = async (coords) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const url = coords !== null ? "http://192.248.177.166:8000/cards/?latitude=" + coords.coords.latitude + "&longitude=" + coords.coords.longitude : "http://192.248.177.166:8000/cards/";
        const request = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(response => response.json());
        setAllCard(request);
        let storesID:number[] = []
        storesID = request.map((element,index) => storesID[index] = element.store_chain_id)
        setAddedStoresID(storesID)
        console.log(request)
      }
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          { text: "OK" }]);
      }
    }
  };
  const allApiRequest = async () => {
    await locPermission();
    await getChainStore();
  };

  const locPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const coords = await findCoordinates()
        await getAllCard(coords)
        setGranted(true)
      } else {
        let coords = null
        await getAllCard(coords)
        setGranted(false)
      }
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          { text: "OK" }]);
      }
    }
  }


  useEffect(() => {
      allApiRequest();
    },
    []);


  const LoadSettings = () => {
    navigation.navigate("Settings");
  };

  const LoadCamera = () => {
    navigation.navigate("Camera", { value });
  };

  const updateStack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AllCard' }]
    })
  }

  const isCorrectChainStore = (value) => {
    console.log(value)
    console.log(addedStoresID)
    if (!addedStoresID?.includes(value)){
      setModalVisible1(!modalVisible1)
      LoadCamera()
      setError(false)
      setText('')
    }else {
      setError(true)
      setText('У вас уже есть карта этого магазина')
    }
  }

  return (
    <View style={[{ flex: 1, backgroundColor: "#232323" }]}>
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
                    onFocus={() => (setError(false), setText(''))}
                    mode="dropdown"
                    style={[{ fontSize: 10, color: "#C5C5C5", fontWeight: "bold" }]}
                    dropdownIconColor={"#C5C5C5"}>
                    <Picker.Item label="Выберите магазин" value={null} style={styles.pickerItemStyle} />
                    {chainsStores.map(store => <Picker.Item label={store.label} value={store.value} key={store.value}
                                                            style={styles.pickerItemStyle} />)}
                  </Picker>
                </View>
                {error && <Text style={[{alignSelf:'center', color:"#ff4c5b",fontWeight:'bold',position:'absolute', marginTop:'53%' }]}>{text}</Text>}
                <View style={[{ flexDirection: "row", justifyContent: "space-evenly", minWidth: "90%", maxWidth: "100%" }]}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: "#ff4c5b" }]}
                                    onPress={() => (setModalVisible1(!modalVisible1), setText(''),setError(false), setValue(null))}>
                    <Text style={styles.modalButtonText}>Отмена</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: "#7FDA77" }]}
                                    onPress={() => value !== null ? (isCorrectChainStore(value))
                                      : (setError(true), setText('Сначала выберите торговую сеть'))}>
                    <Text style={styles.modalButtonText}>Далее</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={[{ paddingBottom:20,flexDirection: "row", justifyContent: "space-between", marginTop:10, marginHorizontal:20 }]}>
            <TouchableOpacity onPress={LoadSettings}>
              <Icon name={"setting"} size={30} color={"#C5C5C5"} />
            </TouchableOpacity>
            <Text style={styles.textSettings}>Ваши карты</Text>
            <TouchableOpacity onPress={() => setModalVisible1(true)}>
              <Icon name={"pluscircleo"} size={30} color={"#C5C5C5"} />
            </TouchableOpacity>
          </View>
      <ScrollView style={[{ flex: 1, backgroundColor: "#232323" }]}>
        {granted !== null ?
          <>
          {chainsStores[0]?.label && allCard !== null ?
            <>
          {
            !allCard.length ?
              <View style={[{ marginTop: "50%" }]}>
                <Text style={[styles.textSettings, { fontSize: responsiveFontSize(2.5), alignSelf: "center" }]}>У вас нет добавленных
                  карт</Text>
                <View style={[{ marginTop: "-5%", alignSelf: "center" }]}>
                  <GlobalButton color={"#7FDA77"} text={"Добавить карту"} func={() => setModalVisible1(!modalVisible1)} />
                </View>
              </View>
              :
              <View>
                {allCard.map(card => <CardComponent image={card.image_url} storeChain={card.store_chain_id}
                                                    address = {card.address} distance = {card.distance} key={card.id} id = {card.id} func = {updateStack} granted = {granted}/>)}
              </View>}
          </> : <View style={[{ marginTop: "50%" }]}>
              <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
            </View>}
          </>: <View style={[{ marginTop: "50%" }]}>
          <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
          </View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#232323",
    width: "100%",
    alignSelf: "center"
  },
  pickerItemStyle: {
    color: "#C5C5C5",
    backgroundColor: "#232323"
  },
  centered1View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal1View: {
    margin: 20,
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: '9%',
    alignItems: "center",
    width: "85%",
    maxWidth: "86%",
    height: '32%'
  },
  modalButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    textAlign: "center",
    color: "#434343",
    paddingHorizontal:'5%',
  },
  inModalText: {
    marginBottom: '5%',
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },

  button: {
    borderRadius: 20,
    padding: '3%',
    marginTop: "20%",
    minWidth: "35%",
    marginHorizontal:'7%',
  },

  textSettings: {
    color: "#C5C5C5",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
});

export default MainScreen;
