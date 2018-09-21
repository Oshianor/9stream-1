import React, { Component } from 'react';
import { Spinner, Thumbnail } from 'native-base';
import { FlatList, RefreshControl, StyleSheet, Platform, View, Text } from 'react-native';
import { Post } from '../../reuse/post';
import gone from '../../../assets/aqua.jpg';

class Review extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      review: [
        {
          firstName: "dub",
          lastName: "for",
          url: null,
          created: new Date('12/12/2018'),
          review: 'vghbjdhjnkgnkfn fnjfbnj '
        },
        {
          firstName: "dub",
          lastName: "for",
          url: null,
          created: new Date('12/12/2018'),
          review: 'vghbjdhjnkgnkfn fnjfbnj '
        },
      ],
      loading: true,
      refreshing: true
    }
  }
  
  componentDidMount() {
    Post('/review/list_by_reference', this.props.vodId).then(res => {
      if (res.error === false) {
        this.setState({
          review: res.content,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
        this.props.sendError();
      }
    })
  }
  
  _onRefresh = () => {
    this.setState({
      refreshing: true
    })
    Post('/review/list_by_reference', this.props.vodId).then(res => {
      if (res.error === false) {
        this.setState({
          review: res.content,
          refreshing: false
        })
      } else {
        this.setState({
          refreshing: false
        })
        this.props.sendError();
      }
    })
  }

  render() {
    return (
      <View>
        {
          this.state.loading ?
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="black" />
            </View>
          :
            <FlatList
              data={this.state.review}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  progressBackgroundColor="black"
                  enabled={true}
                  colors={['white']}
                />
              }
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View style={styles.tweetReply} >
                  <Thumbnail style={{ borderWidth: 1, borderColor: "white" }} small source={gone} />
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10,
                      width: "93%"
                    }}
                  >
                    <View style={{ flexDirection: "row", maxHeight: 22 }}>
                      <Text>
                        {item.firstName + " " + item.lastName}
                      </Text>
                      {/* <Text
                        style={{ color: "#888", flex: 1, textAlign: 'right' }}
                      >
                        {item.created.toString()}
                      </Text> */}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 5
                      }}
                    >
                      <Text style={{ color: "black", flex: 1 }}>
                        {item.review}
                      </Text>
                    </View>
                    <View
                      style={StyleSheet.flatten([
                        styles.tweetFooter,
                        { width: "100%" }
                      ])}
                    >
                    </View>
                  </View>
                </View>
              )}
            />
        }
      </View>
    );
  }
}

export default Review;
const styles = StyleSheet.create({
  elev: {
    backgroundColor: 'orange',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  container: {
    flex: 1,
  },
  commentInput: {
    // height: 200
  },
  input: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'white',
    // color: 'black',
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    zIndex: 900000,
    elevation: 100000
  },
  // elev: {
  //   backgroundColor: 'orange'
  // },
  topMargin: {
    // marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 15,
    // color: "#555"
    color: 'black'
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  timeStamp: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetReply: {
    flex: 1,
    // borderColor: 'red', borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0
  }
});