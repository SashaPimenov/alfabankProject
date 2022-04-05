import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet, Text,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from '@react-native-community/geolocation';

const MainScreen = ({navigation}) => {
  const adress = {
    'longitude': 60.550426,
    'latitude': 56.802068
  }

  const [location, setLocation] = useState({})
  const  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const loc = position;
        setLocation(loc);
        console.log(loc.coords)
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
    );
  };

  useEffect(() => {
      findCoordinates()
    },
    []);

  const LoadSettings = () => {
    navigation.navigate('Settings')
  }

  const LoadCamera = () => {
    navigation.navigate('Camera')
  }

  const FindDistance = () => {
    let a = (adress.latitude - location.coords.latitude) * 111.111
    console.log(a)
    let b = (adress.longitude - location.coords.longitude) * Math.cos(Math.min(adress.latitude, location.coords.latitude)) * 64
    console.log(b)
    let c = Math.sqrt(a*a + b*b)
    console.log(Math.trunc(c*1000))
  }

  return (
    <SafeAreaView style={styles.back}>
      {location.coords ?
        <>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={LoadSettings}>
          <Image style={styles.settings} source={require('../images/settings.png')} />
        </TouchableOpacity>
        <Text style={styles.textSettings}>Ваши карты</Text>
        <TouchableOpacity onPress={LoadCamera}>
          <Image style={styles.plus} source={require('../images/plus.png')} />
        </TouchableOpacity>
      </View>

      <View>
        <Image style={styles.card} source={require('../images/card_1.png')} />
        <Image style={styles.card2} source={require('../images/card_2.png')} />
        <Image style={styles.card3} source={require('../images/card_3.png')} />
      </View>
        </>: <View style={[{marginTop:'50%', alignItems: 'center'}]}>
          <ActivityIndicator animating={true} size="large" color="#C5C5C5" />
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textSettings: {
    color: '#C5C5C5',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:20,
  },

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
  },

  textMain: {
    color: '#C5C5C5',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: "center",
  },
});

export default MainScreen;
