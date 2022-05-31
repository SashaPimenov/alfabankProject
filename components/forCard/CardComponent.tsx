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
  let address = props.address.split(', ')

  function GetDesigns(x) {
    switch (x){
      case 1:  return  require("../../images/pyatyorochka.png")
      case 2:  return require("../../images/magnit.png")
      case 3:  return require("../../images/perekrestok.png")
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
    <View style={[{ backgroundColor: "#232323", marginTop: '3%', marginBottom:'6%'}]}>
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
                <Text style={[{color: '#434343', fontSize: responsiveFontSize(2), fontWeight: "bold",}]}>Закрыть</Text>
              </TouchableOpacity>
            </View>
            {loadImage ? null :
              <>
                <View style={[{marginTop:'50%'}]}>
                  <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                </View>
              </> }
            <Image style={[{height: '99%', width: '100%', borderRadius: 20 }]}
                   source={{ uri: props.image}} onLoad={() => setLoadImage(true)}/>
            <View style={styles.buttonDelete}>
              <TouchableOpacity onPress={deleteCard}>
                <Text style={[{color: '#C5C5C5', fontSize: responsiveFontSize(2), fontWeight: "bold"}]}>Удалить карту</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <View>
            <Image source={designs}  style={styles.card}/>
          </View>
        </TouchableOpacity>
        {props.granted == true && <>
        <Text style={[styles.textUnderCard,{marginTop: '3%'}]}> Ближайший магазин:</Text>
          <Text style={[styles.textUnderCard,{marginTop: '-0.5%', marginBottom:'-3%', color:"#7FDA77"}]}>{address[1]} {address[2]} ({props.distance} м.)</Text>
      </>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textUnderCard : {
    marginTop: '1%',
    fontWeight:'bold',
    alignSelf:'center',
    color: "#C5C5C5",
    fontSize: responsiveFontSize(2)
  },

  centeredView: {
    marginTop: '2%',
    alignItems: "center",
    marginBottom:'-8%',
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
    flexWrap: 'nowrap',
    position:"absolute",
    alignSelf: 'flex-start',
    marginLeft: '73%',
    borderRadius: 20,
    padding: '1%',
    marginTop: '3%',
    alignItems: 'center',
    minWidth: '15%'
  },

  buttonDelete: {
    backgroundColor: "#ff4c5b",
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: '2.5%',
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
