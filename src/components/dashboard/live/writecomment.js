import React, { Component } from 'react';
import { StyleSheet, Keyboard, Text, View, TouchableOpacity, Platform } from 'react-native';
import { commenttext, votingtoggle, setCurrentCommentId } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Icon } from 'native-base';
import firebase from 'react-native-firebase';

class WriteComment extends Component {
  _onChange(event) {
    // this.setState({ textValue: event.nativeEvent.text || '' });
    // this.props.setReview(event.nativeEvent.text);
    this.props.commenttext(event.nativeEvent.text);
  }

  handleEdit(){
    let database = firebase.database();
    database.ref('comments/' + this.props.community.commentId).update({
      text: this.props.community.commentText,
      updated: database.getServerTime()
    });
    this.props.setCurrentCommentId("");
    this.props.commenttext("");
    Keyboard.dismiss();
  }

  handleSend(){
    let database = firebase.database();
    let newDataRef = database.ref("comments").push({});
    let obj = {
      id: newDataRef.key,
      userId: this.props.user.user.id,
      name: this.props.user.user.profile.firstName + " " + this.props.user.user.profile.lastName,
      img: this.props.user.user.profile.avatar != null ? this.props.user.user.profile.avatar : "empty",
      text: this.props.community.commentText,
      created: database.getServerTime(),
      updated: database.getServerTime()
    }
    database.ref("comments/" + newDataRef.key).update(obj);
    Keyboard.dismiss();
    this.props.commenttext("");
    this._textInput.clear();
    this._textInput.resetHeightToMin();
  }

  sendReview = () => {
    if (this.props.community.commentId == "") {
      this.handleSend();
    } else {
      this.handleEdit();
    }
  }
  
  render() {
    return (
      <View style={[styles.textInputContainer, {bottom: this.props.community.votingToggle ? 40 : 0}]}>
        <TouchableOpacity
          style={{ 
            bottom: 6, 
            position: 'absolute', 
          }}
        >
          <Text style={{ fontSize: 25, color: "gray" }} >😊</Text>
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
    votingtoggle: votingtoggle,
    setCurrentCommentId: setCurrentCommentId
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
    zIndex: 999999,
    paddingLeft: 5,
    paddingRight: 8,
    backgroundColor: "white"
  },
  welcome: {
    marginTop: 100,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    paddingLeft: 5,
    marginLeft: 30,
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
    bottom: 2,
    // left: 0,
    right: 5,
    position: 'absolute'
  }
});