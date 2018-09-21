import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Thumbnail, Spinner, Picker, Container } from 'native-base';
import { Post } from '../../../components/reuse/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../../store/actions/user';
import { getvodlist, getvodlistupdate, refresh } from '../../../store/actions/data';
import { Button } from 'react-native-paper';

class Vod extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ color: '#372B25', fontSize: 20 }} >Videos on Demand</Text>
        </View>
      ),
      headerRight: (
        <Picker
          // note
          mode="dropdown"
          style={{ width: 120, color: 'black' }}
          selectedValue={
            typeof navigation.state.params !== "undefined" ?
              typeof navigation.state.params.selected !== "undefined" &&
                navigation.state.params.selected
            :
              ""
          }
          onValueChange={(value) => navigation.state.params.onValueChange(value)}
        >
          <Picker.Item label="All" value="key0" />
          <Picker.Item label="Action" value="key1" />
          <Picker.Item label="Drama" value="key2" />
          <Picker.Item label="Thriller" value="key3" />
          <Picker.Item label="Series" value="key4" />
        </Picker>
      ),
      headerStyle: {
        backgroundColor: '#f48221',
        height: 40,
        // marginTop: Platform.OS === "ios" ? -40 : 0
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: 'key0',
      noContent: false
    }
  }

  _onRefresh = () => {
    this.props.refresh();
    let obj = {
      // "sorted": "added",
      // "filters": {
      //   "categories": "subscribers"
      // }
    }
    Post('/tvod/list', obj).then((res) => {
      if (!res.error) {
        this.props.getvodlistupdate(res.content.entries);
      } else {
        this.props.refresh();
      }
    })
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
    this.props.navigation.setParams({
      selected: value
    })
  }

  componentDidMount() {
    // get list of vod
    this.getVodLists();

    this.props.navigation.setParams({
      onValueChange: this.onValueChange.bind(this)
    })
    this.props.navigation.setParams({
      selected: this.state.selected
    })
  }


  getVodLists() {
    let obj = {
      // "sorted": "added",
      // "filters": {
      //   "categories": "subscribers"
      // }
    }
    Post('/tvod/list', obj).then((res) => {
      console.log("LIST FILTERS", res);
      if (!res.error) {
        if (typeof res.content.entries !== "undefined") {
          this.props.getvodlist(res.content.entries);
        }
        if (res.content.entryCount == 0) {
          this.setState({
            noContent: true
          })
        }
      } 
    })
  }


  render() {
    if (this.state.noContent) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: '#242424' }} >
          <Button mode="contained" disabled  >
            <Text style={{ color: "#f48221" }}> Currently No Content</Text>
          </Button>
        </View>
      )
    }
    return (
      <Container  style={{ backgroundColor: '#242424' }}>
          {this.props.data.vodLoading ? (
          <View
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="white" />
          </View>
        ) : (
          <FlatList
            data={this.props.data.vodList}
            refreshControl={
              <RefreshControl
                refreshing={this.props.data.refreshing}
                onRefresh={this._onRefresh}
                progressBackgroundColor="black"
                enabled={true}
                colors={['white']}
              />
            }
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => ( 
              <View style={styles.body} >
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Voddetails', 
                  { 
                    item: item, 
                    user: this.props.user.user 
                  }
                )}
              >
                <View style={{ flexDirection: 'row' }} >
                  {
                    item.content.map((img, index) => (
                      typeof img["PosterH"] !== "undefined" &&
                      <Thumbnail
                        key={index}
                        style={{
                          marginRight: 10
                        }}
                        square
                        large
                        source={{ uri: img["PosterH"] }}
                      />
                    ))
                  }
                  <View style={{ flexDirection: 'column' }} >
                    <Text style={styles.liveName} >{item.title}</Text>
                    <Text style={{ color: 'white', fontWeight: '200', paddingHorizontal: 5 }}>
                      {item.description.substr(0, 80) + ' ...'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            )}
          />
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: '#242424'
  },
  liveName: {
    color: "#FB8C00",
    paddingTop: 10,
    // paddingHorizontal: 5,
    paddingBottom: 5,
    fontWeight: '700'
  },
  summary: {
    color: "white"
  },
  body: {
    flex: 1,
    // border: '#414141',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopColor: '#414141',
    borderBottomColor: '#414141',
    // height: 50,
    marginBottom: 5, 
    backgroundColor: '#414141',
    padding: 10
  }
})

const Vods = withNavigation(Vod);
function mapStateToProps(state) {
  return {
    data: state.data,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getvodlist: getvodlist,
    getvodlistupdate: getvodlistupdate,
    refresh: refresh
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Vods);
