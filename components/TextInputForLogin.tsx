import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const TextInputForLogin = (props) => {
  return (
    <TextInput
      style={styles.default}
      value={props.value}
      onChangeText={props.func}
      placeholder={props.place}
      placeholderTextColor="#C5C5C5"
      autoCapitalize={"none"}
      onFocus={props.focus}
    />
  );
};
const styles = StyleSheet.create({
  default: {
    color: "#ffffff",
    borderStyle: "solid",
    borderColor: "#C5C5C5",
    borderBottomWidth: 2,
    margin: "2%",
    padding: "2%",
    width: "70%",
    fontSize: responsiveFontSize(2.2)
  }
});

export default TextInputForLogin;
