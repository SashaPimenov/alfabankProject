import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text
} from "react-native";

const CardComponent = (props) => {

  const designs = {
    m: props.storeChain === 2 ? require("../../images/магнит.png") : require("../../images/пятёрочка.png")
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[{ backgroundColor: "#232323", marginTop: 70 }]}>
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
            <Image style={[{height: '97%', width: '100%', borderRadius: 20 }]}
                   source={{ uri: props.image}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[{ color: "#434343", fontWeight: "bold" }]}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.card} source={designs.m} />
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
    width: 310,
    height: 198,
    alignSelf: "center"
  }

});

export default CardComponent;
