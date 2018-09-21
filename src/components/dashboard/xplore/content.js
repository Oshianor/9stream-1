import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Spinner, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Surface, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../../store/actions/user';
import { getxplorelist, getxplorelistupdate, getxplorevideo, getxploreimage, refresh, getxploreloading } from '../../../store/actions/data';
import { Post } from '../../reuse/post';
const { width, height } = Dimensions.get('window');

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({
      _id: `blank-${numberOfElementsLastRow}`,
      title: "",
      runtime: '',
      content: [],
      empty: true
    });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      more: ""
    }
  }

  _onRefresh = () => {
    this.props.refresh();
    // let obj = { categories: "free" };
    let obj = {
      "sorted": "added",
      "filters": {
        "categories": "members"
      },
    }

    Post('/vod/list', obj).then((res) => {
      if (!res.error) {
        this.props.getxplorelist(res.content.entries);
      } else {
        this.props.getxploreloading();
      }
    })
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity onPress={ () => {
          this.props.navigation.navigate("XploreWatch", { item: item })}
        }
      >
      {
        item.content.map((img, index) => (
          typeof img["PosterH"] !== "undefined" &&
          <Surface style={styles.surface} key={index}>
            <Thumbnail
              key={index}
              style={{ width: (width / 3 - 8), height: height / 8 }}
              square
              large
              source={{ uri: img["PosterH"] }}
            />
            <Text   
              style={{ color: 'gray', alignItems: 'flex-start', flexWrap: 'nowrap' }} >
              {item.title}
            </Text>
          </Surface>
        ))
      }
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    let obj = {
      "sorted": "added",
      "filters": {
        "categories": "members"
      },
    }
    Post("/vod/list", obj).then((res) => {
      if (!res.error) {
        this.props.getxplorelist(res.content.entries);
      } else {
        this.props.getxploreloading();
      }
    });
  }

  render() {
    return (
      <View style={{ 
        flex: 1,
        marginVertical: 5,
        }}
        contentContainerStyle={{
          backgroundColor: 'black',
        }}
      >
        {this.props.xploreLoading ? (
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
          <View
            style={{  
              flex: 1,
              backgroundColor: 'black'
            }}
          >
            <Text style={{ 
              fontSize: 20,
              fontStyle: "italic",
              textAlign: 'center',
              color: 'white'
              }}
            >
              Explore Our Free Contents
            </Text>
            <FlatList
              data={formatData(this.props.data.xploreList, numColumns)}
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.data.refreshing}
                  onRefresh={this._onRefresh}
                  progressBackgroundColor="black"
                  enabled={true}
                  colors={['white']}
                />
              }
              numColumns={numColumns}
              keyExtractor={(item, index) => item + index}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: 'black'
  },
  surface: {
    // height: 130,
    width: (width / 3 - 5),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: 'black'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});

const Contents = withNavigation(Content);
function mapStateToProps(state) {
  return {
    data: state.data,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
    getxplorelist: getxplorelist,
    getxplorelistupdate: getxplorelistupdate,
    refresh: refresh,
    getxploreloading: getxploreloading,
    getxplorevideo: getxplorevideo,
    getxploreimage: getxploreimage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
