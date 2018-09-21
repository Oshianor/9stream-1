import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Text, Dimensions, NetInfo, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import stream from "../../assets/stream.png";
import back from "../../assets/wall.png";
import { Input, Icon, Item } from 'native-base';
import { Post } from '../../components/reuse/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar, Button } from "react-native-paper";
import { setUserId, getUserObject } from '../../store/actions/user';
import { Kohana } from 'react-native-textinput-effects';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

class Verify extends Component {
  static navigationOptions = {
    header: Platform.OS === 'android' && null,
    // headerMode: 'float',
    title: 'Verify Email',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#f48221'
    },
    headerBackTitleStyle: {
      color: 'white'
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      resend: false,
      otp: '',
      text: '',
      loading: false,
      isConnected: true
    }
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem(key, JSON.stringify(item));
      // return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }


  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({
        isConnected
      });
    } else {
      this.setState({
        isConnected,
        loading: false
      });
    }
  };

  onLoad = async () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }


  componentDidMount() {
    this.onLoad();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }


  handleVerify = () => {
    this.setState({
      loading: true
    })
    let emailer = this.props.navigation.state.params.email.toLowerCase();
    let obj = {
      email: emailer,
      activation_code: this.state.otp
    }

    let load = {
      username: this.props.navigation.state.params.email.toLowerCase(),
      password: this.props.navigation.state.params.password,
      device_id: DeviceInfo.getUniqueID(),
      device_name: DeviceInfo.getModel()
    }

    console.log("user_raw verify", load);

    Post('/user/activate_account', obj).then((resp) => {
      if (resp.error == false) {
        Post('/user/login_device', load).then(res => {
          console.log("VERIFY LOGIN", res);
          if (!res.error) {
            this.storeItem('user', res.content);
            this.props.getUserObject(res.content);
            this.setState({
              loading: false
            })
            this.props.navigation.navigate('Dashboard');
          } else {
            setTimeout(() => {
              this.props.navigation.navigate('Login', {
                email: email
              })
            }, 2000);
            this.setState({
              text: res.message,
              visible: true,
              password: '',
              loading: false
            })
          }
        })
      } else {
        this.setState({ text: resp.message, visible: true });
      } // if (res.error == false) {
    }) // Post('/user/activate_account', obj).then((res) => {
  } // handleVerify = () => {

  handleResend = () => {
    this.setState({
      resend: true
    })
    let obj = {
      username: this.props.navigation.state.params.email
    }
    Post('/user/send_activation_code', obj).then((res) => {
      if (res.error === false) {
        this.setState({ text: "A ten digit code as been sent to you email", visible: true, resend: false });
      }
    })
  }

  render() {
    console.log(this.state);

    let stan = {
      color: this.state.resend ? 'gray' : 'orange'
    }
    return (
      <ImageBackground source={back} style={classes.back} >
        {
        !this.state.isConnected &&
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
          </View>
        }
        <ScrollView>
          <View style={classes.container}>
            <View style={classes.logoCont}>
              <Image
                style={classes.logo}
                source={stream}
              />
              <Text style={classes.title} >Verify Your Phone Number</Text>
            </View>
            <View style={classes.form}>
              <TouchableOpacity style={{ marginVertical: 5 }} onPress={this.handleOtpResend} >
                <Text style={stan}>Resend Code</Text>
              </TouchableOpacity>
              <Kohana
                style={classes.input}
                label={'Verification code'}
                iconClass={Ionicons}
                value={this.state.otp}
                onChangeText={(otp) => this.setState({ otp })}
                iconName={'ios-code-working'}
                iconColor={'#f4d29a'}
                labelStyle={{
                  color: 'white',
                  fontWeight: '400',
                  fontSize: 15,
                  marginTop: Platform.OS === 'ios' ? 4 : -2
                }}
                inputStyle={{ color: 'white', fontSize: 15 }}
                useNativeDriver
              />
              <Button mode="contained" loading={this.state.loading} style={classes.button} onPress={this.handleVerify} >
                VERIFY ACCOUNT
                </Button>
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

// export default Verify;
function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getUserObject: getUserObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Verify);


const classes = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3498db',
  },
  input: {
    height: 50,
    // backgroundColor: 'rgba(255,255,255,0.2)',
    // width: 350,
    backgroundColor: 'gray',
    // marginBottom: 10,
    // color: 'white',
    // paddingVertical: 10
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
  },
  form: {
    marginTop: 25
  },
  button: {
    backgroundColor: '#f48221',
    paddingVertical: 5,
    marginTop: 12
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: {
    color: '#fff'
  }
})
