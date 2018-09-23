import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import gone from '../../../assets/aqua.jpg';
import { Icon, Button, Thumbnail, Container, Spinner } from "native-base";
import { 
  setCurrentCommentId, 
  passCurrentComentReplyObjectData,
  getcomment
} from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class Comment extends Component {
  componentDidMount = () => {
    this._onRefresh();
  }

  _onRefresh = () => {
    let empty = []
    let database = firebase.database();
    let commentRef = database.ref('comments').orderByChild('created');
    commentRef.on('child_added', snapshot => {
      empty = empty.concat(snapshot.val())
      this.props.getcomment(empty);
    })
  }

  handleCommentReply(item){
    this.props.setCurrentCommentId(item.id);
    this.props.passCurrentComentReplyObjectData(item);
  }

  displayComment = (item) => {
    return (
      <View style={styles.tweetReply} >
      {
        typeof item.img !== "null" ?
          <Thumbnail small source={item.img} />
        :
        
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
              {item.text}
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
                <View>
                  <View style={styles.footerIcons}>
                    <Button
                      transparent
                      dark
                      onPress={this.handleCommentReply.bind(this)}
                    >
                      <Icon
                        name="ios-create"
                        style={{ fontSize: 20 }}
                      />
                    </Button>
                  </View>

                  <View style={styles.footerIcons}>
                    <Button
                      transparent
                      dark
                      onPress={this.handleCommentReply.bind(this)}
                    >
                      <Icon
                        name="ios-close"
                        style={{ fontSize: 20 }}
                      />
                    </Button>
                  </View>
                </View>
            }
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container  style={{ flex: 1 }} >
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