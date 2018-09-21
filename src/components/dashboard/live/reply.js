import React, { Component } from 'react';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import gone from '../../../assets/aqua.jpg';
import { Spinner, Fab, Icon, Button, Thumbnail, Header, Body, Right, Left } from "native-base";
import Userfullname from '../../reuse/userfullname';
import { Get } from '../../reuse/get';

class Reply extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      reply: [],
      replyLoading: false,
      refreshing: false,
    }
  }

  // refresh call 
  _onRefresh = () => {
    let videoId = this.props.navigation.state.params.item.id;
    this.setState({ refreshing: true });
    Get('/api/getcommentforvideo/' + videoId).then((reslate) => {
      this.setState({
        comments: reslate, refreshing: false,
      })
    })
  }

  

    // fetch the replys for a particaular comment
  componentWillReceiveProps0(){
    if (this.props.community.commentId !== "") {
      this.setState({
        replyLoading: true
      })
      Get('/api/getreplies/' + this.props.community.commentId).then((res) => {
        this.setState({
          reply: res, replyLoading: false
        })
      })
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.commentId !== this.state.commentId) {
  //     this.setState({
  //       replyLoading: true
  //     })
  //     console.log('sammer');
  //     Get('/api/getreplies/' + this.state.commentId).then((res) => {
  //       this.setState({
  //         reply: res, replyLoading: false
  //       })
  //     })
  //   }
  // }


  displaySingleComment = () => {
    const commentReply = this.props.community.commentReply;
    return (
      commentReply !== null &&
        <View style={styles.tweetReply} >
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
              <Userfullname type="fullName" style={{ fontWeight: "bold" }} userId={commentReply.user_id} />
              <Text
                style={{ color: "#888", flex: 1, textAlign: 'right' }}
              >
                {commentReply.created_at.toString()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 5
              }}
            >
              <Text style={{ color: "black", flex: 1 }}>
                {commentReply.content}
              </Text>
            </View>
            <View
              style={StyleSheet.flatten([
                styles.tweetFooter,
                { width: "100%" }
              ])}
            >
              <View style={styles.footerIcons}>
                <Text>34 likes</Text>
              </View>

              <View style={styles.footerIcons}>

                <Text>23 comments</Text>
              </View>
            </View>
          </View>
        </View>
    )
  }

  displayReply = () => {
    return (
      <View style={{ flex: 1 }} >
        <Header style={{ height: 50, backgroundColor: 'black' }} >
          <Left>
            <Icon
              onPress={() => this.setState({ commentId: '' })}
              name='ios-close'
              style={{ fontSize: 35, color: 'white', fontWeight: '700' }}
            />
          </Left>
          <Body>
            <Text style={{ color: 'white' }} >Replies</Text>
          </Body>
          <Right />
        </Header>
        {this.state.replyLoading ? (
          <View
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="black" />
          </View>
        ) : (
            <View style={{ flex: 1 }} >
              {this.displaySingleComment()}
              <FlatList
                data={this.state.reply}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    progressBackgroundColor="black"
                    enabled={true}
                    colors={['white']}
                  />
                }
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={styles.tweetReply} >
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
                        <Userfullname type="fullName" style={{ fontWeight: "bold" }} userId={item.user_id} />
                        <Text
                          style={{ color: "#888", flex: 1, textAlign: 'right' }}
                        >
                          {item.created_at.toString()}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5
                        }}
                      >
                        <Text style={{ color: "black", flex: 1 }}>
                          {item.content}
                        </Text>
                      </View>
                      <View
                        style={StyleSheet.flatten([
                          styles.tweetFooter,
                          { width: "100%" }
                        ])}
                      >
                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon
                              name="ios-heart-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>34</Text>
                          </Button>
                        </View>

                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon
                              name="ios-text-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>12</Text>
                          </Button>
                        </View>

                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
      </View>
    )
  }

  render() {
    return this.displayReply();
  }
}

// export default Reply;
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

export default connect(mapStateToProps, mapDispatchToProps)(Reply);



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
  },
  commentInput: {
    // height: 200
  },
  input: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'white',
    // color: 'black',
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
  // elev: {
  //   backgroundColor: 'orange'
  // },
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