import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, NetInfo, TouchableOpacity, FlatList } from 'react-native';
import { Spinner } from "native-base";
import Video from "../../../components/dashboard/live/components/Video";
import { 
  setCurrentCommentId, 
  voting,
  passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Snackbar } from 'react-native-paper';
import { Get } from '../../../components/reuse/get';
import { Post } from "../../../components/reuse/post";
import { Icon } from 'native-base';
import Comment from '../../../components/dashboard/live/comment';
import WriteComment from '../../../components/dashboard/live/writecomment';
import * as Animatable from 'react-native-animatable';
import Voting from '../../../components/dashboard/live/voting';

class LiveShow extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    // const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    // const header = state.params && (state.params.text ? undefined : null)
    // const tabBarVisible = state.params ? state.params.text : false
    return {
      // For stack navigators, you can hide the header bar like so
      header: null,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      video: null,
      height: 0,
      loading: true,
      vid: null,
      img: null,
      icon: "play",
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
      this.setState({ isConnected, text: "No Internet Connection", visible: true });
    } else {
      this.setState({ isConnected });
    }
  };

  // make avideo fullscreen
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: status
    })
  }

  // loading up the live show content
  onLoad = async (profile) => {
    try {
      const live = await AsyncStorage.getItem('live');
      if (typeof JSON.parse(live) !== 'null') {

        this.setState({
          video: JSON.parse(live),
          loading: false
        })
      }
    } catch (error) {
      this.setState({
        text: "Something Went Wrong",
        visible: true,
      })
    }
  }

  initialLoad = () => {
    this.setState({
      loading: true
    })
    let obj = {
      token: this.props.user.user.token
    }
    // we get the user details
    Post("/user/get_self_id", obj).then(resp => {
      // check if there wer errors
      console.log("get by user id", typeof resp.content.profile.subscriptionPlan !== "null");
      
      if (!resp.error) {
        // check if the user is subscribed
        if (typeof resp.content.profile.subscriptionPlan !== "null") {
          // if the user is subcribed then we get the live stream
          Get("/live/list_channels").then(res => {
            // cehck if there wer errors
            if (!res.error) {
              // no errors
              res.content.entries[0].media.content.forEach(live => {
                if (typeof live.HLSStream !== "undefined") {
                  // get the video url of the stream 
                  this.setState({
                    vid: live.HLSStream 
                  })
                }
                if (typeof live.ChannelLogoSmartphones !== "undefined") {
                  // get thye image url 
                  this.setState({
                    img: live.ChannelLogoSmartphones 
                  })
                }
              })
              this.setState({
                video: res.content.entries[0],
                loading: false
              })
            } else {
              // if there was an error in getting the channels
              this.setState({
                loading: false,
                icon: "refresh"
              })
            }
          })
        } else {
          // if there was an error in getting the channels
          this.setState({
            text: "Subscribe to get access to the swap show",
            visible: true,
            loading: false,
            icon: "play"
          })
        }
      } else {
        this.setState({
          text: "Something Went Wrong",
          visible: true,
          loading: false
        })
      }
    })
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this.initialLoad(); 
  }

  render() {
    const theme = {
      title: '#FFF',
      more: '#446984',
      center: '#7B8F99',
      fullscreen: '#446984',
      volume: '#A5957B',
      scrubberThumb: '#234458',
      scrubberBar: '#DBD5C7',
      seconds: '#DBD5C7',
      duration: '#DBD5C7',
      progress: '#446984',
      loading: '#DBD5C7'
    }
    // console.log(this.state);

    return (
      <View style={styles.container}>
        {
          this.state.loading ?
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="white" />
            </View>
            :
            <View style={{ flex: 1 }} >
              {
                this.state.video == null ?
                <TouchableOpacity onPress={this.initialLoad} >
                  <ImageBackground
                    source={{ uri: this.state.img }}
                    style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Icon
                      name={"ios-" + this.state.icon}
                      style={{
                        fontSize: 70, justifyContent: 'center',
                        color: 'gray'
                      }}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                  
                :
                <Video
                  autoPlay
                  ref={(ref) => { this.video = ref }}
                  title={this.state.video.title}
                  url={this.state.vid}
                  logo={this.state.img}
                  theme={theme}
                  onFullScreen={status => this.onFullScreen(status)}
                  rotateToFullScreen
                />
              }
          </View>
        }
        <View style={{ flex: 1, backgroundColor: "white", marginTop: -140 }} >
          <Comment />
          <WriteComment />
        {
          this.props.community.votingToggle &&
            // <Animatable.View animation={this.props.community.votingToggle ? "fadeIn" : "fadeOut"} duration={2000}>
              <Button 
                onPress={() => this.props.voting(true)}
                mode="contained" 
                style={{ borderRadius: 0, position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "red" }}  
              >
                VOTE
              </Button>
            // </Animatable.View>
        }
        </View>
        <Voting 
          userId={this.props.user.user._id} 
        />
        <Snackbar
          visible={this.state.visible}
          duration={9000000}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
        >
          {this.state.text}
        </Snackbar>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentCommentId: setCurrentCommentId,
    voting: voting,
    passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveShow);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black'
  },
});
