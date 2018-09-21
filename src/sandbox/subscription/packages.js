// import React, { Component } from 'react';
// import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
// import { TouchableOpacity, ScrollView, View } from 'react-native';
// import { withNavigation } from 'react-navigation';

// class Package extends Component {
//   static navigationOptions = {
//     title: "Select a package",
//     headerStyle: {
//       backgroundColor: 'black'
//     },
//     headerTitleStyle: {
//       color: 'orange'
//     }
//   }


//   render() {
//     return (
//       <Container style={{ flex: 1 }} >
//         <Content>
//           <TouchableOpacity onPress={() => this.props.navigation.navigate('Pay', { price: 100 })}>
//             <View style={{ paddingHorizontal: 20, backgroundColor: '#FFE0B2', justifyContent: 'center', alignItems: 'center' }} >
//               <View style={{ paddingTop: 40, paddingBottom: 10 }} >
//                 <Text style={{ fontSize: 40, fontFamily: 'Ubuntu' }} >₦100</Text>
//               </View>
//               <View style={{ paddingBottom: 40 }} >
//                 <Text style={{ fontSize: 20, fontFamily: 'san-serif', fontStyle: 'italic' }} >Daily</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => this.props.navigation.navigate('Pay', { price: 100 })}>
//             <View style={{ paddingHorizontal: 20, backgroundColor: '#FB8C00', justifyContent: 'center', alignItems: 'center' }} >
//               <View style={{ paddingTop: 40, paddingBottom: 10 }} >
//                 <Text style={{ fontSize: 40, fontFamily: 'Ubuntu' }} >₦100</Text>
//               </View>
//               <View style={{ paddingBottom: 40 }} >
//                 <Text style={{ fontSize: 20, fontFamily: 'san-serif', fontStyle: 'italic' }} >Daily</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => this.props.navigation.navigate('Pay', { price: 100 })}>
//             <View style={{ paddingHorizontal: 20, backgroundColor: '#FF6D00', justifyContent: 'center', alignItems: 'center' }} >
//               <View style={{ paddingTop: 40, paddingBottom: 10 }} >
//                 <Text style={{ fontSize: 40, fontFamily: 'Ubuntu' }} >₦100</Text>
//               </View>
//               <View style={{ paddingBottom: 40 }} >
//                 <Text style={{ fontSize: 20, fontFamily: 'san-serif', fontStyle: 'italic' }} >Daily</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </Content>
//       </Container>
//     );
//   }
// }

// export default withNavigation(Package);

// {/* <List>
//             <ListItem onPress={() => this.props.navigation.navigate('Pay', { price: 100 })} >
//               <Left>
//                 <Text>Daily ₦100</Text>
//               </Left>
//               <Right>
//                 <Icon name="arrow-forward" />
//               </Right>
//             </ListItem>
//             <ListItem onPress={() => this.props.navigation.navigate('Pay', { price: 500 })}>
//               <Left>
//                 <Text>Weekly ₦500</Text>
//               </Left>
//               <Right>
//                 <Icon name="arrow-forward" />
//               </Right>
//             </ListItem>
//             <ListItem onPress={() => this.props.navigation.navigate('Pay', { price: 2000 })}>
//               <Left>
//                 <Text>Monthly ₦2000</Text>
//               </Left>
//               <Right>
//                 <Icon name="arrow-forward" />
//               </Right>
//             </ListItem>
//           </List> */}