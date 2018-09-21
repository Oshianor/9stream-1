import React, { Component } from 'react';
// import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';
import {
  StyleSheet, View, TouchableHighlight, Image
} from "react-native";
import { Text, Thumbnail, Content, Container } from "native-base";
import gone from '../../../../assets/aqua.jpg';
import { createStackNavigator } from 'react-navigation';
import Notitty from '../components/notify';

const Notify = createStackNavigator(
  {
    Notify: {
      screen: Notitty
    }
  },
  {
    initialRouteName: 'Notify',
  }
)

class Nofications extends Component {
  render() {
    console.log("Notificartionsssss");
    
    return (
      <Container>
        <Notify />
      </Container>
    );
  }
}

export default Nofications;
