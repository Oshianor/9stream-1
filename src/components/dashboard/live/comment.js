import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Icon, Button, Thumbnail, Container, Spinner } from "native-base";
import { 
  setCurrentCommentId, 
  passCurrentComentReplyObjectData,
  getcomment,
  commenttext
} from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import UserAvatar from 'react-native-user-avatar';
import { TouchableRipple } from 'react-native-paper';
import DialogAndroid from 'react-native-dialogs';


class Comment extends Component {

  state = {
    comment: [],
    loading: true
  }
  componentDidMount = () => {
    this._onRefresh();
  }

  _onRefresh = () => {
    let empty = []
    let database = firebase.database();
    let commentRef = database.ref('comments').orderByChild('created');
    commentRef.on('child_added', snapshot => {
      // empty = empty.concat(snapshot.val()).reverse();
      empty.unshift(snapshot.val());
      this.props.getcomment(empty);
    })
  }

  handleCommentReply(item){
    this.props.setCurrentCommentId(item.id);
    this.props.passCurrentComentReplyObjectData(item);
  }

  handleEditComment(item){
    // edit comment
    this.props.commenttext(item.text);
    this.props.setCurrentCommentId(item.id);
  }

  deleter(pas){
    // delete comment
    let database = firebase.database();
    database.ref("comments").child(pas).remove();
    this.props.community.comment.forEach((com, index) => {
      if (com.id == pas) {
        this.props.community.comment.splice(index, 1)
      }
    })
    this.props.getcomment(this.props.community.comment);
  }

  async handleDelete(itemKey){
    const { action } = await DialogAndroid.alert('Delete Comment', 
    'Are You sure you want to perform this action?',
    {
      cancelable: true,
      negativeColor: "red",
      negativeText: "No",
      positiveColor: "black",
      positiveText: "Yes"
    }
  );
    switch (action) {
      case DialogAndroid.actionPositive:
        this.deleter(itemKey)
        break;
      case DialogAndroid.actionNegative:
        console.log('negative!')
        break;
    }
  }

  displayComment = (item) => {
    return (
      <View style={styles.tweetReply} >
      {
        item.img !== "empty" ?
          <Thumbnail small source={{ uri: item.img}}  />
        :
          <UserAvatar
            size="40"
            name={item.name}
            colors={['#000', '#140202', '#372B25', '#ccaabb']}
          />
      }
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
            <Text style={{ fontWeight: "bold" }} >{item.name}</Text>
            <Text
              style={{ color: "gray", flex: 1, textAlign: 'right' }}
            >
              {item.created.toString()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 5
            }}
          >
            <Text style={{ color: "gray", flex: 1 }}>
              {
                item.text.lenght > 80 ?
                  item.text.substr(0, 80) + "..." + 
                  <TouchableRipple>
                    <Text style={{ color: 'red' }} >
                      See more
                    </Text>
                  </TouchableRipple>
                :
                  item.text
              }
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
                onPress={this.handleCommentReply.bind(this)}
              >
                <Icon
                  name="ios-text-outline"
                  style={{ fontSize: 20 }}
                />
                <Text style={{ fontSize: 14 }}>12</Text>
              </Button>
            </View>
            {
              this.props.user.user.id === item.userId &&
                <View style={styles.footerIcons}>
                  <IconButton
                    icon="edit"
                    size={20}
                    onPress={this.handleEditComment.bind(this, item)}
                  />
                </View>
            }
            {
              this.props.user.user.id === item.userId &&
                <View style={styles.footerIcons}>
                  <IconButton
                    icon="remove-circle"
                    size={20}
                    onPress={this.handleDelete.bind(this, item.id)}
                  />
                </View>
            }
          </View>
        </View>
      </View>
    );
  }
// 07060769974
  render() {
    return (
      <Container  style={{ flex: 1, marginBottom: 25 }} >
        {this.props.community.loading ? (
          <View
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="white" />
          </View>
        ) : (
          <FlatList
            data={this.props.community.comment}
            // data={this.state.comment}
            refreshControl={
              <RefreshControl
                refreshing={this.props.community.refresh}
                onRefresh={this._onRefresh}
                progressBackgroundColor="black"
                enabled={true}
                colors={['white']}
              />
            }
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => this.displayComment(item)}
          />
        )}
      </Container>
    )
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
    getcomment: getcomment,
    commenttext: commenttext,
    passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({

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