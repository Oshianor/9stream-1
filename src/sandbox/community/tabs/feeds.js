// import React, { Component } from 'react';
// // import gone from '../../../../assets/aqua.jpg';
// import { toggleCurrentModalStatusTrue, toggleCurrentModalStatusFalse, getAllImages } from "../../../../store/actions/community";
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import {
//   StyleSheet, View, Platform, TouchableOpacity } from "react-native";
// import { Container, Icon, Spinner, Fab } from "native-base";
// import Postlist from '../../../../components/dashboard/community/components/feed/postlist';
// import PostDetails from '../../../../components/dashboard/community/components/feed/postdetails';
// // import { createStackNavigator } from 'react-navigation';


// // const Mode = createStackNavigator(
// //   {
// //     Postlist: {
// //       screen: Postlist
// //     },
// //     PostDetails: {
// //       screen: PostDetails,
// //     }
// //   },
// //   {
// //     initialRouteName: 'Postlist',
// //   }
// // )

// Mode.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

// class Feeds extends Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       modalVisble: false
//     }
//   }


//   render() {
//     // console.log("feed", this.props);
    
//     return (
//       <Container>
//         <Mode />
//       </Container>
//     );
//   }
// }

// // export default Feeds;
// function mapStateToProps(state) {
//   return {
//     route: state.route,
//     community: state.community
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     // toggleCurrentFabStatusTrue: toggleCurrentFabStatusTrue,
//     // toggleCurrentFabStatusFalse: toggleCurrentFabStatusFalse,
//     toggleCurrentModalStatusTrue: toggleCurrentModalStatusTrue,
//     toggleCurrentModalStatusFalse: toggleCurrentModalStatusFalse,
//     getAllImages: getAllImages
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Feeds);

// const classes = StyleSheet.create({
//   elev: {
//     backgroundColor: '#f48221',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//   },
//   topMargin: {
//     // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
//     backgroundColor: "white",
//     zIndex: -1
//   },
//   content: {
//     padding: 10,
//     backgroundColor: "white"
//   },
//   heading: {
//     fontSize: 32,
//     fontWeight: "400",
//     marginBottom: 30
//   },
//   tweet: {
//     paddingTop: 20,
//     paddingBottom: 5,
//     paddingLeft: 10,
//     paddingRight: 10,
//     borderBottomColor: "#bbb",
//     // borderBottomWidth: StyleSheet.hairlineWidth,
//     flexDirection: "column"
//   },
//   tweetText: {
//     marginTop: 10,
//     fontSize: 18,
//     color: "#555"
//   },
//   tweetFooter: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 0
//   },
//   badgeCount: {
//     fontSize: 12,
//     paddingLeft: 5
//   },
//   footerIcons: {
//     flexDirection: "row",
//     alignItems: "center"
//   }
// });




// {/* {
//           this.props.community.postTabsRoute === null &&
//             <Postinput open={this.state.active} navigation={this.props.navigation} />
//         } */}

// {/* display fab */ }




// // displayFab = () => {
// //   let open = { backgroundColor: '#f48221' };
// //   if (this.state.active) {
// //     open = { backgroundColor: 'red' };
// //   } else {
// //     let open = { backgroundColor: '#f48221' };
// //   }
// //   return (
// //     <View style={{ flex: 1 }}>
// //       <Fab
// //         active={this.state.active}
// //         direction="up"
// //         containerStyle={{}}
// //         style={classes.elev, open}
// //       position="bottomRight"
// //           onPress={this.openModal}
// //       >
// //         <Icon
// //         name="ios-add"
// //       />
// //       {
// //           this.state.active ?
// //             <Icon
// //               name="ios-close"
// //             />
// //             :
// //             <Icon
// //               name="ios-add"
// //             />
// //         }

// //       <Button style={{ backgroundColor: 'white' }} onPress={this.handleRoute} >
// //           <Icon name="ios-create" style={{ color: 'black', fontSize: 25 }} />
// //         </Button>
// //         <Button style={{ backgroundColor: 'white' }} onPress={this.openModal} >
// //           <Icon name="ios-image" style={{ color: 'black', fontSize: 25 }} />
// //         </Button>
// //         <Button style={{ backgroundColor: 'white' }}>
// //           <Icon name="ios-videocam" style={{ color: 'black', fontSize: 25 }} />
// //         </Button>
// //         </Fab>
// //       </View >
// //     )
// // }















//         {/* <Page /> */}
//         {/* <Content>
//           <Postlist navigation={this.props.navigation} />
//         </Content> */}

// {/* {
//           this.props.community.postTabsRoute === 'video' &&
//             <Camera navigation={this.props.navigation} />
//         } */}











// {/* field to write a post */ }
// {/* {
//           this.props.community.postTabsRoute === null &&
//             <Postfield />
//         } */}












//   // toggleModal = () => {
//   //   this.setState({
//   //     modalVisble: !this.state.modalVisble
//   //   })
//   // }

//   // openModal = () => {
//   //   this.props.toggleCurrentModalStatusTrue();
//   //   this.props.toggleCurrentFabStatusFalse();
//   // }

//   // handleAddOrWrite = () => {
//   //   if (this.props.community.fabStatus) {
//   //     this.props.toggleCurrentFabStatusFalse();
//   //   } else {
//   //     this.props.toggleCurrentFabStatusTrue();
//   //   }
//   // }

//   // displayFab = () => {
//   //   let open = { backgroundColor: '#f48221' };
//   //   if (this.props.community.fabStatus) {
//   //     open = { backgroundColor: 'red' };
//   //   }else{
//   //     let open = { backgroundColor: '#f48221' };
//   //   }
//   //   return (
//   //     <View style={{ flex: 1 }}>
//   //       <Fab
//   //         active={this.props.community.fabStatus}
//   //         direction="up"
//   //         containerStyle={{  }}
//   //         style={classes.elev, open}
//   //         position="bottomRight"
//   //         onPress={this.handleAddOrWrite}
//   //       >
//   //         {
//   //           this.props.community.fabStatus ?
//   //             <Icon
//   //               name="ios-close"
//   //             />
//   //           :
//   //             <Icon
//   //               name="ios-add"
//   //             />
//   //         }

//   //         <Button style={{ backgroundColor: 'white' }} onPress={this.openModal} >
//   //           <Icon name="ios-create" style={{ color: 'black', fontSize: 25 }} />
//   //         </Button>
//   //         <Button style={{ backgroundColor: 'white' }} onPress={this.getPhotos} >
//   //           <Icon name="ios-image" style={{ color: 'black', fontSize: 25 }} />
//   //         </Button>
//   //         <Button style={{ backgroundColor: 'white' }}>
//   //           <Icon name="ios-videocam" style={{ color: 'black', fontSize: 25 }} />
//   //         </Button>
//   //       </Fab>
//   //     </View>
//   //   )
//   // }





















//   // setIndex = (index) => {
//   //   if (index === this.state.index) {
//   //     index = null
//   //   }
//   //   this.setState({ index })
//   // }


//   // getPhotos = () => {
//   //   CameraRoll.getPhotos({
//   //     first: 10,
//   //     assetType: 'All'
//   //   }).then(
//   //     r => this.props.getAllImages(r.edges)
//   //   )
//   // }















//   // displayPhotos = () => {
//   //   return (
//   //     <View style={classes.modal} >
//   //       <Modal
//   //         animationType='slide'
//   //         transparent={false}
//   //         visible={this.props.modalVisible}
//   //         onRequestClose={() => console.log(('modal closed'))}
//   //       >
//   //         <ScrollView
//   //           contentContainerStyle={classes.scrollview}
//   //         >
//   //           {this.displayImages()}

//   //           <View style={classes.container} >
//   //             <Fab
//   //               // active={this.props.community.fabStatus}
//   //               // direction="up"
//   //               containerStyle={{}}
//   //               // style={classes.elev, open}
//   //               position="bottomLeft"
//   //               onPress={this.handleCancel}
//   //             >
//   //               <Icon name="ios-close" style={{ color: "black", fontSize: 32 }} />
//   //             </Fab>
//   //             <Fab
//   //               // active={this.props.community.fabStatus}
//   //               // direction="up"
//   //               containerStyle={{}}
//   //               // style={classes.elev, open}
//   //               position="bottomRight"
//   //               onPress={this.handleConfirmSelect}
//   //             >
//   //               <Icon name="ios-checkbox-outline" style={{ color: "black", fontSize: 32 }} />
//   //             </Fab>
//   //           </View>
//   //         </ScrollView>
//   //       </Modal>
//   //     </View>
//   //   );
//   // }

//   // displayImages = () => {
//   //   // if (typeof this.props.community.images[0] !== "undefined") {
//   //     return (
//   //       this.props.community.images.map((img, index) => (
//   //         <TouchableHighlight
//   //           style={{ opacity: index === this.state.index ? .5 : 1 }}
//   //           onPress={() => this.setIndex(index)}
//   //           key={index}
//   //           underlayColor='transparent'
//   //         >
//   //           <Image
//   //             source={{ uri: img.node.image.uri }}
//   //             style={{ width: this.props.width / 3, height: width / 3 }}
//   //           />
//   //         </TouchableHighlight>
//   //       ))
//   //     )
//   //   // } else {
//   //   //   return null
//   //   // }
//   // }




















// {/* this is displayed only when the user whats to upload a image 
//         and a modal of all there images are previewed to select from */}
// {/* <Photos modalVisble={this.state.modalVisble} width={width} /> */ }
































// {/* start new */ }
// {/* <Content style={{ backgroundColor: "white" }}> */ }
// {/* {this.props.fetchingTweets ? (
//             <View
//               contentContainerStyle={{
//                 flex: 1,
//                 alignItems: "center",
//                 justifyContent: "center"
//               }}
//             >
//               <Spinner color="blue" />
//             </View>
//           ) : (
//               <View style={{ justifyContent: "flex-start" }}>
//                 <FlatList
//                   data={this.props.tweets}
//                   keyExtractor={this._keyExtractor}
//                   renderItem={({ item }) => (
                    
//                   )}
//                 />
//                  {this.state.newTweetModalOpen ? null : ( 
//                   <Fab
//                     position="bottomRight"
//                     style={{ backgroundColor: "#4286f4", zIndex: -1 }}
//                     onPress={this.openModal.bind(this)}
//                     ref={"FAB"}
//                   >
//                     <Icon name="md-create" />
//                   </Fab>
//                  )} 
//               </View>
//             )} */}
// {/* </Content> */ }














// {/* {Platform.OS === "android" ? null : ( */ }
// {/* <Header style={styles.topMargin}>
//             <Left>
//               <Thumbnail small source={gone} />
//             </Left>
//             <Body>
//               <Title style={{ color: "#121212" }}>Home</Title>
//             </Body>
//             <Right>
//               <Button transparent onPress={this.openModal} >
//                 <Icon name="md-create" style={{ color: "#4286f4" }} />
//               </Button>
//             </Right>
//           </Header> */}
// {/* )} */ }