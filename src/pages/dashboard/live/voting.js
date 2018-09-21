import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon, Thumbnail, Content } from 'native-base';
import gone from '../../../assets/swapicon.png';

class Voting extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ paddingLeft: 20 }} >
          <Text style={{ color: '#FB8C00', fontSize: 20 }} >
            {navigation.state.params.item.title}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
        height: 40,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  };

  handleVideo = () => {

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }} >
        <ScrollView>
        
        <TouchableOpacity onPress={this.handleVideo} >
          <ImageBackground source={gone} style={{ height: 300, justifyContent: 'center', alignItems: 'center' }} >
            <Icon
              name="ios-play"
              style={{ fontSize: 70, justifyContent: 'center', 
                color: 'gray' }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }} >
          <Text style={{ fontWeight: '700', color: 'white', padding: 5, fontSize: 22 }} >
            The Swap Africa
          </Text>
          <Text style={{ color: 'white', padding: 5 }} >
            The Swap Africa The Swap AfricaThe Swap AfricaThe Swap Africa
            The Swap Africa The Swap AfricaThe Swap Africa The Swap Africa
            The Swap Africa The Swap Africa The Swap Africa The Swap Africa
            The Swap AfricaThe Swap Africa The Swap Africa The Swap Africa
          </Text>
          
          <View>
            <Text style={{ fontWeight: '700', color: 'white', padding: 5, fontSize: 22 }} >
              Starring
            </Text>
            {/* <ScrollView horizontal={true}>
              <View style={{ flexDirection: 'row' }} >
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
                <Thumbnail source={pic} small style={{ marginHorizontal: 2 }} />
              </View>
            </ScrollView> */}
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white'
  },
  iconDown: {
    marginLeft: 5
  },
  renderEpisodes: {
    marginTop: 10
  },
  image: {
    width: 150,
    height: 80,
    marginRight: 10
  },
  buttonPlay: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  episodeName: {
    justifyContent: 'center'
  },
  videoEpisode: {
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  },
  summary: {
    color: 'grey',
    marginVertical: 10
  }
})

export default Voting;