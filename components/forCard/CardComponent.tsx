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
  const designs = {
    m: props.storeChain === 2 ? require("../../images/магнит.png") : require("../../images/пятёрочка.png")
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[{ backgroundColor: "#232323", marginTop: 40, marginBottom:15 }]}>
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
            {loadImage ? null :
              <>
                <View style={[{marginTop:'50%'}]}>
                  <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
                </View>
              </> }
            <Image style={[{height: '97%', width: '100%', borderRadius: 20 }]}
                   source={{ uri: props.image}} onLoad={() => setLoadImage(true)}/>

            <View style={[{flexDirection: 'row', justifyContent: 'flex-end'}]}>
              <View style={styles.buttonDelete}>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[{color: '#434343', fontSize: 15, fontWeight: "bold",}]}>Удалить карту</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonClose}>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon  name={"close"} size={25} color={"#434343"} />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <View>
        <Image source={designs.m}  style={styles.card}/>
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
    //alignItems: "center",

  },
  buttonClose: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    backgroundColor: "#ff4c5b",
    marginTop: '2%',
    marginRight: '5%',
    zIndex: 2
  },

  buttonDelete: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#ff4c5b",
    marginTop: '2%',
    marginRight: '20%',
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 3
    },

  card: {
    width: '80%',
    height: 210,
    alignSelf: "center",
  }

});

export default CardComponent;
