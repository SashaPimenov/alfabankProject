import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text,
} from "react-native";

const CardComponent = (props) => {
  const designs={
    m: props.storeChain === 2? require('../../images/магнит.png') :  require('../../images/пятёрочка.png'),
  }
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
            <Image style={[{transform: [{rotate: '90deg'}],marginTop:'18%', height:300,width:420}]} source={{uri: props.image}}/>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[{color:'#434343', fontWeight:'bold'}]}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={styles.card} source = {designs.m} />
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
    width: '85%',
    height:'70%',
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 5,
    marginTop:'32%',
    backgroundColor: '#ff4c5b',
    paddingHorizontal: 8
  },

  card: {
    width: 310,
    height: 198,
    alignSelf: 'center',
  },

});

export default CardComponent;
