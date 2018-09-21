import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { Spinner, Header, Body } from "native-base";
import Video, { Container } from 'react-native-af-video-player';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { Get } from '../../../components/reuse/get';
import { Post } from "../../../components/reuse/post";

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
      video: {},
      height: 0,
      loading: true,
      refreshing: false,
      vid: null,
      img: null
    }
  }
  
  // make avideo fullscreen
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: status
    })
  }

  componentDidMount(){
    let obj = {
      token: this.props.user.user.token
    }
    Get("/live/list_channels").then(res => {
      if(!res.error) {
        Post("/user/get_self_id", obj).then(resp => {
          if (!resp.error) {
            if (resp.subscriptionPlan !== null) {
              this.setState({
                video: res.content.entries[0],
                
              })
            }
          }
        })
      }
    })
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
          <Container>
            <Video
              autoPlay
              ref={(ref) => { this.video = ref }}
              title={this.props.navigation.state.params.item.title}
              url={this.state.vid}
              logo={this.state.img}
              placeholder={this.state.img}
              theme={theme}
              // onMorePress={() => this.onMorePress()}
              onFullScreen={status => this.onFullScreen(status)}
              fullScreenOnly
              rotateToFullScreen
            />
            <View style={{ flex: 1 }} >

            </View>
          </Container>
        }
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
    passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveShow);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});





// import React, { Component } from 'react';
// import Video from "../../../components/dashboard/live/components/Video";
// import swap from "../../../assets/9stream.png"

// export default class Liveshow extends Component {
//   // static navigationOptions = {
//   //   header: null
//   // }

//   static navigationOptions = ({ navigation }) => {
//     const { state } = navigation
//     // Setup the header and tabBarVisible status
//     // const header = state.params && (state.params.fullscreen ? undefined : null)
//     const tabBarVisible = state.params ? state.params.fullscreen : true
//     // const header = state.params && (state.params.text ? undefined : null)
//     // const tabBarVisible = state.params ? state.params.text : false
//     return {
//       // For stack navigators, you can hide the header bar like so
//       header: null,
//       // For the tab navigators, you can hide the tab bar like so
//       tabBarVisible: false,
//     }
//   }
  
//   render() {
//     return (
//       <Video
//         title="more"
//         placeholder={
//           "https://img.grepmed.com/uploads/1936/interpretation-endtidalco2-capnography-waveforms-diagnosis-original.jpeg"
//         }
//         logo={
//           "https://img.grepmed.com/uploads/1936/interpretation-endtidalco2-capnography-waveforms-diagnosis-original.jpeg"
//         }
//         ref={(ref) => { this.video = ref }}
//         url={"https://uvodscp-lh.akamaihd.net/i/rjrretvdirect_1@506691/master.m3u8"}
//         rotateToFullScreen
//       />
//     )
//   }
// }
