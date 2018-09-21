import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text, ScrollView, ImageBackground, AsyncStorage } from 'react-native';
import stream from "../../assets/stream.png";
import back from "../../assets/wall.png";
import RegisterForm from "../../components/register/registerform";
import { Snackbar } from 'react-native-paper';

class Register extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      visible: false,
      // duration: 20000,
    }
  }

  sendError(text, visible){
    this.setState({
      text,
      visible
    })
  }

  render() {
    return (
      <ImageBackground source={back} style={classes.back} >
        <ScrollView>
          <View style={classes.container}>
            <View style={classes.logoCont}>
              <Image
                style={classes.logo}
                source={stream}
              />
              <Text style={classes.title} >Welcome to 9stream</Text>
            </View>
            <View style={classes.form}>
              <RegisterForm 
                navigation={this.props.navigation} 
                sendError={this.sendError.bind(this)}
              />
            </View>
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
          // duration={this.state.duration}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
        >
          {this.state.text}
        </Snackbar>
      </ImageBackground>
    );
  }
}

export default Register;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3498db',
  },
  logoCont: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 15
  },
  logo: {
    width: 245,
    height: 150,
  },
  back: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  },
  title: {
    color: 'white',
    marginTop: 10,
    // width: 140,
    textAlign: 'center',
    opacity: 0.9,
    padding: 5,
    letterSpacing: 3
  }
})