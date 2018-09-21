import React, { Component } from 'react';
import Modal from "react-native-modalbox";
import { getPostTabsRoute, toggleCurrentModalStatusTrue, toggleCurrentModalStatusFalse, toggleCurrentFabStatus } from "../../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image } from "react-native";
import { Thumbnail, Icon, Button, Input } from "native-base";
import gone from '../../../../assets/aqua.jpg';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

class Postfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: '',
      images: []
    }
  }

  closeModal = () => {
    this.props.toggleCurrentModalStatusFalse();
  }

  handlePost = () => {
    const { images, post } = this.state;
    // initiate a firebase ref and push nothing
    let newRef = firebase.database().ref('posts').push("")
    // check if a image was added.
    // if no image was added then it was a text only post
    if (typeof images[0] === "undefined") {
      let obj = {
        id: newRef.key,
        userId: "QI5POrwG3qZYc9iqgmQAXZ6FC6i1",
        text: post,
        interface: 'moblie',
        type: 'textOnly',
        created: firebase.database.ServerValue.TIMESTAMP,
        updated: firebase.database.ServerValue.TIMESTAMP
      }
      // check if the post was successfully 
      if(newRef.set(obj)){
        // close the modal if it was
        this.closeModal();
      }
    }
    
    
  }

  handleVideo(arg) {
    this.props.getPostTabsRoute(arg);
  }

  handlePhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
    }).then(img => {
      this.setState({
        image: null,
        images: img
      });
    }).catch(e => alert(e));
  }

  render() {
    return (
      <Modal
        ref={"newTweetModal"}
        backdrop={true}
        style={styles.modal}
        isOpen={this.props.community.modalStatus}
        onClosed={this.toggleModal}
        swipeToClose
      >
        <View style={styles.realFirst} >
          <Button transparent onPress={this.closeModal} >
            <Icon name="close" style={{ color: "black", fontSize: 32 }} />
          </Button>

          <View style={{ flex: 1 }} />

          <Thumbnail
            small
            source={gone}
          />
        </View>
        <View style={styles.first}>
        {/* , alignItems: 'center' */}
          {
            typeof this.state.images[0] !== 'undefined' &&
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center' }} >
                {
                  this.state.images.map((img, index) => (
                    index <= 5 &&
                      // return (
                        <Image key={index} source={{ uri: img.path }} style={{ width: 100, height: 100, padding: 4 }} />
                      // )
                  ))
                }
                <View>
                  {
                    this.state.image > 5 && 
                      <Text>{this.state.image.length - 5} more</Text>
                  }
                </View>
              </View>
          }
          <Input
            style={styles.sec}
            multiline
            placeholder="What's happening?"
            onChangeText={post => this.setState({ post: post })}
          />
        </View>
        <View style={styles.modalFooter}>
          <Button transparent small onPress={this.handleVideo.bind(this, 'video')} >
            <Icon name="ios-videocam" style={{ color: 'black' }} />
          </Button>
          <Button transparent small onPress={this.handlePhoto} >
            <Icon name="ios-image" style={{ color: 'black' }} />
          </Button>

          <View style={{ flex: 1 }} />
          {/* {this.props.tweetPosted === "ongoing" ? <Spinner /> : null} */}
          <Button
            rounded
            style={{ backgroundColor: "#f48221", height: 40, width: 94, }}
            onPress={this.handlePost}
          >
            <Text style={{ color: "black", fontWeight: '500', marginLeft: 20, textAlign: 'center' }}>Post</Text>
          </Button>
        </View>
      </Modal >
    );
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleCurrentFabStatus: toggleCurrentFabStatus,
    getPostTabsRoute: getPostTabsRoute,
    toggleCurrentModalStatusTrue: toggleCurrentModalStatusTrue,
    toggleCurrentModalStatusFalse: toggleCurrentModalStatusFalse
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Postfield);

const styles = StyleSheet.create({
  realFirst: {
    alignSelf: "flex-start",
    // alignItems: "center",
    flexDirection: "row",
    padding: 5,
    paddingRight: 10
  },
  first: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  sec: {
    flex: 1,
    width: "100%",
    fontSize: 24,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    margin: 5
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
    flex: 1,
    // height: Dimensions.get("window").height - Expo.Constants.statusBarHeight,
    // marginTop: Expo.Constants.statusBarHeight / 2
  }
});


