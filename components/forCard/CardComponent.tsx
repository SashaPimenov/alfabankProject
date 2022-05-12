import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text, ActivityIndicator
} from "react-native";

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

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[{ color: "#434343", fontWeight: "bold" }]}>Закрыть</Text>
            </TouchableOpacity>
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
    marginTop: '4%',
    alignItems: "center"
  },

  modalView: {
    width: "95%",
    height: "95%",
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 15,
    paddingBottom: 25,
    alignItems: "center"
  },
  button: {
    borderRadius: 20,
    paddingVertical: 5,
    backgroundColor: "#ff4c5b",
    paddingHorizontal: 8,
    marginTop: 7
  },

  card: {
    width: '80%',
    height: 210,
    alignSelf: "center",
  }

});

export default CardComponent;
