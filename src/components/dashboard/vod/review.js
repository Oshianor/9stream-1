import React, { Component } from 'react';
import { Spinner, Thumbnail } from 'native-base';
import { FlatList, RefreshControl, StyleSheet, Platform, View, Text } from 'react-native';
import { Get } from '../../reuse/get';
import UserAvatar from 'react-native-user-avatar';
import PropTypes from 'prop-types';


class Review extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      review: [],
      loading: false,
      refreshing: false
    }
  }
  
  componentDidMount() {
    const { vodId, sendError } = this.props;
    Get("review/list_by_reference?reference_id=" + vodId).then(res => {
      // console.log("review", res);
      
      if (res.error === false) {
        this.setState({
          review: res.content,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
        sendError();
      }
    })
  }
  
  _onRefresh = () => {
    const { vodId, sendError } = this.props;
    this.setState({
      refreshing: true
    })
    Get('/review/list_by_reference', vodId).then(res => {
      if (res.error === false) {
        this.setState({
          review: res.content,
          refreshing: false
        })
      } else {
        this.setState({
          refreshing: false
        })
        sendError();
      }
    })
  }

  render() {
    // console.log("VOD PROPS", this.props);
    const { loading, refreshing, review } = this.state;
    return (
      <View>
        {
          loading ?
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
              data={review}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this._onRefresh}
                  progressBackgroundColor="black"
                  enabled={true}
                  colors={['white']}
                />
              }
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View style={styles.tweetReply} >
                  {
                    item.userData[0].avatar == null ?
                      <UserAvatar
                        size="40"
                        name={item.userData[0].firstName + " " + item.userData[0].lastName}
                        colors={['#000', '#140202', '#372B25', '#ccaabb']}
                      />
                    :
                      <Thumbnail 
                        style={{ borderWidth: 1, borderColor: "white" }} 
                        small 
                        source={{ uri: item.userData[0].avatar }} 
                      />
                  }
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
                        {item.userData[0].firstName + " " + item.userData[0].lastName}
                      </Text>
                      <Text
                        style={{ color: "#888", flex: 1, textAlign: 'right' }}
                      >
                        {item.added.toString()}
                      </Text>
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

Review.propTypes = {
  user: PropTypes.object.isRequired,
  vodId: PropTypes.string.isRequired,
  sendError: PropTypes.func.isRequired
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