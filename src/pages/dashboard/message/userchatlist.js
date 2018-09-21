import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Thumbnail, Text, Content } from "native-base";
import gone from '../../../assets/aqua.jpg';
import Userfullname from '../../../components/reuse/userfullname';

class Messages extends Component {
  static navigationOptions = {
    title: "Messaging"
  };

  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      message: []
    }
  }

  // componentDidMount(){
  //   let empty = [];
  //   firebase.database().ref('posts').orderByValue('created').on('value', snapshot => {
  //     snapshot.forEach(data => {
  //       empty = empty.concat(data.val())
  //       this.setState({
  //         message: empty,
  //         loading: false
  //       })
  //     })
  //     empty = [];
  //   })
  // }

  displayUserChatList = () => {
    return (
      <Content>
        {/* <FlatList
          data={this.state.posts}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => ( */}
            <View style={styles.tweet}>
              <TouchableOpacity
                // onPress={this._profileClick.bind(this, item.user)}
                underlayColor="white"
                activeOpacity={0.75}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Thumbnail source={gone} />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                      <Userfullname userId="SCOVvBlmEuPyatb3GTT5on32sop1" type='fullName' style={{
                        paddingLeft: 15,
                        fontWeight: "bold",
                        fontSize: 16
                      }} />
                  </View>
                  <View style={{ right: 0, position: "absolute" }} >
                    <Text style={{ textAlign: 'right', fontSize: 10 }}>8h</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          {/* )}
        /> */}
      </Content>
    )
  }

  render() {
    return (
      <Container>
        {this.displayUserChatList()}
      </Container>
    );
  }
}

export default Messages;
const styles = StyleSheet.create({
  topMargin: {
    backgroundColor: "white",
    zIndex: -1
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
});

