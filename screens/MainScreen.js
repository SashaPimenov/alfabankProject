import React from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.back}>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={}
        >
          <Image style={styles.settings} source={require('../images/settings.png')} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={styles.plus} source={require('../images/plus.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.card} source={require('../images/card_1.png')} />
        <Image style={styles.card2} source={require('../images/card_2.png')} />
        <Image style={styles.card3} source={require('../images/card_3.png')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: '#232323',
  },

  card: {
    position: "absolute",
    width: 300,
    height: 198,
    marginTop: 167,
    alignSelf: 'center',
    zIndex: 3
  },

  card2: {
    position: "absolute",
    width: 300,
    height: 198,
    marginTop: 207,
    alignSelf: 'center',
    zIndex: 2
  },

  card3: {
    position: "absolute",
    width: 300,
    height: 198,
    marginTop: 247,
    alignSelf: 'center',
    zIndex: 1
  },

  settings: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
  },

  plus: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 20,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  }


});
