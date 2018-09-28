import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Header, Left, Body, Right, Subtitle, Title } from 'native-base';
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import { Get } from "../../reuse/get";
import { Post } from "../../reuse/post";
import { celeb, voting } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Voting extends Component {
  state = {
    voteCount: null
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem(key, JSON.stringify(item));
      // return jsonOfItem;
    } catch (error) {
      // console.log(error.message);
    }
  }

  getData = () => {
    if (typeof this.props.community.celeb[0] === "undefined") {
      Get("/celebrity/list").then(res => {
        if (!res.error) {
          this.props.celeb(res.content.entries);
          this.storeItem(res.content.entries);
        }
      })
    }
    Get("/vote/get_available_votes?user_id=" + this.props.userId).then(res => {
      if(!res.error) {
        this.setState({
          voteCount: res.content.available_votes
        })
      }
    })
  }

  render() {
    return (
      <Modal
        isVisible={this.props.community.voting}
        onModalShow={this.getData}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Header>
            <Left />
            <Body>
              <Title>Voting</Title>
              <Subtitle>
              {
                this.state.voteCount == null ?
                  "You are currently out of voting credit."
                :
                  `You have ${this.state.voteCount} left`
              }
            </Subtitle>
            </Body>
            {/* <Right /> */}
          </Header>
          <Content>
            {/* {
              typeof this.props.community.celeb[0] !==  "undefined" &&
              this.props.community.celeb.map((cele, index) => (
                <List key={index} >
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={{ uri: cele.content[1].downloadUrl }} />
                    </Left>
                    <Body>
                      <Text>{cele.title}</Text>
                    </Body>
                    <Right>
                      <Button>VOTE</Button>
                    </Right>
                  </ListItem>
                </List>
              ))
            } */}
        </Content>
        <Button mode="outlined" onPress={() => this.props.voting(false)} >close</Button>
        </View>
      </Modal>
    );
  }
}

// export default Voting;
function mapStateToProps(state) {
  return {
    community: state.community
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    celeb: celeb,
    voting: voting
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);
