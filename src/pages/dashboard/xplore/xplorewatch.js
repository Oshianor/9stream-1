import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { Spinner, Header, Body } from "native-base";
import Video, { Container } from 'react-native-af-video-player';
import { setCurrentCommentId, passCurrentComentReplyObjectData } from "../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class LiveShow extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    // const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    // const header = state.params && (state.params.text ? undefined : null)
    // const tabBarVisible = state.params ? state.params.text : false
    return {
      // For stack navigators, you can hide the header bar like so
      header: null,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      video: {},
      height: 0,
      loading: true,
      refreshing: false,
      vid: null,
      img: null
    }
  }
  
  // make avideo fullscreen
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: status
    })
  }

  componentDidMount(){
    // console.log(this.props.navigation.state.params.item);
    
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
    });
    this.setState({
      loading: false
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

    return (
      <View style={styles.container}>
        {
          this.state.loading ?
          <View
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spinner color="white" />
          </View>
          :
          <Container>
            <Video
              autoPlay
              ref={(ref) => { this.video = ref }}
              title={this.props.navigation.state.params.item.title}
              url={this.state.vid}
              logo={this.state.img}
              placeholder={this.state.img}
              theme={theme}
              // onMorePress={() => this.onMorePress()}
              onFullScreen={status => this.onFullScreen(status)}
              fullScreenOnly
              rotateToFullScreen
            />
            <Header style={{ backgroundColor: "#f48221" }} >
              <Body>
                <Text>
                  {this.props.navigation.state.params.item.title}
                </Text>
              </Body>
            </Header>
            <Text style={{ color: "gray", marginHorizontal: 5, marginVertical: 10 }} >
              {this.props.navigation.state.params.item.description}
            </Text>

            <View style={{ flex: 1, marginTop: 10 }} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: '#242424' }} >
                <Button mode="contained" disabled  >
                  <Text style={{ color: "#f48221" }}>More related content</Text>
                </Button>
              </View>
            </View>
          </Container>
        }
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    route: state.route,
    community: state.community,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentCommentId: setCurrentCommentId,
    passCurrentComentReplyObjectData: passCurrentComentReplyObjectData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveShow);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});





























































// import React, { Component } from 'react';
// import { View, ImageBackground, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
// import { Icon } from 'native-base';
// import WriteReview from '../../../components/dashboard/vod/writereview';
// import { Post } from '../../../components/reuse/post';
// import { Snackbar, Button } from 'react-native-paper';
// import Review from '../../../components/dashboard/vod/review';
// import Rating from '../../../components/dashboard/vod/rating';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { getUserObject } from '../../../store/actions/user';

// class Voddetails extends Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       headerTitle: (
//         <View style={{ paddingLeft: 20 }} >
//           <Text style={{ color: '#FB8C00', fontSize: 20 }} >
//             {navigation.state.params.item.title}
//           </Text>
//         </View>
//       ),
//       headerStyle: {
//         backgroundColor: 'black'
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }
//   };

//   constructor(props) {
//     super(props);
    
//     this.state = {
//       review: '',
//       user: [],
//       text: '',
//       visible: false,
//       vid: null,
//       img: null,
//       trailer: null
//     }
//   }

//   componentDidMount(){
//     const item = this.props.navigation.state.params.item.content;
//     item.forEach(element => {
//       if (typeof element["PosterH"] !== "undefined") {
//         this.setState({
//           img: element["PosterH"]
//         })
//       }
//       if (typeof element["HLSStream"] !== "undefined") {
//         this.setState({
//           vid: element["HLSStream"]
//         })
//       }
//       if(typeof element['mainTrailer'] !==  "undefined") {
//         this.setState({
//           trailer: element['mainTrailer']
//         })
//       }
//     });
//     this.setState({
//       loading: false
//     })
//   }

//   handleVideo = () => {
//     this.setState({
//       visible: true,
//       text: "This features isn't available for on this version"
//     })
//   }
  
//   handleReview(){
//     const user = this.props.navigation.state.params.user;
//     let obj = {
//       token: user.token,
//       reference_id: 1,
//       review: this.state.text
//     }
//     console.log("ONNN",obj);
    
//     if (this.state.review !== "") {
//       Post('/review/save', obj).then(res => {
//         // console.log("REVIEW", res);
//         if (!res.error) {
//           this.setState({
//             text: 'Review Successfully Added.',
//             visible: true,
//             review: ''
//           })
//         }
//       }) 
//     } else {
//       this.setState({
//         review: ''
//       })
//     }
//   }

//   setReview(review){
//     this.setState({
//       review
//     })
//   }

//   sendError = () => {
//     this.setState({
//       text: 'Something Went Wrong.',
//       visible: true
//     })
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: 'white' }} >
//         <ScrollView>
//           <TouchableOpacity onPress={this.handleVideo} >
//             {
//               this.props.navigation.state.params.item.content.map((img, index) => (
//                 typeof img["PosterH"] !== "undefined" &&
//                   <ImageBackground
//                     key={index}
//                     source={{ uri: img["PosterH"] }}
//                     style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}
//                   >
//                     <Icon
//                       name="ios-play"
//                       style={{
//                         fontSize: 70, justifyContent: 'center',
//                         color: 'gray'
//                       }}
//                     />
//                   </ImageBackground>
//               ))
//             }
//           </TouchableOpacity>
//           <View style={{ justifyContent: 'center' }} >
//             <Button mode="outlined" compact >Watch Trailer</Button>
//             <Text style={{ color: '#757575', padding: 5, marginTop: 10 }} >
//               {this.props.navigation.state.params.item.description}
//             </Text>

//             <View>
//               <Rating
//                 user={this.props.navigation.state.params.user}
//                 vodId={this.props.navigation.state.params.item._id} 
//                 sendError={this.sendError.bind(this)}
//               />
//               <Text style={{ alignSelf: 'flex-start', fontWeight: '700', color: '#424242', padding: 5, fontSize: 15 }} >
//                 All Reviews
//               </Text>
//               <Review 
//                 sendError={this.sendError.bind(this)} 
//                 vodId={this.props.navigation.state.params.item._id} 
//                 user={this.props.navigation.state.params.user} 
//               />
//             </View>
//           </View>

//           {/* text field to write a review */}
//           <WriteReview 
//           review={this.state.review} 
//           handleReview={this.handleReview.bind(this)}
//           setReview={this.setReview.bind(this)}
//         />
//         </ScrollView>
        
//         <Snackbar
//           visible={this.state.visible}
//           onDismiss={() => this.setState({ visible: false })}
//           action={{
//             label: 'Hide',
//             onPress: () => { this.setState({ visible: false }) },
//           }}
//           duration={this.state.duration}
//         >
//           {this.state.text}
//         </Snackbar>
//       </View>
//     );
//   }
// }

// // export default Voddetails;
// function mapStateToProps(state) {
//   return {
//     data: state.route,
//     user: state.user
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     getUserObject: getUserObject,
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Voddetails);



