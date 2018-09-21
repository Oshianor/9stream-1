import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableHighlight
} from "react-native";
import { Text, Thumbnail, Content, Container } from "native-base";
import gone from '../../../../assets/aqua.jpg';

class Notify extends Component {
  render() {
    console.log("Notificartionsssss");

    return (
      <Container>
        <Content>
          <View style={styles.tweet}>
            <TouchableHighlight
              // onPress={this._profileClick.bind(this, item.user)}
              underlayColor="white"
              activeOpacity={0.75}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Thumbnail source={gone} />

                {/* body */}
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text style={{ paddingLeft: 15, fontWeight: "bold", fontSize: 20 }} >
                    Abundance Oshianor
                    <Text style={{ fontWeight: '300' }} >{" "}liked you post</Text>
                  </Text>
                </View>

                {/* lime */}
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text>8h</Text>
                </View>

              </View>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Notify;
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

