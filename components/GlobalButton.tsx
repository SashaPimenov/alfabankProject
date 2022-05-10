import React from "react";
import { StyleSheet, TouchableNativeFeedback, TouchableOpacity, Text } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const GlobalButton = (props) => {
  return (
    <TouchableNativeFeedback>
      <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: props.color }]} onPress={props.func}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#434343",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.0),
    paddingHorizontal: "10%"
  },

  buttonStyle: {
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "#7FDA77",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    minWidth: "40%",
    maxWidth: "60%",
    height: "5%",
    marginTop: "10%"
  }
});
export default GlobalButton;
