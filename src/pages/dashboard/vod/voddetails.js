import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import WriteReview from '../../../components/dashboard/vod/writereview';
import { Post } from '../../../components/reuse/post';
import { Snackbar, Button } from 'react-native-paper';
import Review from '../../../components/dashboard/vod/review';
import Rating from '../../../components/dashboard/vod/rating';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserObject } from '../../../store/actions/user';
import Video from "react-native-af-video-player";

class Voddetails extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: (
  //       <View style={{ paddingLeft: 20 }} >
  //         <Text style={{ color: '#FB8C00', fontSize: 20 }} >
  //           {navigation.state.params.item.title}
  //         </Text>
  //       </View>
  //     ),
  //     headerStyle: {
  //       backgroundColor: 'black'
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //     },
  //   }
  // };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    return {
      header,
      tabBarVisible,
      headerTitle: (
        <View style={{ paddingLeft: 20 }} >
          <Text style={{ color: '#FB8C00', fontSize: 20 }} >
            {navigation.state.params.item.title}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }

  constructor(props) {
    super(props);
    
    this.state = {
      review: '',
      user: [],
      text: '',
      visible: false,
      vid: null,
      img: null,
      trailer: null,
      video: false,
    }
  }

  componentDidMount(){
    const item = this.props.navigation.state.params.item.content;
    item.forEach(element => {
      if (typeof element["PosterH"] !== "undefined") {
        this.setState({
          img: element["PosterH"]
        })
      }
      if (typeof element["HLSStream"] !== "undefined") {
        this.setState({
          vid: element["HLSStream"]
        })
      }
      if(typeof element['mainTrailer'] !==  "undefined") {
        this.setState({
          trailer: element['mainTrailer']
        })
      }
    });
    this.setState({
      loading: false
    })
  }

  handleVideo = () => {
    this.setState({
      visible: true,
      text: "This features isn't available for on this version"
    })
  }
  
  handleReview(){
    const user = this.props.navigation.state.params.user;
    let obj = {
      token: user.token,
      reference_id: this.props.navigation.state.params.item._id,
      review: this.state.text
    }
    // console.log("ONNN",obj);
    
    if (this.state.review !== "") {
      Post('/review/save', obj).then(res => {
        console.log("REVIEW", res);
        if (!res.error) {
          this.setState({
            text: 'Review Successfully Added.',
            visible: true,
            review: ''
          })
        }
      }) 
    } else {
      this.setState({
        review: ''
      })
    }
  }

  setReview(review){
    this.setState({
      review
    })
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  sendError = () => {
    this.setState({
      text: 'Something Went Wrong.',
      visible: true
    })
  }

  render() {
    const theme = {
      title: '#FFF',
      more: '#446984',
      center: '#7B8F99',
      fullscreen: '#446984',
      volume: '#A5957B',
      scrubberThumb: '#234458',
      scrubberBar: '#DBD5C7',
      seconds: '#DBD5C7',
      duration: '#DBD5C7',
      progress: '#446984',
      loading: '#DBD5C7'
    }

    const item = this.props.navigation.state.params.item;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <ScrollView>
           <Video
            ref={(ref) => { this.video = ref }}
            title={item.title}
            url={this.state.trailer}
            logo={item.img}
            theme={theme}
            onFullScreen={status => this.onFullScreen(status)}
            fullScreenOnly
            rotateToFullScreen
          />
          <View style={{ justifyContent: 'center' }} >
            <Button mode="outlined" color="orange" compact >Watch Full Movie</Button>
            <Text style={{ color: '#757575', padding: 5, marginTop: 10 }} >
              {item.description}
            </Text>

            <View>
              <Rating
                user={this.props.navigation.state.params.user}
                vodId={this.props.navigation.state.params.item._id} 
                sendError={this.sendError.bind(this)}
              />
              <Text style={{ alignSelf: 'flex-start', fontWeight: '700', color: '#424242', padding: 5, fontSize: 15 }} >
                All Reviews
              </Text>
              <Review 
                sendError={this.sendError.bind(this)} 
                vodId={this.props.navigation.state.params.item._id} 
                user={this.props.navigation.state.params.user} 
              />
            </View>
          </View>

          {/* text field to write a review */}
          <WriteReview 
            review={this.state.review} 
            handleReview={this.handleReview.bind(this)}
            setReview={this.setReview.bind(this)}
          />
        </ScrollView>
        
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
          duration={this.state.duration}
        >
          {this.state.text}
        </Snackbar>
      </View>
    );
  }
}

// export default Voddetails;
function mapStateToProps(state) {
  return {
    data: state.route,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserObject: getUserObject,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Voddetails);

// const styles = StyleSheet.create({

// })


{/* <TouchableOpacity onPress={this.handleVideo} >
            {
              this.props.navigation.state.params.item.content.map((img, index) => (
                typeof img["PosterH"] !== "undefined" &&
                  <ImageBackground
                    key={index}
                    source={{ uri: img["PosterH"] }}
                    style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Icon
                      name="ios-play"
                      style={{
                        fontSize: 70, justifyContent: 'center',
                        color: 'gray'
                      }}
                    />
                  </ImageBackground>
              ))
            }
          </TouchableOpacity> */}