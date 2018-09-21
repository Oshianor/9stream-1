import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
// import istock from "../../../assets/aqua.jpg";
// import swap from "../../../assets/swapicon.png";
// import nwa from "../../../assets/nwa.jpg";
// import more from "../../../assets/more.jpg";
import swap1 from "../../../assets/swap/1.jpg";
import swap2 from "../../../assets/swap/2.jpg";
import swap3 from "../../../assets/swap/3.jpg";
import swap4 from "../../../assets/swap/4.jpg";
import swap5 from "../../../assets/swap/5.jpg";
import swap6 from "../../../assets/swap/6.jpg";
import swap7 from "../../../assets/swap/7.jpg";
import swap8 from "../../../assets/swap/8.jpg";
import swap9 from "../../../assets/swap/9.jpg";
import swap10 from "../../../assets/swap/10.jpg";
import swap11 from "../../../assets/swap/11.jpg";
import swap12 from "../../../assets/swap/12.jpg";
import swap13 from "../../../assets/swap/13.jpg";
import swap14 from "../../../assets/swap/14.jpg";
import swap15 from "../../../assets/swap/15.jpg";
import swap16 from "../../../assets/swap/16.jpg";
import swap17 from "../../../assets/swap/17.jpg";
import swap18 from "../../../assets/swap/18.jpg";

import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={height/2.5} horizontal={true} autoplay>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap1} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap2} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap3} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap4} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap5} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap6} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap7} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap8} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap9} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap10} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap11} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap12} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap13} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap14} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap15} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap16} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap17} />
          </View>
          <View style={styles.slide1}>
            <Image resizeMode='stretch' style={styles.image} source={swap18} />
          </View>
        </Swiper>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  paper: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    backgroundColor: "white",
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 900
  },
  tex: {
    fontSize: 20,
    color: 'white',
    // fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
    height: 90
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#97CAE5',
    height: 90
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#92BBD9',
    height: 90
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1,
    height: "100%"
  }
})