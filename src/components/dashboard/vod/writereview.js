import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = { textValue: '' };
  }

  render() {
    const { review } = this.props;
    return (
      <View style={styles.textInputContainer}>
        <AutoGrowingTextInput
          value={review}
          onChange={(event) => this._onChange(event)}
          style={styles.textInput}
          placeholder={'What do you think?'}
          placeholderTextColor='#66737C'
          maxHeight={180}
          minHeight={45}
          enableScrollToCaret
          ref={(r) => { this._textInput = r; }}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.sendReview}
        >
          <Icon name="ios-send" style={styles.ico} />
        </TouchableOpacity>
      </View>
    );
  }

  _onChange(event) {
    const { setReview } = this.props;
    // this.setState({ textValue: event.nativeEvent.text || '' });
    setReview(event.nativeEvent.text);
  }

  sendReview = () => {
    const { handleReview } = this.props;
    // this._textInput.clear();
    handleReview();
    this._textInput.resetHeightToMin();
  }
}

WriteReview.propTypes = {
  user: PropTypes.func.isRequired,
  handleReview: PropTypes.string.isRequired,
  setReview: PropTypes.func.isRequired
}


const IsIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red'
  },
  ico: { fontSize: 40 },
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

export default WriteReview; 