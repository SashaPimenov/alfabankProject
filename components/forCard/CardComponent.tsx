import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text, ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

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
                <Icon  name={"close"} size={25}/>
              </TouchableOpacity>
            </View>
            {loadImage ? null :
              <>
                <View style={[{marginTop:'50%'}]}>
                  <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                </View>
              </> }
            <Image style={[{height: '97%', width: '100%', borderRadius: 20 }]}
                   source={{ uri: props.image}} onLoad={() => setLoadImage(true)}/>
              <View style={styles.buttonDelete}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={[{color: '#434343', fontSize: 15, fontWeight: "bold",}]}>Удалить карту</Text>
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
    flex: 1,
    marginTop: '2%',
    alignItems: "center",
  },

  modalView: {
    width: "95%",
    height: "95%",
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 15,
    paddingBottom: 25,

  },
  buttonClose: {
    alignSelf: "flex-end",
    borderRadius: 20,
    backgroundColor: "#C5C5C5",
    zIndex: 2,
    position:"absolute"
  },

  buttonDelete: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#ff4c5b",
    marginTop: '2%',
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    },

  card: {
    width: '83%',
    height: 210,
    alignSelf: "center",
  }

});

export default CardComponent;
