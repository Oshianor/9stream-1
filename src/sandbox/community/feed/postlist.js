import React, { Component } from "react";
import gone from '../../../../assets/aqua.jpg';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform
} from "react-native";
import {
  Container,
  Content,
  Thumbnail,
  Icon,
  Spinner,
  Fab,
  Button,
  Input,
  Item,
} from "native-base";
import firebase from "react-native-firebase";
import Userfullname from "../../../reuse/userfullname";
import { withNavigation } from 'react-navigation';
import { toggleCurrentModalStatusTrue, toggleCurrentModalStatusFalse, getAllImages } from "../../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Postlist extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Item style={{ backgroundColor: 'white', borderRadius: 3 }} >
          <Icon name="ios-search" style={{ color: '#f48221', padding: 5 }} />
          <Input
            placeholder="Search"
            style={{ color: "black" }}
            keyboardType="web-search"
            onSubmitEditing={() => console.log("lifefefef")}
          />
          <Icon name="ios-videocam" style={{ color: '#f48221', padding: 5 }} />
        </Item>
      ),
      headerLeft: (
        <Button 
          transparent 
          onPress={() => navigation.openDrawer()}
          style={{ backgroundColor: 'black', marginTop: 10 }}
        >
          <Icon name='ios-menu' style={{ color: '#f48221' }} />
        </Button>
      ),
      headerRight: (
        <Button transparent
          onPress={() => alert('This is a button!')}
          style={{ backgroundColor: 'black', marginTop: 10 }}
        >
          <Thumbnail small source={gone} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    };
  }

  // componentDidMount() {
  //   let empty = [];
  //   firebase.database().ref('posts').on('value', snapshot => {
  //     snapshot.forEach(data => {
  //       empty = empty.concat(data.val())
  //     })
  //     this.setState({
  //       posts: empty.reverse(),
  //       loading: false
  //     })
  //     empty = [];
  //   })
  // }


  openModal = () => {
    this.props.toggleCurrentModalStatusTrue();
    // this.props.toggleCurrentFabStatusFalse();
  }

  displayFab = () => {
    return (
      <View >
        <Fab
          // active={this.state.active}
          direction="up"
          containerStyle={{ backgroundColor: 'transparent' }}
          style={styles.elev}
          position="bottomRight"
          onPress={this.openModal}
        >
          <Icon name="ios-create" />
        </Fab>
      </View >
    )
  }
  // .reverse()

  handlePrivateMessage(userId){
    // firebase
    
    const msgRef = firebase.database().ref('messages').push("");

    let obj = {
      id: msgRef.key,
      senderId: this.props.user.user.id,
      receiverId: userId,
      // conversationConfirm: false,
      status: 'open',
      created: firebase.database.ServerValue.TIMESTAMP,
      updated: firebase.database.ServerValue.TIMESTAMP
    }

    msgRef.set(obj)
      this.props.navigation.dispatch ('Messages', obj);
  }

  profileClick(user) {
    // this.props.navigation.navigate("Profile", user);
    console.log(user);
  }

  postDetails(post) {
    this.props.navigation.navigate("PostDetails", post);
  }

  handlePostLike = (postId) => {
    let newRef = firebase.database().ref('postLikes').push("");
    let obj = {
      id: newRef.key,
      userId: this.props.user.user.id, // the current logged in user
      postId: postId,
      created: firebase.database.ServerValue.TIMESTAMP
    }
    newRef.set(obj)
  }

  displayPost(){
    return (
      <Content style={{ backgroundColor: "white" }}>
        {this.state.loading ? (
          <View
            contentContainerStyle={{
              flex: 1,
              // alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="black" />
          </View>
        ) : (
            <View style={{ justifyContent: "flex-start" }}>
              <FlatList
                data={this.state.posts}
                // keyExtractor={this.keyExtractor}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={styles.tweet}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <TouchableHighlight
                        onPress={this.profileClick.bind(this, item.id)}
                        underlayColor="white"
                        activeOpacity={0.75}
                      >
                        <Thumbnail source={gone} />
                      </TouchableHighlight>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "flex-start"
                        }}
                      >
                        {/* {post.firstName + " " + post.lastName}  */}
                        {/* fullname */}
                        <TouchableHighlight
                          onPress={this.profileClick.bind(this, item.id)}
                          underlayColor="white"
                          activeOpacity={0.75}
                        >
                          <Userfullname userId={item.userId} type='fullName' style={{
                            paddingLeft: 15,
                            fontWeight: "bold",
                            fontSize: 18
                          }} />
                        </TouchableHighlight>

                        {/* username */}
                        <Userfullname userId={item.userId} type='userName' style={{
                          paddingLeft: 15,
                          color: "#aaa",
                          fontSize: 14
                        }} />
                      </View>
                    </View>

                    <TouchableHighlight
                      onPress={this.postDetails.bind(this, item)}
                      underlayColor="white"
                      activeOpacity={0.75}
                    >
                      <View>
                        {/* <Text style={styles.tweetText}> */}
                        {
                          item.text.length > 200 ?
                            <Text style={styles.tweetText}>{item.text.substring(0, 200)}<Text style={{ color: 'orange' }} >...See more</Text></Text>
                            // item.text.substring(0, 200) + ' ...See more'
                            :
                            <Text style={styles.tweetText}>{item.text}</Text>
                        }
                        {/* </Text> */}
                        <View style={styles.tweetFooter}>
                          <View style={styles.footerIcons}>
                            <Button
                              transparent
                              dark
                            >
                              <Icon name="ios-thumbs-up-outline" />
                              <Text style={styles.badgeCount}></Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon name="ios-chatboxes-outline" />
                              <Text style={styles.badgeCount}>2</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark onPress={this.handlePrivateMessage.bind(this, item.userId)} >
                              <Icon name="ios-mail-outline" />
                            </Button>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                )}
              />
            </View>
          )}
      </Content>
    )
  }

  render() {
    // console.log(this.state);
    console.log('list', this.props);
    // firebase.database().ref('post').once('value').then(res => console.log(res))
    return (
      <Container>
        {this.displayPost()}
        {
          this.displayFab()
        }
      </Container>
    );
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
    // toggleCurrentFabStatusTrue: toggleCurrentFabStatusTrue,
    // toggleCurrentFabStatusFalse: toggleCurrentFabStatusFalse,
    toggleCurrentModalStatusTrue: toggleCurrentModalStatusTrue,
    toggleCurrentModalStatusFalse: toggleCurrentModalStatusFalse,
    getAllImages: getAllImages
  }, dispatch)
}

const PostList = connect(mapStateToProps, mapDispatchToProps)(Postlist);
export default withNavigation(PostList);


const styles = StyleSheet.create({
  elev: {
    backgroundColor: '#f48221',
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
  topMargin: {
    // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
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
    // alignItems: "center"
  },
  modalFooter: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 54,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems: "center",
    padding: 5
  },
  modal: {
    justifyContent: "flex-start",
    // alignItems: "center",
    position: "absolute",
    zIndex: 4,
    elevation: 4,
    // height: Dimensions.get("window").height - Expo.Constants.statusBarHeight,
    // marginTop: Expo.Constants.statusBarHeight / 2
  }
});

































{/* {this.props.newTweetModalOpen && Platform.OS === "android" ? null : (
          <Header style={styles.topMargin}>
            <Left>
              <Thumbnail small source={{ uri: this.props.user.avatar }} />
            </Left>
            <Body>
              <Title style={{ color: "#121212" }}>Home</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.openModal.bind(this)}>
                <Icon name="md-create" style={{ color: "#4286f4" }} />
              </Button>
            </Right>
          </Header>
        )}  */}




{/* <View tabLabel="Search">
          <Text>Search</Text>
        </View>
        <View tabLabel="Messages">
          <Text>Messages</Text>
        </View> */}



{/* {this.state.newTweetModalOpen ? null : (
          <Fab
            position="bottomRight"
            style={{ backgroundColor: "#4286f4", zIndex: -1 }}
            onPress={this.openModal.bind(this)}
            ref={"FAB"}
          >
            <Icon name="md-create" />
          </Fab>
        )}
              </View>
    )
  } */}






// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";
// const iosConfig = {
//   client_id: "624516396075-ifngjq6gmtvmc4rjop1usuoo9r1ebukj.apps.googleusercontent.com",
//   apiKey: "AIzaSyACrbs9W2dY-Y0mD_C8nxRXK9Xu6XLN3yY",
//   authDomain: "stream-2eeac.firebaseapp.com",
//   databaseURL: "https://stream-2eeac.firebaseio.com",
//   projectId: "stream-2eeac",
//   storageBucket: "stream-2eeac.appspot.com",
//   messagingSenderId: "624516396075",
//   persistence: true
// }


// const androidConfig = {
//   client_id: "624516396075-ifngjq6gmtvmc4rjop1usuoo9r1ebukj.apps.googleusercontent.com",
//   appId: "1:624516396075:android:47f551e9e6c5c47f",
//   apiKey: "AIzaSyACrbs9W2dY-Y0mD_C8nxRXK9Xu6XLN3yY",
//   authDomain: "stream-2eeac.firebaseapp.com",
//   databaseURL: "https://stream-2eeac.firebaseio.com",
//   projectId: "stream-2eeac",
//   storageBucket: "stream-2eeac.appspot.com",
//   messagingSenderId: "624516396075",
//   persistence: true
// }

// const App = firebase.initializeApp(
//   Platform.OS === 'ios' ? iosConfig : androidConfig,
//   'App'
// );
































































































































// import React, { Component } from 'react';
// import {
//   StyleSheet, View, TouchableHighlight, Image, FlatList
// } from "react-native";
// import { Icon, Button, Text, Thumbnail, Content, Container } from "native-base";
// import gone from '../../../../assets/aqua.jpg';

// class Postlist extends Component {
//   displayPost = () => {
//     return (
//       <View style={styles.tweet}>
//         <TouchableHighlight
//           // onPress={this._profileClick.bind(this, item.user)}
//           underlayColor="white"
//           activeOpacity={0.75}
//         >
//           <View style={{ flex: 1, flexDirection: "row" }}>
//             <Thumbnail source={gone} />
//             <View
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "flex-start"
//               }}
//             >
//               <Text
//                 style={{
//                   paddingLeft: 15,
//                   fontWeight: "bold",
//                   fontSize: 20
//                 }}
//               >
//                 {/* {item.user.name} */}
//                 Abundance Oshianor
//               </Text>

//               <Text
//                 style={{
//                   paddingLeft: 15,
//                   color: "#aaa",
//                   fontSize: 16
//                 }}
//               >
//                 {/* {"@" + item.user.username} */}
//                 @Abundance
//               </Text>
//             </View>
//           </View>
//         </TouchableHighlight>
//         <Text style={styles.tweetText}>
//           {/* {item.tweetContent} */}
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//           Live life no matter what
//         </Text>
//         <View style={styles.tweetFooter}>
//           <View style={styles.footerIcons}>
//             <Button
//               transparent
//               dark
//             // onPress={this._tweetDetails.bind(this, item)}
//             >
//               <Icon name="ios-text-outline" />
//               <Text style={styles.badgeCount}>
//                 {/* {item.replies} */}
//                 23
//               </Text>
//             </Button>
//           </View>
//           {/* <View style={styles.footerIcons}>
//             <Button transparent dark>
//               <Icon name="ios-repeat" />
//               <Text style={styles.badgeCount}> */}
//           {/* {item.retweets} */}
//           {/* 23
//               </Text>
//             </Button>
//           </View> */}
//           <View style={styles.footerIcons}>
//             <Button transparent dark>
//               <Icon name="ios-heart-outline" />
//               <Text style={styles.badgeCount}>
//                 {/* {item.likes} */}
//                 23
//               </Text>
//             </Button>
//           </View>
//           <View style={styles.footerIcons}>
//             <Button transparent dark>
//               <Icon name="ios-mail-outline" />
//             </Button>
//           </View>
//         </View>
//       </View>
//     )
//   }

//   render() {
//     return (
//       <Container>
//         <Content>
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//           {this.displayPost()}
//         </Content>
//       </Container>
//     );
//   }
// }

// export default Postlist;
// const styles = StyleSheet.create({
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
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     flexDirection: "column",
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
//   },
// });