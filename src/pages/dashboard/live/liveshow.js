import React, { Component } from 'react';
import Video from "../../../components/dashboard/live/components/Video";
import swap from "../../../assets/9stream.png"

export default class Liveshow extends Component {
  // static navigationOptions = {
  //   header: null
  // }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    // const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    // const header = state.params && (state.params.text ? undefined : null)
    // const tabBarVisible = state.params ? state.params.text : false
    return {
      // For stack navigators, you can hide the header bar like so
      header: null,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible: false,
    }
  }
  
  render() {
    return (
      <Video
        title="more"
        placeholder={
          "https://img.grepmed.com/uploads/1936/interpretation-endtidalco2-capnography-waveforms-diagnosis-original.jpeg"
        }
        logo={
          "https://img.grepmed.com/uploads/1936/interpretation-endtidalco2-capnography-waveforms-diagnosis-original.jpeg"
        }
        ref={(ref) => { this.video = ref }}
        url={"https://uvodscp-lh.akamaihd.net/i/rjrretvdirect_1@506691/master.m3u8"}
        rotateToFullScreen
      />
    )
  }
}
