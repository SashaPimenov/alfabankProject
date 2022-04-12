import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Alert, Text,
} from "react-native";

const CardComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[{backgroundColor: '#232323', marginTop:70}]}>
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
            <Image style={[{transform: [{rotate: '90deg'}],marginTop:'25%', height:'60%'}]} source={require('../../images/test.jpg')} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image style={styles.card} source={require('../../images/пятёрочка.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: '90%',
    height:'80%',
    backgroundColor: "#C5C5C5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'40%'
  },

  card: {
    width: 310,
    height: 198,
    alignSelf: 'center',
  },

});

export default CardComponent;
