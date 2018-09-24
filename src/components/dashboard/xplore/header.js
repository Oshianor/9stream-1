import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { Get } from "../../reuse/get";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xploreimages } from '../../../store/actions/data';

import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Header extends Component {
  componentDidMount(){
    let empty = [];
    Get("/resources/slider").then(res => {
      if (!res.error) {
        res.entries.forEach(ent => {
          // console.log(ent.content[0].PosterF);
          empty = empty.concat(ent.content[0].PosterF)
        })
        this.props.xploreimages(empty);
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={height/2.5} horizontal={true} autoplay>
          {
            this.props.data.xploreImg.map((img, index) => (
              <View key={index}  style={styles.slide1}>
                <Image resizeMode='stretch' style={styles.image} source={{ uri: img }} />
              </View>
            ))
          }
        </Swiper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    xploreimages: xploreimages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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