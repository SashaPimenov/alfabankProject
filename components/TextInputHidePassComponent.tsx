import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const TextInputHidePassComponent = (props) => {
  const [hidePass, setHidePass] = useState(true);
  return(
    <>
    <TextInput
      style={styles.default}
      value={props.value}
      onChangeText={props.func}
      autoCapitalize = 'none'
      placeholder={props.place}
      placeholderTextColor="#C5C5C5"
      secureTextEntry={hidePass ? true : false}
      autoComplete='off'
    />
  <TouchableWithoutFeedback style={[{alignSelf: "center"}]} onPress={() => setHidePass(!hidePass)}>
    {hidePass ?
      <Icon name="eye-with-line" size={25} color={'white'} style={[{alignSelf: 'center'}]}/>
      :
      <Icon name="eye" size={25} color={'white'} style={[{alignSelf: 'center'}]}/>
    }
  </TouchableWithoutFeedback>
      </>
  )
}
const styles = StyleSheet.create({
  default: {
    color:'#ffffff',
    borderStyle: 'solid',
    borderColor: '#C5C5C5',
    borderBottomWidth: 2,
    margin: '2%',
    padding: '2%',
    width: '70%',
    fontSize: responsiveFontSize(2.2),
  },})

export default TextInputHidePassComponent
