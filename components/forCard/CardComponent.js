import React, { useState } from "react";
import {
  Image,
  StyleSheet, TouchableOpacity,
  View,
  Modal, Text,
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
            <Image style={[{transform: [{rotate: '90deg'}],marginTop:'32%', height:300,width:520}]} source={require('../../images/test.jpg')}/>
            <TouchableOpacity
              style={styles.button}
              // source={{uri: 'file:///data/user/0/com.alfabankproject/cache/Camera/121be112-b971-42d9-a6ba-9681d2764351.jpg'}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[{color:'white', fontWeight:'bold'}]}>Закрыть</Text>
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
    backgroundColor: "#403a3a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'42%',
    backgroundColor: '#ff4c5b',
  },

  card: {
    width: 310,
    height: 198,
    alignSelf: 'center',
  },

});

export default CardComponent;
