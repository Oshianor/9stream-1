// import React, { Component } from 'react'
// import { StyleSheet, View, Text, AppState,
//   TouchableOpacity
//  } from 'react-native';
// // import Video, { Container } from 'react-native-af-video-player';
// import Video from 'react-native-video';
// import { Get } from '../../../components/reuse/get';
// import { getlive, getliveposter, getlivevideo } from "../../../store/actions/data";
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// class Liveshowslist extends Component {
//   static navigationOptions = {
//     headerTitle: "The Swap Live",
//     headerStyle: {
//       backgroundColor: "#f48221",
//       height: 40
//     },
//     headerTitleStyle: {
//       color: "black"
//     }
//   }
  
//   state = {
//     rate: 1,
//     volume: 1,
//     muted: false,
//     resizeMode: 'contain',
//     duration: 0.0,
//     currentTime: 0.0,
//     paused: true,
//     count: "",
//     appState: AppState.currentState
//   };
  

//   video: Video;

//   onLoad = (data) => {
//     this.setState({ duration: data.duration });
//   };

//   componentWillUnmount() {
//     AppState.removeEventListener('change', this._handleAppStateChange);
//   }

//   _handleAppStateChange = (nextAppState) => {
//     if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
//       console.log('App has come to the foreground!')
//     }
//     this.setState({appState: nextAppState});
//   }

//   onProgress = (data) => {
//     this.setState({ currentTime: data.currentTime });
//   };

//   onEnd = () => {
//     this.setState({ paused: true });
//     this.video.seek(0);
//   };

//   onAudioBecomingNoisy = () => {
//     this.setState({ paused: true })
//   };

//   onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
//     console.log(event);
    
//     this.setState({ paused: !event.hasAudioFocus })
//   };

//   getCurrentTimePercentage() {
//     if (this.state.currentTime > 0) {
//       return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
//     }
//     return 0;
//   };

//   renderRateControl(rate) {
//     const isSelected = (this.state.rate === rate);

//     return (
//       <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
//         <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
//           {rate}x
//         </Text>
//       </TouchableOpacity>
//     );
//   }

//   renderResizeModeControl(resizeMode) {
//     const isSelected = (this.state.resizeMode === resizeMode);

//     return (
//       <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
//         <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
//           {resizeMode}
//         </Text>
//       </TouchableOpacity>
//     )
//   }

//   renderVolumeControl(volume) {
//     const isSelected = (this.state.volume === volume);

//     return (
//       <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
//         <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
//           {volume * 100}%
//         </Text>
//       </TouchableOpacity>
//     )
//   }

//   render() {
//     // const flexCompleted = this.getCurrentTimePercentage() * 100;
//     // const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
//     console.log(this.state);
//     // console.log(this.props.navigation.state);
    
//     const data = this.props.data;
//     return (
//       <View style={styles.container}>
//         <View style={styles.fullScreen} >
//           <Video
//             ref={(ref: Video) => { this.video = ref }}
//             source={{ uri: "https://uvodscp-lh.akamaihd.net/i/rjrretvdirect_1@506691/master.m3u8" }}
//             style={styles.fullScreen}
//             rate={this.state.rate}
//             paused={this.state.paused}
//             volume={this.state.volume}
//             muted={this.state.muted}
//             resizeMode={this.state.resizeMode}
//             onLoad={this.onLoad}
//             onProgress={this.onProgress}
//             onEnd={this.onEnd}
//             onAudioBecomingNoisy={this.onAudioBecomingNoisy}
//             onAudioFocusChanged={this.onAudioFocusChanged}
//             repeat={false}
//           />
//         </View>
//         <View style={styles.controls}>
//           <View style={styles.generalControls}>
//             <View style={styles.resizeModeControl}>
//               {this.renderResizeModeControl('cover')}
//               {this.renderResizeModeControl('contain')}
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }
// }

// function mapStateToProps(state) {
//   return {
//     data: state.data
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     getlive: getlive,
//     getliveposter: getliveposter,
//     getlivevideo: getlivevideo
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Liveshowslist);


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   fullScreen: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   controls: {
//     backgroundColor: 'transparent',
//     borderRadius: 5,
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//   },
//   progress: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   innerProgressCompleted: {
//     height: 20,
//     backgroundColor: '#cccccc',
//   },
//   innerProgressRemaining: {
//     height: 20,
//     backgroundColor: '#2C2C2C',
//   },
//   generalControls: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 4,
//     overflow: 'hidden',
//     paddingBottom: 10,
//   },
//   rateControl: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   volumeControl: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   resizeModeControl: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   controlOption: {
//     alignSelf: 'center',
//     fontSize: 11,
//     color: 'white',
//     paddingLeft: 2,
//     paddingRight: 2,
//     lineHeight: 12,
//   },
// });


// {/* <View style={styles.rateControl}>
//               {this.renderRateControl(0.25)}
//               {this.renderRateControl(0.5)}
//               {this.renderRateControl(1.0)}
//               {this.renderRateControl(1.5)}
//               {this.renderRateControl(2.0)}
//             </View>

//             <View style={styles.volumeControl}>
//               {this.renderVolumeControl(0.5)}
//               {this.renderVolumeControl(1)}
//               {this.renderVolumeControl(1.5)}
//             </View> */}


//           {/* <View style={styles.trackingControls}>
//             <View style={styles.progress}>
//               <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
//               <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
//             </View>
//           </View> */}


//             // handleCheckScreenStatus = (args) => {
//   //   console.log("GG______", args);
    
//   //   if (!this.props.navigation.isFocused) {
//   //     this.setState({
//   //       paused: true
//   //     })
//   //   }
//   // }
  
//   // componentDidMount = () => {
//   //   console.log("ASSS");
    
//   //   this.video.addEventListener("checkScreenStatus", this.handleCheckScreenStatus)
//   // }

//   // componentWillUnmount() {
//   //   console.log("ASSSerwwwwww");
//   //   this.video.removeEventListener('checkScreenStatus', this.handleCheckScreenStatus);
//   // }










































































































































// // import React, { Component } from 'react';
// // import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
// // import Video, { Container } from 'react-native-af-video-player';
// // import gone from '../../../assets/aqua.jpg';
// // import { Spinner, Fab, Icon, Button, Thumbnail, Header, Body, Right, Left} from "native-base";
// // import { Get } from '../../../components/reuse/get';
// // import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
// // import { bindActionCreators } from 'redux';
// // import { connect } from 'react-redux';
// // // import Userfullname from '../../../components/reuse/userfullname';
// // import Comment from '../../../components/dashboard/live/comment';
// // import Reply from '../../../components/dashboard/live/reply';


// // class LiveShow extends Component {
// //   static navigationOptions = ({ navigation }) => {
// //     const { state } = navigation
// //     // Setup the header and tabBarVisible status
// //     // const header = state.params && (state.params.fullscreen ? undefined : null)
// //     const tabBarVisible = state.params ? state.params.fullscreen : true
// //     // const header = state.params && (state.params.text ? undefined : null)
// //     // const tabBarVisible = state.params ? state.params.text : false
// //     return {
// //       // For stack navigators, you can hide the header bar like so
// //       header: null,
// //       // For the tab navigators, you can hide the tab bar like so
// //       tabBarVisible,
// //     }
// //   }

// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       // commentLoading: true,
// //       comments: [],
// //       text: '',
// //       video: {},
// //       height: 0,
// //       videoLoading: true,
// //       refreshing: false,

// //       // the reply data gotten from the database
// //       reply: [],
// //       replyLoading: false,
// //       // the comment id to query for the reply
// //       commentId: '',
// //       // the data passed
// //       commentReply: null
// //     }
// //   }

// //   componentWillMount(){
// //     this.props.navigation.setParams({
// //       tab: false
// //     })
// //   }

// //   // loading video details and comment with likes count
// //   // componentDidMount() {
// //   //   let videoId = this.props.navigation.state.params.item.id;
// //   //   console.log(videoId);
    
// //   //   // let userId = this.props.navigation.state.params.user.id;
// //   //   Get('/api/getlatestliveshow/' + videoId + "/1").then((res) => {
// //   //     this.setState({
// //   //       video: res.data, 
// //   //     })
// //   //     let self = this;
// //   //     Get('/api/getcommentforvideo/' + videoId).then((reslate) => {
// //   //       console.log('comment', reslate);

// //   //       self.setState({
// //   //         comments: reslate, videoLoading: false,
// //   //       })
// //   //     })
      
// //   //   })

    
// //   // }

// //   // refresh call 
// // //   _onRefresh = () => {
// // //     let videoId = this.props.navigation.state.params.item.id;
// // //     this.setState({ refreshing: true });
// // //     Get('/api/getcommentforvideo/' + videoId).then((reslate) => {
// // //       this.setState({
// // //         comments: reslate, refreshing: false,
// // //       })
// // //     })
// // //   }

  
// // // // make avideo fullscreen
// // //   onFullScreen(status) {
// // //     // Set the params to pass in fullscreen status to navigationOptions
// // //     this.props.navigation.setParams({
// // //       fullscreen: !status
// // //     })
// // //   }

// // //   // write a comment button
// // //   displayFab = () => {
// // //     return (
// // //       <Fab
// // //         direction="up"
// // //         containerStyle={{ backgroundColor: 'transparent' }}
// // //         style={styles.elev}
// // //         position="bottomRight"
// // //         onPress={this.openModal}
// // //       >
// // //         <Icon name="ios-create" />
// // //       </Fab>
// // //     )
// // //   }

// // //   // navigate to post comment
// // //   openModal(){
// // //     if (this.props.community.commentId === '') {
// // //       this.props.navigation.navigate('Input', { reply: false });
// // //     } else {
// // //       this.props.navigation.navigate('Input', { reply: true });
// // //     }
// // //   }

// //   render() {
// //     const theme = {
// //       title: '#FFF',
// //       more: '#446984',
// //       center: '#7B8F99',
// //       fullscreen: '#446984',
// //       volume: '#A5957B',
// //       scrubberThumb: '#234458',
// //       scrubberBar: '#DBD5C7',
// //       seconds: '#DBD5C7',
// //       duration: '#DBD5C7',
// //       progress: '#446984',
// //       loading: '#DBD5C7'
// //     }

// //     return (
// //       <View style={styles.container}>
// //       <Text>GHJKL:</Text>
// //         {/* <Container>
// //           <Video
// //             // autoPlay
// //             ref={(ref) => { this.video = ref }}
// //             title={this.props.navigation.state.params.item.title}
// //             url={this.state.video.highQuality}
// //             logo={this.props.navigation.state.params.item.img}
// //             placeholder={this.state.video.img}
// //             theme={theme}
// //             // onMorePress={() => this.onMorePress()}
// //             onFullScreen={status => this.onFullScreen(status)}
// //             // fullScreenOnly
// //             rotateToFullScreen
// //           />
// //         </Container>
// //         {
// //           this.props.community.commentId !== '' ?
// //             <Reply />
// //           :
// //             <FlatList
// //               data={this.state.comments}
// //               refreshControl={
// //                 <RefreshControl
// //                   refreshing={this.state.refreshing}
// //                   onRefresh={this._onRefresh}
// //                   progressBackgroundColor="black"
// //                   enabled={true}
// //                   colors={['white']}
// //                 />
// //               }
// //               keyExtractor={(item, index) => item + index}
// //               renderItem={({ item }) => (
// //                 <Comment item={item} />
// //               )}
// //             />
// //         }
// //         {this.displayFab()} */}
// //       </View>
// //     )
// //   }
// // }


// // function mapStateToProps(state) {
// //   return {
// //     route: state.route,
// //     community: state.community,
// //     user: state.user
// //   }
// // }
// // function mapDispatchToProps(dispatch) {
// //   return bindActionCreators({
// //     setCurrentCommentId: setCurrentCommentId,
// //     passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
// //   }, dispatch)
// // }

// // export default connect(mapStateToProps, mapDispatchToProps)(LiveShow);



// // const styles = StyleSheet.create({
// //   elev: {
// //     backgroundColor: 'orange',
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.8,
// //         shadowRadius: 2,
// //       },
// //       android: {
// //         elevation: 10,
// //       },
// //     }),
// //   },
// //   container: {
// //     flex: 1,
// //   },
// //   commentInput: {
// //     // height: 200
// //   },
// //   input: {
// //     flex: 1,
// //     width: '100%',
// //     // backgroundColor: 'white',
// //     // color: 'black',
// //     paddingHorizontal: 10,
// //     paddingLeft: 15,
// //     paddingRight: 15,
// //     borderLeftWidth: 1,
// //     borderRightWidth: 1,
// //     borderTopWidth: 1,
// //     borderBottomWidth: 1,
// //     borderColor: 'gray',
// //     borderRadius: 12,
// //     zIndex: 900000,
// //     elevation: 100000
// //   },
// //   // elev: {
// //   //   backgroundColor: 'orange'
// //   // },
// //   topMargin: {
// //     // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
// //     backgroundColor: "white",
// //     zIndex: -1
// //   },
// //   content: {
// //     padding: 10,
// //     backgroundColor: "white"
// //   },
// //   heading: {
// //     fontSize: 32,
// //     fontWeight: "400",
// //     marginBottom: 30
// //   },
// //   tweet: {
// //     paddingTop: 20,
// //     paddingBottom: 5,
// //     paddingLeft: 10,
// //     paddingRight: 10,
// //     borderBottomColor: "#bbb",
// //     borderBottomWidth: StyleSheet.hairlineWidth,
// //     flexDirection: "column"
// //   },
// //   tweetText: {
// //     marginTop: 10,
// //     fontSize: 15,
// //     // color: "#555"
// //     color: 'black'
// //   },
// //   tweetFooter: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     padding: 0
// //   },
// //   badgeCount: {
// //     fontSize: 12,
// //     paddingLeft: 5
// //   },
// //   footerIcons: {
// //     flexDirection: "row",
// //     alignItems: "center"
// //   },
// //   tweetHead: {
// //     flexDirection: "row",
// //     justifyContent: "flex-start",
// //     alignItems: "center",
// //     padding: 10,
// //     paddingBottom: 0
// //   },
// //   timeStamp: {
// //     flexDirection: "row",
// //     justifyContent: "flex-start",
// //     padding: 10,
// //     borderBottomColor: "#CCC",
// //     borderBottomWidth: StyleSheet.hairlineWidth
// //   },
// //   tweetFooter: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     borderBottomColor: "#CCC",
// //     borderBottomWidth: StyleSheet.hairlineWidth
// //   },
// //   footerIcons: {
// //     flexDirection: "row",
// //     alignItems: "center"
// //   },
// //   tweetReply: {
// //     flex: 1,
// //     // borderColor: 'red', borderWidth: 1,
// //     flexDirection: "row",
// //     justifyContent: "flex-start",
// //     alignItems: "flex-start",
// //     padding: 10,
// //     paddingBottom: 0
// //   }
// // });













// {/* <Button transparent dark>
//                 <Icon
//                   name="ios-heart-outline"
//                   style={{ fontSize: 20 }}
//                 />
//                 <Text style={{ fontSize: 14 }}>34</Text>
//               </Button> */}





// {/* <Button transparent dark>
//                 <Icon
//                   name="ios-text-outline"
//                   style={{ fontSize: 20 }}
//                 />
//                 <Text style={{ fontSize: 14 }}>12</Text>
//               </Button> */}





















// {/* <ScrollView>
//           {
//             this.displayCom()
//           }
//         </ScrollView> */}









// // hideAll = () => {
// //   this.props.navigation.setParams({
// //     text: true
// //   })
// // }


// // onMorePress() {
// //   Alert.alert(
// //     'Boom',
// //     'This is an action call!',
// //     [{ text: 'Aw yeah!' }]
// //   )
// // }










































//   // displayCom = () => {
//   //   return (
//   //     this.state.comments.map((com, index) => (
//   //       <View style={styles.tweetReply} key={index} >
//   //         <Thumbnail small source={gone} />
//   //         <View
//   //           style={{
//   //             justifyContent: "flex-start",
//   //             alignItems: "flex-start",
//   //             paddingLeft: 10,
//   //             paddingRight: 10,
//   //             width: "93%"
//   //           }}
//   //         >
//   //           <View style={{ flexDirection: "row", maxHeight: 22 }}>
//   //             {/* <Text style={{ fontWeight: "bold" }}>
//   //                   {item.user.name}
//   //                 </Text> */}
//   //             <Userfullname type="fullName" style={{ fontWeight: "bold" }} />
//   //             <Text
//   //               style={{ color: "#888", flex: 1, textAlign: 'right' }}
//   //             >
//   //               {com.created_at.toString()}
//   //             </Text>
//   //           </View>
//   //           <View
//   //             style={{
//   //               flexDirection: "row",
//   //               paddingTop: 5,
//   //               // maxHeight: 22
//   //             }}
//   //           >
//   //             <Text style={{ color: "black", flex: 1 }}>
//   //               {com.content}
//   //             </Text>
//   //           </View>
//   //           <View
//   //             style={StyleSheet.flatten([
//   //               styles.tweetFooter,
//   //               { width: "100%" }
//   //             ])}
//   //           >
//   //             <View style={styles.footerIcons}>
//   //               <Button transparent dark>
//   //                 <Icon
//   //                   name="ios-heart-outline"
//   //                   style={{ fontSize: 20 }}
//   //                 />
//   //                 <Text style={{ fontSize: 14 }}>34</Text>
//   //               </Button>
//   //             </View>

//   //             <View style={styles.footerIcons}>
//   //               <Button transparent dark>
//   //                 <Icon
//   //                   name="ios-text-outline"
//   //                   style={{ fontSize: 20 }}
//   //                 />
//   //                 <Text style={{ fontSize: 14 }}>12</Text>
//   //               </Button>
//   //             </View>

//   //           </View>
//   //         </View>
//   //       </View>
//   //     ))
//   //   )
//   // }





































// {/* <View style={styles.footerIcons}>
//                             <Button transparent dark>
//                               <Icon name="ios-repeat" style={{ fontSize: 20 }} />
//                               <Text style={{ fontSize: 14 }}>
//                                 23
//                           </Text>
//                             </Button>
//                           </View> */}

// {/* <View style={styles.footerIcons}>
//                             <Button transparent dark>
//                               <Icon
//                                 name="ios-mail-outline"
//                                 style={{ fontSize: 20 }}
//                               />
//                             </Button>
//                           </View> */}









































// // textOnly = () => {
//   //   return (

//   //   )
//   // }

//   // displayCommunity = ( ) => {
//   //   return (
//   //     <Content style={{ backgroundColor: "black" }}>
//   //       {this.state.commentLoading ? (
//   //         <View
//   //           contentContainerStyle={{
//   //             flex: 1,
//   //             alignItems: "center",
//   //             justifyContent: "center"
//   //           }}
//   //         >
//   //           <Spinner color="black" />
//   //         </View>
//   //       ) : (
//   //           <View style={{ justifyContent: "flex-start" }}>
//   //             <FlatList
//   //               data={this.props.comment}
//   //               keyExtractor={this._keyExtractor}
//   //               renderItem={({ item }) => (
//   //                 <View style={styles.tweetReply}>
//   //                   {/* <Thumbnail small source={{ uri: item.user.avatar }} /> */}
//   //                   <View
//   //                     style={{
//   //                       justifyContent: "flex-start",
//   //                       alignItems: "flex-start",
//   //                       paddingLeft: 10,
//   //                       paddingRight: 10,
//   //                       width: "93%"
//   //                     }}
//   //                   >
//   //                     {/* <View style={{ flexDirection: "row", maxHeight: 22 }}>
//   //                       <Text style={{ fontWeight: "bold" }}>
//   //                         {item.user.name}
//   //                       </Text>
//   //                       <Text
//   //                         style={{ color: "#888", flex: 1, paddingLeft: 5 }}
//   //                       >
//   //                         {"@" + item.user.username}
//   //                       </Text>
//   //                     </View> */}
//   //                     <View
//   //                       style={{
//   //                         flexDirection: "row",
//   //                         paddingTop: 5,
//   //                         maxHeight: 22
//   //                       }}
//   //                     >
//   //                       <Text style={{ color: "#888" }}>Replying to</Text>
//   //                       <Text style={{ color: "#4286f4", flex: 1 }}>
//   //                         {"@" + this.tweet.user.username}
//   //                       </Text>
//   //                     </View>
//   //                     <Text style={{ paddingTop: 5 }}>{item.content}</Text>
//   //                     <View
//   //                       style={StyleSheet.flatten([
//   //                         styles.tweetFooter,
//   //                         { width: "100%" }
//   //                       ])}
//   //                     >
//   //                       <View style={styles.footerIcons}>
//   //                         <Button transparent dark>
//   //                           <Icon
//   //                             name="ios-text-outline"
//   //                             style={{ fontSize: 20 }}
//   //                           />
//   //                           <Text style={{ fontSize: 14 }}>12</Text>
//   //                         </Button>
//   //                       </View>
//   //                       <View style={styles.footerIcons}>
//   //                         <Button transparent dark>
//   //                           <Icon name="ios-repeat" style={{ fontSize: 20 }} />
//   //                           <Text style={{ fontSize: 14 }}>
//   //                             23
//   //                           </Text>
//   //                         </Button>
//   //                       </View>
//   //                       <View style={styles.footerIcons}>
//   //                         <Button transparent dark>
//   //                           <Icon
//   //                             name="ios-heart-outline"
//   //                             style={{ fontSize: 20 }}
//   //                           />
//   //                           <Text style={{ fontSize: 14 }}>34</Text>
//   //                         </Button>
//   //                       </View>
//   //                       <View style={styles.footerIcons}>
//   //                         <Button transparent dark>
//   //                           <Icon
//   //                             name="ios-mail-outline"
//   //                             style={{ fontSize: 20 }}
//   //                           />
//   //                         </Button>
//   //                       </View>
//   //                     </View>
//   //                   </View>
//   //                 </View>
//   //               )}
//   //             />
//   //           </View>
//   //         )}
//   //     </Content>
//   //   );
//   // }


























































//         {/* <FlatList
//                   data={this.state.comment}
//                   keyExtractor={this._keyExtractor}
//                   renderItem={({ item }) => ( */}









//         {/*  )}
//                 /> */}




















































// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   commentInput: {
// //     // height: 200
// //   },
// //   input: {
// //     flex: 1,
// //     width: '100%',
// //     // backgroundColor: 'white',
// //     // color: 'black',
// //     paddingHorizontal: 10,
// //     paddingLeft: 15,
// //     paddingRight: 15,
// //     borderLeftWidth: 1,
// //     borderRightWidth: 1,
// //     borderTopWidth: 1,
// //     borderBottomWidth: 1,
// //     borderColor: 'gray',
// //     borderRadius: 12,
// //     zIndex: 900000,
// //     elevation: 100000
// //   },
// //   elev: {
// //     backgroundColor: 'orange'
// //   }
// // })


















// {/* <ScrollView>
//   <View>
//     <Text>EEEEEEEEEEEEEEE</Text>
//     <Text>EEEEEEEEEEEEEEE</Text>
//     <Text>EEEEEEEEEEEEEEE</Text>
//     <Text>EEEEEEEEEEEEEEE</Text>
//     <Text>EEEEEEEEEEEEEEE</Text>
//   </View> */}


//   {/* <View style={{ flex: 1 }} >
//             <TouchableOpacity onPress={() => this.props.navigation.navigate('LiveShowList')} >
//               <View style={{ flexDirection: 'row' }} >
//                 <Thumbnail large source={{ uri: item.img }} />
//                 <Text style={styles.liveName} >{item.name}</Text>
//               </View>
//             </TouchableOpacity>
//             <View style={{ flex: 1, paddingTop: 10 }}>
//               {
//                 item.summary.length > 150 ?
//                   this.state.more !== item.id ?
//                     <View style={{ flexDirection: "row" }}>
//                       <Text style={styles.summary}>
//                         {item.summary.substring(0, 1580)}
//                       </Text>
//                       <TouchableOpacity onPress={() => this.setState({ more: item.id })} >
//                         <Text style={{ color: 'orange' }} > ...see more</Text>
//                       </TouchableOpacity>
//                     </View>
//                     :
//                     <Text style={styles.summary}>{item.summary}</Text>
//                   :
//                   <Text style={styles.summary}>{item.summary}</Text>
//               }
//             </View>
//           </View> */}
//   {/* <Comment /> */}
// // </ScrollView>






















// {/* <KeyboardAvoidingView
//             style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
//             behavior="position"
//           >
//             <Grid>
//               <Col size={90}>
//                 <TextInput
//                   {...this.props}
//                   onTouchStart={this.hideAll}
//                   onSubmitEditing={this.handleComment}
//                   multiline={true}
//                   spellCheck={true}
//                   underlineColorAndroid='transparent'
//                   onChangeText={(text) => {
//                     this.setState({ text })
//                   }}
//                   onContentSizeChange={(event) => {
//                     this.setState({ height: event.nativeEvent.contentSize.height })
//                   }}
//                   style={[styles.input, { height: Math.max(35, this.state.height) }]}
//                   value={this.state.text}
//                 />
//               </Col>
//               <Col size={10}>
//                 <FAB
//                 style={{
//                   backgroundColor: orange400, position: 'absolute',
//                   bottom: 0 }}
//                   small
//                   icon="collections"
//                   onPress={() => { }}
//                 />
//               </Col>
//             </Grid>
//           </KeyboardAvoidingView> */}

































































// // import React, { Component } from 'react';
// // import { Image } from 'react-native';
// // import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
// // export default class CardShowcaseExample extends Component {
// //   render() {
// //     return (
// //       <Container>
// //         <Header />
// //         <Content>
// //           <Card style={{ flex: 0 }}>
// //             <CardItem>
// //               <Left>
// //                 <Thumbnail source={{ uri: 'Image URL' }} />
// //                 <Body>
// //                   <Text>NativeBase</Text>
// //                   <Text note>April 15, 2016</Text>
// //                 </Body>
// //               </Left>
// //             </CardItem>
// //             <CardItem>
// //               <Body>
// //                 <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} />
// //                 <Text>
// //                 //Your text here
// //                 </Text>
// //               </Body>
// //             </CardItem>
// //             <CardItem>
// //               <Left>
// //                 <Button transparent textStyle={{ color: '#87838B' }}>
// //                   <Icon name="logo-github" />
// //                   <Text>1,926 stars</Text>
// //                 </Button>
// //               </Left>
// //             </CardItem>
// //           </Card>
// //         </Content>
// //       </Container>
// //     );
// //   }
// // }