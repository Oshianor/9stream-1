import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem, Icon, Left, Body, Right, Switch, Button, Thumbnail } from 'native-base';
import { View, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import profile from "../../assets/profile.jpg";
import nine from "../../assets/9stream.png";
import { getCurrentRoute } from "../../store/actions/route";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Sidebar extends Component {
  handleRoute(route) {
    this.props.getCurrentRoute(route);
    this.props.onClose();
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'black', flex: 1, alignContent: "center", justifyContent: "center" }} >
        <Content>
          <View  >
            <Thumbnail style={{ marginTop: '5%', left: '40%', right: '40%' }} large source={profile} />
            <Text style={{ color: 'white', fontSize: 18, fontFamily: 'monospace', textAlign: 'center' }} >Abundance Oshianor</Text>
          </View>

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "profile")} icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active type="MaterialIcons" name="account-circle" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Profile</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "community")} icon>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active type="MaterialIcons" name="group" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Community</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "vod")} icon>
              <Left>
                <Button style={{ backgroundColor: "black" }}>
                  <Icon active type="MaterialIcons" name="ondemand-video" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Video on Demand</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "swap")} icon>
              <Left>
                <Button style={{ backgroundColor: "red" }}>
                  <Icon active type="MaterialIcons" name="swap-calls" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Swap</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "trending")} icon>
              <Left>
                <Button style={{ backgroundColor: "green" }}>
                  <Icon active type="MaterialIcons" name="trending-up" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Trending</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

          {/* <TouchableHighlight underlayColor="white"> */}
            <ListItem onPress={this.handleRoute.bind(this, "subscribe")} icon>
              <Left>
                <Button style={{ backgroundColor: "#f48221" }}>
                  <Icon active type="MaterialIcons" name="subscriptions" />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }} >Subscribe</Text>
              </Body>
            </ListItem>
          {/* </TouchableHighlight> */}

        </Content>
        <Text style={{ color: 'white', padding: 10, fontSize: 12 }} >
          <Image source={nine} width={15} height={15} /> (c) copyright 2018
        </Text>
      </Container>
    );
  }
}

// export default Sidebar;
function mapStateToProps(state) {
  return {
    route: state.route,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrentRoute: getCurrentRoute,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);