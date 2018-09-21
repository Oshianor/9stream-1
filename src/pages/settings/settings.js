import React, { Component } from 'react';
import { Icon, Button, Text } from "native-base";
import { AsyncStorage } from 'react-native';
import Setting from '../../components/settings/settings';
import { getUserObject } from "../../store/actions/user";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Settings extends Component {
  static navigationOptions = {
    // title: 'Settings',
    header: null,
  }

  // constructor(props) {
  //   super(props);
    
  //   this.state = {
  //     user: {}
  //   }
  // }
  

  // async componentDidMount() {
  //   let value = await AsyncStorage.getItem('user');
  //   if (JSON.parse(value) !== null) {
  //     this.setState({
  //       user: JSON.parse(value)
  //     })
  //     console.log("User SEtting", JSON.parse(value));
      
  //   }
  // }
  

  render() {
    return (
      <Setting navigation={this.props.navigation} />
    )
  }
}

// export default Settings;
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserObject: getUserObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);