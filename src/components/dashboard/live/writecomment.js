import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { commenttext, votingtoggle } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Icon } from 'native-base';

class WriteComment extends Component {

  render() {
    return (
      <View style={[styles.textInputContainer, {bottom: this.props.community.votingToggle ? 40 : 0}]}>
        <TouchableOpacity>
          <Text style={{ fontSize: 25 }} >😊</Text>
        </TouchableOpacity>
        <AutoGrowingTextInput
          value={this.props.community.commentText}
          onChange={(event) => this._onChange(event)}
          style={styles.textInput}
          placeholder={'What do you think?'}
          placeholderTextColor='#66737C'
          onFocus={() => this.props.votingtoggle()}
          onBlur={() => this.props.votingtoggle()}
          maxHeight={180}
          minHeight={45}
          enableScrollToCaret
          ref={(r) => { this._textInput = r; }}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.sendReview}
        >
          <Icon name="ios-send" style={{ fontSize: 40, color: "black" }} />
        </TouchableOpacity>
      </View>
    );
  }

  _onChange(event) {
    // this.setState({ textValue: event.nativeEvent.text || '' });
    // this.props.setReview(event.nativeEvent.text);
    this.props.commenttext(event.nativeEvent.text);
  }

  sendReview = () => {
    // this._textInput.clear();
    this.props.handleReview();
    this._textInput.resetHeightToMin();
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    commenttext: commenttext,
    votingtoggle: votingtoggle
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);


const IsIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  textInputContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 8
  },
  welcome: {
    marginTop: 100,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    paddingLeft: 5,
    marginRight: 30,
    fontSize: 17,
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: IsIOS ? 4 : 0,
  },
  button: {
    paddingLeft: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    bottom: 0,
    // left: 0,
    right: 5,
    position: 'absolute'
  }
});