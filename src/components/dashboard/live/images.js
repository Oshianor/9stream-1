import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Thumbnail, Icon, Button } from "native-base";
import {
  toggleCurrentModalStatus, toggleCurrentImgStatusTrue,
  toggleCurrentImgStatusFalse, toggleCurrentModalStatusTrue, toggleCurrentModalStatusFalse
} from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import gone from '../../../assets/aqua.jpg';

class ImagesCom extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null
  };

  closeModal = () => {
    this.props.toggleCurrentModalStatus('input');
    this.props.toggleCurrentModalStatusTrue();
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

  selectVideoTapped() {
    const options = {
      title: 'Select a Video',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.realFirst} >
          <Button transparent onPress={this.closeModal} >
            <Icon name="close" style={{ color: "black", fontSize: 32 }} />
          </Button>
        </View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
            {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        {this.state.videoSource &&
          <Text style={{ margin: 8, textAlign: 'center' }}>{this.state.videoSource}</Text>
        }

        <View style={styles.realFirst} >
          <Button transparent onPress={this.closeModal} >
            Upload
          </Button>
        </View>
      </View>
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
    toggleCurrentModalStatus: toggleCurrentModalStatus,
    toggleCurrentImgStatusTrue: toggleCurrentImgStatusTrue,
    toggleCurrentImgStatusFalse: toggleCurrentImgStatusFalse,
    toggleCurrentModalStatusTrue: toggleCurrentModalStatusTrue,
    toggleCurrentModalStatusFalse: toggleCurrentModalStatusFalse
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesCom);


const styles = StyleSheet.create({
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































































// import React, { Component } from 'react';
// var ImagePicker = require('react-native-image-picker');


// var options = {
//   title: 'Upload a',
//   // customButtons: [
//   //   { name: 'fb', title: 'Choose Photo from Facebook' },
//   // ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   }
// };

// /**
//  * The first arg is the options object for customization (it can also be null or omitted for default options),
//  * The second arg is the callback which sends object: response (more info below in README)
//  */

// class ImagesCom extends Component {
//   constructor(props) {
//     super(props);
    
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       }
//       else {
//         let source = { uri: response.uri };

//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//         this.setState({
//           avatarSource: source
//         });
//       }
//     });
//   }
  
//   render() {
//     return (
//       <Image source={this.state.avatarSource}  />
//     );
//   }
// }

// export default ImagesCom;
// // More info on all the options is below in the README...just some common use cases shown here

