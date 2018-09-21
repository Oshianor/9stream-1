import React, { Component } from 'react';
// import Modal from "react-native-modalbox";
import { setPost } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, PixelRatio } from "react-native";
import { Thumbnail, Container,  Icon, Button, Content, Footer } from "native-base";
import gone from '../../../assets/aqua.jpg';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Post } from '../../../components/reuse/post';
import ImagePicker from 'react-native-image-picker';
import Userfullname from '../../../components/reuse/userfullname';
// import ImagePicker from 'react-native-image-crop-picker';

class InputField extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Reply" ,
      headerTitleStyle: {
        color: 'black'
      },
      headerRight: (
        <Thumbnail small source={gone} />
      ),
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      post: '',
      images: [],
      height: 0,
      avatarSource: null
    }
  }



  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }


  handlePost = () => {
    let obj = {
      interface: 'mobile',
      userId: 1,
      type: 'text',
      videoId: 1,
      content: this.state.post
    }
    Post('/api/addcomment', obj).then((res) => {
      console.log(res);
      
    })
    this.props.navigation.navigate('LiveShow');
  }

  closeModal = () => {
    this.setState({
      avatarSource: null
    })
  }

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


  render() {
    console.log(this.props.navigation);
    
    let reply = this.props.navigation.state.params.reply;
    return (
      <Container>
        <Content>
          <View>
            {
              reply &&
                this.displaySingleComment()
            }
            <TextInput  
              {...this.props}
              // onTouchStart={this.hideAll}
              multiline={true}
              placeholder={reply ? "Your thoughts" : "What's happening?"}
              spellCheck={true}
              underlineColorAndroid='transparent'
              onChangeText={(post) => {
                this.setState({ post })
              }}
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              style={[styles.input, { height: Math.max(35, this.state.height) }]}
              value={this.state.post}
            />
          </View>
          {
            !reply &&
              <View style={styles.container}>
                {
                  this.state.avatarSource !== null &&
                  <View style={styles.realFirst} >
                    <Button transparent onPress={this.closeModal} >
                      <Icon name="close" style={{ color: "black", fontSize: 32 }} />
                    </Button>
                  </View>
                }
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                    {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                      <Image style={styles.avatar} source={this.state.avatarSource} />
                    }
                  </View>
                </TouchableOpacity>
              </View>
          }
          
        </Content>

        <Footer style={{ backgroundColor: 'white' }} >
          <Button transparent small onPress={this.selectPhotoTapped.bind(this)} style={{ marginTop: 5 }} >
            <Icon name="ios-image" style={{ color: 'black' }} />
          </Button>

          <View style={{ flex: 1 }} />
          {/* {this.props.tweetPosted === "ongoing" ? <Spinner /> : null} */}
          <Button
            rounded
            style={{ backgroundColor: "#f48221", height: 40, width: 94, marginTop: 5, }}
            onPress={this.handlePost}
          >
            <Text style={{ color: "black", fontWeight: '500', marginLeft: 20, textAlign: 'center' }}>Send</Text>
          </Button>
        </Footer>
      </Container>
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
    setPost: setPost,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);

const styles = StyleSheet.create({
  realFirst: {
    alignSelf: "flex-start",
    alignItems: "center",
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
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  realFirst: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    paddingRight: 10,
    top: 0,
    position: 'absolute',
    left: 0
  },
});








{/* <View style={styles.modalFooter}>
          <Button transparent small onPress={this.handlePhoto} >
            <Icon name="ios-image" style={{ color: 'black' }} />
          </Button>

          <View style={{ flex: 1 }} />
          {this.props.tweetPosted === "ongoing" ? <Spinner /> : null}
          <Button
            rounded
            style={{ backgroundColor: "#f48221", height: 40, width: 94, }}
            onPress={this.handlePost}
          >
            <Text style={{ color: "black", fontWeight: '500', marginLeft: 20, textAlign: 'center' }}>Post</Text>
          </Button>
        </View> */}











// <Modal
        //   ref={"newTweetModal"}
        //   backdrop={true}
        //   style={styles.modal}
        //   isOpen={this.props.community.modalToggle}
        //   // isOpen={true}
        //   onClosed={this.toggleModal}
        //   swipeToClose
        // >
// </Modal >



























// handlePost = () => {
  // const { images, post } = this.state;
  // // initiate a firebase ref and push nothing
  // let newRef = firebase.database().ref('posts').push("")
  // // check if a image was added.
  // // if no image was added then it was a text only post
  // if (typeof images[0] === "undefined") {
  //   let obj = {
  //     id: newRef.key,
  //     userId: "QI5POrwG3qZYc9iqgmQAXZ6FC6i1",
  //     text: post,
  //     interface: 'moblie',
  //     type: 'textOnly',
  //     created: firebase.database.ServerValue.TIMESTAMP,
  //     updated: firebase.database.ServerValue.TIMESTAMP
  //   }
  //   // check if the post was successfully 
  //   if(newRef.set(obj)){
  //     // close the modal if it was
  //     this.closeModal();
  //   }
  // }
// }











// {
//   typeof this.state.images[0] !== 'undefined' &&
//     <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', alignItems: 'center' }} >
//       {
//         this.state.images.map((img, index) => (
//           index <= 5 &&
//           // return (
//           <Image key={index} source={{ uri: img.path }} style={{ width: 100, height: 100, padding: 4 }} />
//           // )
//         ))
//       }
//       <View>
//         {
//           this.state.image > 5 &&
//           <Text>{this.state.image.length - 5} more</Text>
//         }
//       </View>
//     </View>
// }