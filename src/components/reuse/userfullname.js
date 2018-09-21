import React, { Component } from 'react';
// import firebase from 'react-native-firebase';
import { Text, View } from 'react-native';
import { Get } from './get';

class Userfullname extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      profile: ""
    }
  }
  
  // componentDidMount(){
  //   // let empty = [];
  //   firebase.database().ref('users').orderByChild('id').equalTo(this.props.userId)
  //     .on("value", (snapshot) => {
  //       snapshot.forEach((data) => {
  //         // empty = empty.concat(data.val())
  //         this.setState({ user: data.val() });
  //       });
  //       // empty = [];
  //     })
  // }

  componentDidMount(){
    Get('/api/profile/1').then(res => {
      this.setState({
        profile: res
      })
    })
  }

  render() {
    // console.log("GEt full name => ", this.state);
    const profile = this.state.profile;
    return (
      <View>
        {
          this.props.type === "fullName" &&
            <Text style={this.props.style} >
              {profile.firstName + " " + profile.lastName}
            </Text>
        }
        {
          this.props.type === "firstName" &&
            <Text style={this.props.style} >
              {profile.firstName}
            </Text>
        }
        {/* {
          this.props.type === "userName" &&
          <Text style={this.props.style} >
            @{profile.userName}
          </Text>
        } */}
      </View>
    );
  }
}

export default Userfullname;
// npm install--save react - native@0.55.4