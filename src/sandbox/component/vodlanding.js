import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  Content,
} from 'native-base';
// import xmen from "../../../../assets/x-men.jpg";
import aqua from "../../../../assets/aqua.jpg";
import istock from "../../../../assets/istock.jpg";
// import starwars from "../../../../assets/star-wars.jpg";
import nwa from "../../../../assets/nwa.jpg";
import more from "../../../../assets/more.jpg";
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from 'react-native-easy-grid';


const { width } = Dimensions.get('window')


export default class Swaplanding extends Component {
  displayMovies = () => {
    return (
      <Content>
        <Grid>
          <Row>
            <Col style={styles.paper} onPress={this.handlePress} >
              <View style={styles.title}>
                <Text style={styles.tex} >Aquaman</Text>
              </View>
              <Image source={aqua} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Scrop</Text>
              </View>
              <Image source={more} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Night GAle</Text>
              </View>
              <Image source={nwa} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
          </Row>
          <Row>
            <Col style={styles.paper} onPress={this.handlePress} >
              <View style={styles.title}>
                <Text style={styles.tex} >Aquaman</Text>
              </View>
              <Image source={aqua} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Scrop</Text>
              </View>
              <Image source={more} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Night GAle</Text>
              </View>
              <Image source={nwa} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
          </Row>
          <Row>
            <Col style={styles.paper} onPress={this.handlePress} >
              <View style={styles.title}>
                <Text style={styles.tex} >Aquaman</Text>
              </View>
              <Image source={aqua} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Scrop</Text>
              </View>
              <Image source={more} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
            <Col style={styles.paper}>
              <View style={styles.title}>
                <Text style={styles.tex} >Night GAle</Text>
              </View>
              <Image source={nwa} style={{ width: 150, height: 200, padding: 2 }} />
            </Col>
          </Row>
        </Grid>
      </Content>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={250} horizontal={false} autoplay>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
            <Image resizeMode='stretch' style={styles.image} source={istock} />
          </View>
          <View style={styles.slide3}>
            <Image resizeMode='stretch' style={styles.image} source={nwa} />
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
            <Image resizeMode='stretch' style={styles.image} source={more} />
          </View>
          <View style={styles.slide3}>
            <Image resizeMode='stretch' style={styles.image} source={nwa} />
          </View>
        </Swiper>

        <View style={{ justifyContent: "center", alignItems: "center", margin: 8 }} >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500", letterSpacing: 5 }} >Latest Movies</Text>
        </View>

        {this.displayMovies()}

      </View>
    )
  }
}

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





















// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'black'
//   },

//   wrapper: {
//   },

//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'transparent'
//   },

//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#9DD6EB',
//     height: 90
//   },

//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#97CAE5',
//     height: 90
//   },

//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#92BBD9',
//     height: 90
//   },

//   text: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold'
//   },

//   image: {
//     width,
//     flex: 1,
//     height: "100%"
//   }
// }














{/* <Swiper style={styles.wrapper} height={300}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          activeDot={<View style={{ backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={starwars} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={aqua} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={xmen} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={istock} />
          </View>
        </Swiper> */}











































// import React from 'react';

// import { Text, View } from 'react-native';

// import Swiper from 'react-native-animated-swiper';

// const Swaplanding = () => (
//   <Swiper
//     backgroundColor={['#4285f4', '#0f9d58', '#f4b400', '#db4437']}
//     dots
//     dotsColor="rgba(255, 255, 255, 0.25)"
//     dotsColorActive="rgba(255, 255, 255, 0.75)">
//     <Slide title="Lorem" />
//     <Slide title="ipsum" />
//     <Slide title="dolor" />
//     <Slide title="sit" />
//   </Swiper>
// );

// const Slide = ({ title }) => (
//   <View style={styles.slide}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const styles = {
//   slide: { alignItems: 'center', flex: 1, justifyContent: 'center' },
//   title: { color: '#fff', fontSize: 48 }
// };

// export default Swaplanding;