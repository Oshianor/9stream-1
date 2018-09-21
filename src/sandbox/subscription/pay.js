import React, { Component } from 'react';
import { WebView, Text } from 'react-native';
import { Header, Left, Body, Container, Icon } from 'native-base';

export default class Pay extends Component{
  static navigationOptions = {
    title: "Instant Bills Pay API",
    headerStyle: {
      backgroundColor: 'black',
      color: 'white'
    },
    headerTitleStyle: {
      color: 'white'
    }
  }

  onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }

  
  render(){
    return (
        <WebView
          source={{ 
            uri: 'https://ng.instantbillspay.com/api/bill/payment',
            method: 'POST', 
            body: 'email=abundanceoshianor@gmail.com&firstname=Abundance&lastname=Oshianor&phone=08121784611&merchantID=NG0900128&uniqueID=abundanceoshianor@gmail.com&description=9stream&amount=100&returnUrl=9stream.live'
          }}
          onMessage={this.onMessage}
        />
    )
  }
}
























































// import React, { Component } from 'react';
// import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, View } from 'native-base';
// import Card from '../../../components/dashboard/subscription/card';
// import { withNavigation } from 'react-navigation';

// class Pays extends Component {
//   static navigationOptions = {
//     header: null
//   }

//   constructor(props) {
//     super(props);
    
//     this.state = {
//       route: 'card'
//     }
//   }
  
//   render() {
//     return (
//       <Container>
//         <Header hasSegment style={{ backgroundColor: 'black' }} >
//           <Left>
//             <Button onPress={ () => this.props.navigation.goBack()}  transparent>
//               <Icon name="arrow-back" />
//             </Button>
//           </Left>
//           <Body>
//             <Segment style={{ backgroundColor: 'black'  }} >
//               <Button 
//                 first
//                 onPress={() => this.setState({ route: 'card' }) }
//                  active={this.state.route === 'card' ? true : false} >
//                 <Text>Card</Text>
//               </Button>
//               <Button 
//                 last 
//                 onPress={() => this.setState({ route: '9pay' }) }
//                 active={this.state.route === '9pay' ? true : false} >
//                 <Text>9pay</Text>
//               </Button>
//             </Segment>
//           </Body>
//           <Right />
//         </Header>
//         <Content padder>
//           <View style={{ justifyContent: 'center', alignContent: 'center' }} >
//             <Text style={{ fontSize: 20 }}>
//               You are about to make a ₦{this.props.navigation.state.params.price} subscription
//           </Text>
//           </View>
//           {
//             this.state.route === 'card' &&
//               <Card />
//           }
//         </Content>
//       </Container>
//     );
//   }
// }


// export default withNavigation(Pays);