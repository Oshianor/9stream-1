import React, { Component } from 'react';
import { View, Platform, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Icon, Spinner } from 'native-base';
import SettingForm from './settingforms';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../store/actions/user';
import UserAvatar from 'react-native-user-avatar';
import { Post } from '../reuse/post';

class SettingComponent extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  }

  handleImageUpload(img) {
    let obj = {
      token: this.props.user.user.token,
      id: this.props.user.user.id,
      image_url: img
    }
    Post('/user/upload_user_photo', obj).then(res => {
      console.log("RESSS", res);
      // if (!res.error) {
      //   this.props.user.user.profile.avatar = 
      // }
    })
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: false
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);

      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
        this.handleImageUpload(response.uri);
      }
    });
  }

  render() {
    console.log(this.state);

    return (
      <Container>
        {
          typeof this.props.user.user.profile === "undefined" ?
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="white" />
            </View>
          :
          <View
          style={{ height: 180, backgroundColor: '#f48221' }} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }} >
            {
              typeof this.props.user.user.profile.avatar !== 'null' ?
                <View>
                  <UserAvatar
                    size="80"
                    name={this.props.user.user.profile.firstName + " " + this.props.user.user.profile.lastName}
                    colors={['#000', '#fafafa', '#372B25', '#ccaabb']}
                  />
                  <Icon name="ios-camera" onPress={this.selectPhotoTapped.bind(this)} style={{
                    width: 35,
                    height: 35,
                    borderRadius: 35 / 2,
                    backgroundColor: 'white',
                    marginLeft: 35,
                    fontSize: 25,
                    paddingLeft: 8,
                    paddingTop: 3,
                    marginTop: -25
                  }}
                  />
                </View>
                :
                <Thumbnail
                  style={{ padding: 5, borderColor: "white" }}
                  large
                  source={this.props.user.user.profile.avatar}
                />
            }

            <View style={{ flex: 1, marginTop: 3, marginBottom: 3 }}>
              <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', paddingLeft: 2 }} >
                {
                  typeof this.props.user.user.profile !== "undefined" &&
                  this.props.user.user.profile.firstName + " " + this.props.user.user.profile.lastName
                }
              </Text>
              <Text style={{ color: '#372B25', fontSize: 13, textAlign: 'center', paddingLeft: 2, fontWeight: '500' }} >
                {
                  typeof this.props.user.user.profile !== "undefined" &&
                  this.props.user.user.profile.countryName
                }
              </Text>
            </View>
          </View>
        </View>
        }
        <SettingForm />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.route,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingComponent);

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  avatar: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: 'white',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  drawerImg: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  itemStyle: {
    color: "#f48221",
    fontStyle: "italic"
  },
  activeLabelStyle: {
    color: 'black',
    fontWeight: '500'
  }
})




// <View style={classes.avatar} >
                    //   <Text
                    //     style={{
                    //       fontSize: 40,
                    //       fontWeight: '600',
                    //       justifyContent: 'center',
                    //       alignContent: 'center'
                    //     }}
                    //   >
                    //     {this.props.user.user.profile.firstName.charAt(0).toUpperCase() + this.props.user.user.profile.lastName.charAt(0).toUpperCase()}

                    //   </Text>

                    // </View>