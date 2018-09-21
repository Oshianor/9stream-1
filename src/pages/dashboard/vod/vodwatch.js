import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import Video, { Container } from 'react-native-af-video-player';
import gone from '../../../assets/aqua.jpg';
import { Spinner, Fab, Icon, Button, Thumbnail, Header, Body, Right, Left } from "native-base";
import { Get } from '../../../components/reuse/get';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


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
      videoLoading: true,
      refreshing: false
    }
  }

  // loading video details and comment with likes count
  componentDidMount() {
    let videoId = this.props.navigation.state.params.item.id;
    // console.log(videoId);

    // let userId = this.props.navigation.state.params.user.id;
    Get('/api/getlatestliveshow/' + videoId + "/1").then((res) => {
      this.setState({
        video: res.data,
      })
      let self = this;
      Get('/api/getcommentforvideo/' + videoId).then((reslate) => {
        // console.log('comment', reslate);

        self.setState({
          comments: reslate, videoLoading: false,
        })
      })

    })
  }

  // make avideo fullscreen
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
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
        <Container>
          <Video
            autoPlay
            ref={(ref) => { this.video = ref }}
            title={this.props.navigation.state.params.item.title}
            url={this.state.video.highQuality}
            logo={this.props.navigation.state.params.item.img}
            placeholder={this.state.video.img}
            theme={theme}
            // onMorePress={() => this.onMorePress()}
            onFullScreen={status => this.onFullScreen(status)}
            fullScreenOnly
            rotateToFullScreen
          />
        </Container>
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
  elev: {
    backgroundColor: 'orange',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  input: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    zIndex: 900000,
    elevation: 100000
  },
  topMargin: {
    backgroundColor: "white",
    zIndex: -1
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 15,
    // color: "#555"
    color: 'black'
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  timeStamp: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetReply: {
    flex: 1,
    // borderColor: 'red', borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0
  }
});
