import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text, ImageBackground, ScrollView } from 'react-native';
import stream from "../../assets/stream.png";
import LoginForm from "../../components/login/loginform";
import back from "../../assets/wall.png";
import { Snackbar } from 'react-native-paper';

class Login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn: false,
      text: '',
      visible: false
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
              <LoginForm 
                navigation={this.props.navigation} 
                sendError={this.sendError.bind(this)} 
              />
            </View>
          </View>
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
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
export default Login;

const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3498db',
  },
  logoCont: {
    alignItems: 'center',
    marginTop: 40,
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 245,
    height: 150
  },
  title: {
    color: 'white',
    marginTop: 10,
    // width: 140,
    textAlign: 'center',
    opacity: 0.9,
    padding: 5,
    letterSpacing: 3
  },
  back: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black"
  }
})