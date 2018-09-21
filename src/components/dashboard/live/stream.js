import React, { Component } from 'react'
import {
  StyleSheet, View, ScrollView, Alert, Text, TouchableOpacity,
  KeyboardAvoidingView,
  TextInput, } from 'react-native'
import { withNavigation } from 'react-navigation';
import Video from 'react-native-af-video-player';
import { toggleCurrentModalStatusTrue, toggleCurrentModalStatusFalse, getAllImages } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Thumbnail,
  Button,
} from "native-base";
// import { Col, Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      comments: [],
      text: '',
      height: 0
    }
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert(
      'Boom',
      'This is an action call!',
      [{ text: 'Aw yeah!' }]
    )
  }

  openModal = () => {
    this.props.toggleCurrentModalStatusTrue();
    // this.props.toggleCurrentFabStatusFalse();
  }

  displayFab = () => {
    return (
      <View >
        <Fab
          direction="up"
          containerStyle={{ backgroundColor: 'transparent' }}
          style={styles.elev}
          position="bottomRight"
          onPress={this.openModal}
        >
          <Icon name="ios-create" />
        </Fab>
      </View >
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          // autoPlay
          title="Swap Time"
          url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          title="Swap Show"
          logo={'http://placehold.it/120x120&text=image1'}
          placeholder='http://placehold.it/120x120&text=SWAP'
          // onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          // fullScreenOnly
          rotateToFullScreen
        />
        
        {this.displayFab()}
        {
          this.props.community.modalStatus === 'input' &&
            <Input />
        }
        {
          this.props.community.modalStatus === 'images' &&
            <Images />
        }
      </View>
    )
  }
}

// export default Stream;
function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // toggleCurrentFabStatusTrue: toggleCurrentFabStatusTrue,
    // toggleCurrentFabStatusFalse: toggleCurrentFabStatusFalse,
    toggleCurrentModalStatusTrue: toggleCurrentModalStatusTrue,
    toggleCurrentModalStatusFalse: toggleCurrentModalStatusFalse,
    getAllImages: getAllImages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);








{/* <ScrollView>
  <Text style={{ color: "black" }} >EEEEEEEEEEEEEEEEEEEEEEEEE
          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</Text> */}
  {/* <View style={{ flex: 1 }} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LiveShowList')} >
              <View style={{ flexDirection: 'row' }} >
                <Thumbnail large source={{ uri: item.img }} />
                <Text style={styles.liveName} >{item.name}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, paddingTop: 10 }}>
              {
                item.summary.length > 150 ?
                  this.state.more !== item.id ?
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.summary}>
                        {item.summary.substring(0, 1580)}
                      </Text>
                      <TouchableOpacity onPress={() => this.setState({ more: item.id })} >
                        <Text style={{ color: 'orange' }} > ...see more</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <Text style={styles.summary}>{item.summary}</Text>
                  :
                  <Text style={styles.summary}>{item.summary}</Text>
              }
            </View>
          </View> */}
  {/* <Comment /> */}
  {/* <View style={styles.commentInput}> */}
  {/* <KeyboardAvoidingView
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
              behavior="position"
            >
              <Grid>
                <Col size={75}>
                  <TextInput
                    {...this.props}
                    multiline={true}
                    spellCheck={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                      this.setState({ text })
                    }}
                    onContentSizeChange={(event) => {
                      this.setState({ height: event.nativeEvent.contentSize.height })
                    }}
                    style={[styles.input, { height: Math.max(35, this.state.height) }]}
                    value={this.state.text}
                  />
                </Col>
                <Col size={25}>
                  <TouchableOpacity style={styles.button} onPress={this.handleComment}  >
                    <Text style={styles.buttonText}>SEND</Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
            </KeyboardAvoidingView> */}
  {/* </View> */}
{/* </ScrollView> */}
































































// import React, { Component } from 'react';
// import { Container, Content, Text } from 'native-base';
// import { View } from 'react-native';
// import { TouchableOpacity } from 'react-native';

// class Swapnolive extends Component {
//   render() {
//     return (
//       <Container style={{
        
//         backgroundColor: "black" }} >
//         <Content >
//           <View style={{
//             flex: 1, alignItems: 'center',
//             justifyContent: 'center' }} >
//             <Text style={{ color: 'black' }} >
//               THERE CURRENTLY NO LIVE SWAP EPISODE STREAMING
//             </Text>
//           </View>
//           <View>
//             <Text style={{ color: 'black' }} >
//               Missed an Episode?
//             </Text>
          
//           <TouchableOpacity>
//             <Text style={{ color: 'black' }} >
//               WATCH NOW
//             </Text>
//           </TouchableOpacity>
//           </View>
//         </Content>
//       </Container>
//     );
//   }
// }

// export default Swapnolive;