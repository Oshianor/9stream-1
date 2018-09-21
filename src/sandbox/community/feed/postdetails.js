import React, { Component } from "react";
import gone from '../../../../assets/x-men.jpg';
import moment from "moment";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import {
  Container,
  Content,
  Thumbnail,
  Button,
} from "native-base";
import Userfullname from "../../../reuse/userfullname";
// import firebase from "react-native-firebase";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { getUserObject } from "../../../../store/actions/user";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import communityReducers from "../../../../store/reducers/communityReducers";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";





class PostDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Userfullname 
          userId={navigation.state.params.userId} 
          type='fullName' 
          style={{
            fontWeight: '600',
            fontSize: 18
          }} 
        />
      ),
      headerRight: (
        <Button transparent
          onPress={() => alert('This is a button!')}
          style={{ marginTop: 4 }}
        >
          <Thumbnail small source={gone} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: 'gray',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      comments: [],
      text: '',
      height: 0
    }
    // this.tweet = this.props.navigation.state.params;
    // this.tweetTime = moment(this.tweet.time);
    // console.log(this.tweet);
  }

  // componentDidMount() {
  //   firebase.database().ref('comments')
  //   .orderByChild('postId')
  //   .equalTo(this.props.navigation.state.params.id)
  //     .on("value", (snapshot) => {
  //       snapshot.forEach((data) => {
  //         this.setState({ user: data.val(), loading: false });
  //       });
  //     })
  // }

  // handleComment = () => {
  //   let newRef = firebase.database().ref('comments').push("")
  //   let obj = {
  //     id: newRef.key,
  //     userId: this.props.user.user.id,
  //     postId: this.props.navigation.state.params.id,
  //     text: this.state.text,
  //     interface: 'mobile',
  //     created: firebase.database.ServerValue.TIMESTAMP,
  //     updated: firebase.database.ServerValue.TIMESTAMP
  //   }

    if (newRef.set(obj)) {
      // close the modal if it was
      this.setState({
        text: '',
        height: 0
      })
    }
  }

  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    // console.log('cele',this.props);
    let post = this.props.navigation.state.params;
    return (
      <Container>
        <Content style={{ backgroundColor: "white" }}>
          <View style={styles.tweetHead}>
            <Thumbnail source={gone} />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 10,
                height: 56
              }}
            >
              
              <Userfullname 
                userId={this.props.navigation.state.params.userId} 
                type='fullName'
                style={{
                  paddingLeft: 15,
                  fontWeight: "bold",
                  fontSize: 18
                }} />

              <Userfullname 
                userId={this.props.navigation.state.params.userId} 
                type='userName'
                style={{
                  paddingLeft: 15,
                  color: "#aaa",
                  fontSize: 14
                }} />
            </View>
          </View>
          <View>
            <Text style={styles.tweetText}>
              {post.text}
            </Text>
          </View>
          <View style={styles.timeStamp}>
            <Text style={{ color: "#888", fontSize: 16 }}>
              {post.created.toString()}
            </Text>
          </View>
          
          <View style={styles.timeStamp}>
            <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>
              23
            </Text>
            <Text style={{ color: "#888", fontSize: 16, paddingRight: 20 }}>
              Comment
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>
              455
            </Text>
            <Text style={{ color: "#888", fontSize: 16 }}>Likes</Text>
          </View>
        </Content>
        <View style={styles.commentInput}>
          <KeyboardAvoidingView
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
            behavior="position"
          >
            <Grid>
              <Col size={75}>
                <TextInput
                  {...this.props}
                  multiline={true}
                  spellCheck={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => {
                    this.setState({ text })
                  }}
                  onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height })
                  }}
                  style={[styles.input, { height: Math.max(35, this.state.height) }]}
                  value={this.state.text}
                />
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.button} onPress={this.handleComment}  >
                  <Text style={styles.buttonText}>SEND</Text>
                </TouchableOpacity>
              </Col>
            </Grid>
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,)(PostDetails);



const styles = StyleSheet.create({
  tweetHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  tweetText: {
    marginTop: 10,
    fontSize: 15,
    padding: 10,
    color: 'black'
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0
  },
  commentInput: {
    // height: 200
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  button: {
    width: '100%',
    backgroundColor: '#f48221',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  buttonText: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});


{/* <TextInput
                  style={styles.input}
                  onChangeText={comment => this.setState({ comment: comment })}
                  // value={this.state.email}
                  placeholderTextColor='white'
                  underlineColorAndroid='transparent'
                /> */}

















{/* <View style={styles.tweetFooter}>
            <View>
              <Button
                transparent
                dark
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <Icon name="ios-text-outline" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-repeat" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-heart-outline" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-mail-outline" />
              </Button>
            </View>
          </View> */}
{/* <View>
            {this.state.loading ? (
              <Spinner />
            ) : (
                <FlatList
                  data={this.state.comments}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => (
                    <View style={styles.tweetReply}>
                      <Thumbnail small source={gone} />
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          paddingLeft: 10,
                          paddingRight: 10,
                          width: "93%"
                        }}
                      >
                        <View style={{ flexDirection: "row", maxHeight: 22 }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.user.name}
                          </Text>
                          <Text
                            style={{ color: "#888", flex: 1, paddingLeft: 5 }}
                          >
                            {"@" + item.user.username}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 5,
                            maxHeight: 22
                          }}
                        >
                          <Text style={{ color: "#888" }}>Replying to</Text>
                          <Text style={{ color: "#4286f4", flex: 1 }}>
                            {"@" + this.tweet.user.username}
                          </Text>
                        </View>
                        <Text style={{ paddingTop: 5 }}>{item.tweetContent}</Text>
                        <View
                          style={StyleSheet.flatten([
                            styles.tweetFooter,
                            { width: "100%" }
                          ])}
                        >
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon
                                name="ios-text-outline"
                                style={{ fontSize: 20 }}
                              />
                              <Text style={{ fontSize: 14 }}>{item.replies}</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon name="ios-repeat" style={{ fontSize: 20 }} />
                              <Text style={{ fontSize: 14 }}>
                                {item.retweets}
                              </Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon
                                name="ios-heart-outline"
                                style={{ fontSize: 20 }}
                              />
                              <Text style={{ fontSize: 14 }}>{item.likes}</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon
                                name="ios-mail-outline"
                                style={{ fontSize: 20 }}
                              />
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              )} 
          </View> */}