import React, { Component } from 'react';
import {
  Container, Spinner
} from 'native-base';
import { Snackbar } from 'react-native-paper';
import logo from '../../assets/streams.png';
import { StyleSheet, Image, ImageBackground, AsyncStorage, NetInfo, Dimensions, View, Text } from 'react-native';
import { Post } from '../../components/reuse/post'
import { Get } from '../../components/reuse/get'
import { getUserObject } from "../../store/actions/user";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');


class Home extends Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      user: '',
      text: '',
      visible: '',
      isConnected: true,
      user: {},
      userRaw: {}
    };
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
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  onLoad = async () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    try {
      const value = await AsyncStorage.getItem('user');
      const userRaw = await AsyncStorage.getItem('user_raw');
      console.log("LITTY", JSON.parse(value));
      console.log("raw", JSON.parse(userRaw));
      this.setState({
        user: JSON.parse(value) === null ,
        userRaw: JSON.parse(userRaw)
      })

      // console.log(isConnected);
      if (this.state.isConnected) {
        // user has internet connection
        if (typeof JSON.parse(value) !== 'null') {
          // get app version
          this.props.getUserObject(JSON.parse(value) !== null ? JSON.parse(value): {})
          Get('/mobile_config/get_app_version').then(res => {
            console.log('MOBILE', res);
            
            if (!res.error) {
              if (res.content.app_version_required === "1.0.0") {
                // user has not logged in before
                Post('/user/login_device', JSON.parse(userRaw)).then(res => {
                  // console.log("NEW DATA", res);
                  if (!res.error) {
                    // SplashScreen.hide();
                    this.storeItem('user', res.content);
                    this.props.navigation.navigate('Dashboard');
                  } else {
                    // SplashScreen.hide();
                    this.props.navigation.navigate('Login');
                  }
                })
              } else {
                this.setState({
                  text: "There is a new update. Please the app store to update your app",
                  visible: true,
                  // isConnected: false
                })
              }
            }
          })
        } else {
          // user already logged in
          this.props.navigation.navigate('Login');
        }
      } else {
        // no internet connection
        this.setState({
          text: "No Internet Connection",
          visible: true,
          isConnected: false
        })
      }

    } catch (error) {
      this.setState({
        text: "Something Went Wrong",
        visible: true,
      })
    }

  }


  componentDidMount() {
    this.onLoad();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isConnected !== this.state.isConnected && this.state.isConnected) {
      // user has internet connection
      // console.log("here");

      if (typeof this.state.user !== null) {
        this.props.getUserObject(this.state.user)
        // user has not logged in before
        Post('/user/login_device', this.state.userRaw).then(res => {
          // console.log("NEW DATA", res);
          if (res.error === false) {
            this.storeItem('user', res.content);
            this.props.navigation.navigate('Dashboard');
          } else {
            this.props.navigation.navigate('Login');
          }
        })
      } else {
        // user already logged in
        this.props.navigation.navigate('Login');
      }
    }
  }

  render() {
    console.log(this.state);

    return (
      <Container style={styles.root} >
        {/* <ImageBackground source={logo} style={styles.back} > */}
          {
            !this.state.isConnected ?
              <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
              </View>
              :
              <Spinner
                color='orange'
                style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}
              />
          }
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
        {/* </ImageBackground> */}
      </Container>
    );
  }
}

// 
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserObject: getUserObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "black",
    // flex: 1,
  },
  back: {
    // resizeMode: 'cover',
    flex: 1,
    // justifyContent: 'center',
    // width: 300,
    // height: 200,
    position: 'relative'
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
