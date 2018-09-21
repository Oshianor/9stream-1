// import React, { Component } from 'react'
// import CountDown from 'react-native-countdown-component';
// import { StyleSheet, View, Text, AppState,
//   TouchableOpacity
//  } from 'react-native';
// // import Video, { Container } from 'react-native-af-video-player';
// import Video from 'react-native-video';
// import { Get } from '../../../components/reuse/get';
// import { getlive, getliveposter, getlivevideo } from "../../../store/actions/data";
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { Spinner } from "native-base";


// class Liveshowslist extends Component {
//   static navigationOptions = {
//     headerTitle: "The Swap Live",
//     headerStyle: {
//       backgroundColor: "#f48221"
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

//   componentDidMount() {
//     AppState.addEventListener('change', this._handleAppStateChange);
//     Get('/mobile_config/get_countdown').then(res => {
//       var start = res.content * 1000;
//       var currentDate = new Date().getTime();
//       let fut = start - currentDate;
//       fut = fut / 1000;
//       this.setState({
//         count: fut
//       })
//     })
//   }

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
//         {/* <TouchableOpacity
//           style={styles.fullScreen}
//           onPress={() => this.setState({ paused: !this.state.paused })}
//         > */}
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
//         {/* </TouchableOpacity> */}

//         <View style={styles.controls}>
//           <View style={styles.generalControls}>
//             <View style={styles.resizeModeControl}>
//               {this.renderResizeModeControl('cover')}
//               {this.renderResizeModeControl('contain')}
//               {/* {this.renderResizeModeControl('stretch')} */}
//             </View>
//           </View>
//         </View>
//         {
//           this.state.count !== "" &&
//             <CountDown
//               until={this.state.count}
//               // onFinish={() => alert('finished')}
//               // onPress={() => alert('hello')}
//               size={20}
//               digitBgColor="#f48221"
//               timeTxtColor="white"
//             />
//         }
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
