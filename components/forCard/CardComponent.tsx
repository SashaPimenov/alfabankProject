import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text, ActivityIndicator, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {responsiveFontSize} from "react-native-responsive-dimensions";

const CardComponent = (props) => {
  const [loadImage, setLoadImage] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState(false);

  const designs = GetDesigns(props.storeChain)

  function GetDesigns(x) {
    switch (x){
      case 1:  return  require("../../images/пятёрочка.png")
      case 2:  return require("../../images/магнит.png")
      case 3:  return require("../../images/перекрёсток.png")
    }
  }

  const deleteCard = async () => {
    Alert.alert("", "Вы действительно хотите удалить данную карту?", [
      { text: "Удалить",
        onPress: deleteCardAPI},
      { text: "Отмена"}
    ]);
  }

  const deleteCardAPI = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const url = "http://192.248.177.166:8000/cards/" + props.id.toString();
        const request = await fetch(url, {
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(response => response.json());
        console.log(request)
        props.func()
      }
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert("Ошибка", e.message, [
          { text: "OK" }]);
      }
    }
  };

  return (
    <View style={[{ backgroundColor: "#232323", marginTop: 25, marginBottom:30}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClose}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[{color: '#434343', fontSize: responsiveFontSize(1.6), fontWeight: "bold",}]}>Закрыть</Text>
              </TouchableOpacity>
            </View>
            {loadImage ? null :
              <>
                <View style={[{marginTop:'50%'}]}>
                  <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                </View>
              </> }
            <Image style={[{height: '100%', width: '100%', borderRadius: 20 }]}
                   source={{ uri: props.image}} onLoad={() => setLoadImage(true)}/>
            <View style={styles.buttonDelete}>
              <TouchableOpacity onPress={deleteCard}>
                <Text style={[{color: '#434343', fontSize: responsiveFontSize(1.7), fontWeight: "bold",}]}>Удалить карту</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <View>
            <Image source={designs}  style={styles.card}/>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '2%',
    alignItems: "center",
  },

  modalView: {
    width: "95%",
    height: "97%",
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 8,
    paddingBottom: '10%',
  },

  buttonClose: {
    zIndex: 2,
    position:"absolute",
    alignSelf: 'flex-start',
    marginLeft: '82%',
    backgroundColor: '#ff4c5b',
    borderRadius: 20,
    padding: '1%',
    marginTop: '5%',
    alignItems: 'center',
  },

  buttonDelete: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#ff4c5b",
    marginTop: '2%',
    zIndex: 2,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    },

  card: {
    width: '83%',
    height: 210,
    alignSelf: "center",
  }

});

export default CardComponent;
