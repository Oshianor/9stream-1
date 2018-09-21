import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import gone from '../../../assets/aqua.jpg';
import { Spinner, Fab, Icon, Button, Thumbnail, Header, Body, Right, Left } from "native-base";
import Userfullname from '../../reuse/userfullname';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class Comment extends Component {


  handleCommentReply(item){
    this.props.setCurrentCommentId(item.id);
    this.props.passCurrentComentReplyObjectData(item);
  }

  render() {
    const item = this.props.item;
    return (
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
              <Button
                transparent
                dark
                onPress={this.handleCommentReply.bind(this, item)}
              >
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
    );
  }
}
const Comments = withNavigation(Comment);

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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

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