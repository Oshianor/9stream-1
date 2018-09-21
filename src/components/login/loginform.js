import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, NetInfo, TouchableOpacity, Text } from 'react-native';
import validator from 'validator';
import { AsyncStorage } from "react-native";
import { Snackbar, Button } from 'react-native-paper';
import { Post } from '../reuse/post';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, getUserObject } from '../../store/actions/user';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
const { width } = Dimensions.get('window');


class Loginform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: '',
      user: {},
      loading: false,
      isConnected: true, // to check if user connected
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

  handleLogin = () => {
    this.setState({
      loading: true
    })
    const { email, password } = this.state;
    // validated email
    let obj = {
      username: email,
      password: password,
      device_id: DeviceInfo.getUniqueID(),
      device_name: DeviceInfo.getModel()
    }

    this.storeItem('user_raw', obj);

    let emailer = email.toLowerCase();
    emailer = emailer.replace(/ /g, "");

    if (validator.isEmail(emailer)) {
      // validate passowrd
      if (validator.isLength(password, { min: 5, max: 20 })) {
        Post('/user/login_device', obj).then(res => {
          console.log('login', res);
          if (!res.error) {
            this.props.navigation.navigate('Dashboard');
            this.storeItem('user', res.content);
            this.props.getUserObject(res.content);
            this.setState({
              loading: false
            })
          } else {
            this.props.sendError(res.message, true);
            // if the user account is not activated
            console.log('login  failed', res);
            if(res.message != "The username or password is wrong. Please check your credentials.") {
                this.props.navigation.navigate('Verify', {
                  email: email,
                  password: password
                })  
            } // if(res.message != "The username or password is wrong. Please check your c
            this.setState({
              password: '',
              loading: false
            })
          }
        })
      } else {
        this.props.sendError("Password length must have a min of 5 and max of 20", true);
        this.setState({
          password: '',
          loading: false
        })
      }
    } else {
      this.props.sendError("Email provided is invalid. Check your email", true)
      this.setState({
        loading: false
      })
    }
  }

  displayEmail = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Email'}
        iconClass={MaterialsIcon}
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        iconName={'email'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white', fontSize: 15 }}
        useNativeDriver
      />
    )
  }
  password = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Password'}
        iconClass={MaterialsIcon}
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        iconName={'lock'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        secureTextEntry
        useNativeDriver
      />
    )
  }

  render() {
    return (
      <View style={classes.container}>
        {
          !this.state.isConnected &&
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        }
        {this.displayEmail()}
        {this.password()}
        <Button mode="contained" loading={this.state.loading} style={classes.button} onPress={this.handleLogin} >
          LOGIN
        </Button>

        <TouchableOpacity style={classes.buttonReg} onPress={() => this.props.navigation.navigate('Register')}  >
          <Text style={classes.buttonTextReg}> CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Loginforms = withNavigation(Loginform);
function mapStateToProps(state) {
  return {
    data: state.route,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getUserObject: getUserObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Loginforms);

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
    width: (width - 80),
  },
  input: {
    height: Platform.OS === 'android' ? 40 : 52,
    // backgroundColor: 'rgba(255,255,255,0.2)',
    // width: 350,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: 'white',
    // paddingVertical: Platform.OS === 'android' ? 40 : -20,
  },
  button: {
    backgroundColor: '#f48221',
    paddingVertical: 5
  },
  buttonReg: {
    marginTop: 20,
    // backgroundColor: 'black',
    paddingVertical: 5
  },
  buttonText: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonTextReg: {
    textAlign: 'center',
    color: "white",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
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