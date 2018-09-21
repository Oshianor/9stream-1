import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import appReducer from './src/store/reducers/index.js';
import Login from './src/pages/login/login';

// register
import Register from './src/pages/register/register';

import Settings from './src/pages/settings/settings';
import Password from './src/components/settings/password';

import Home from './src/pages/home/home';

// import Trending from './src/pages/dashboard/trending/trending';

// import Profile from './src/pages/dashboard/profile/profile';
import { Icon } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';

// xplore;
import XploreHome from './src/pages/dashboard/xplore/xplorehome.js';
import XploreWatch from './src/pages/dashboard/xplore/xplorewatch';

// live
import LiveShowsList from './src/pages/dashboard/live/liveshowslist.js';
import LiveShow from './src/pages/dashboard/live/liveshow.js';
import Voting from './src/pages/dashboard/live/voting.js';
import Input from './src/pages/dashboard/live/input.js';
import Reply from './src/pages/dashboard/live/reply';

import {
  Platform, StatusBar
} from 'react-native';

// vod

import Vodlist from "./src/pages/dashboard/vod/vod";
import Voddetails from "./src/pages/dashboard/vod/voddetails";
import Vodwatch from "./src/pages/dashboard/vod/vodwatch";

//messaging
// import Userchatlist from './src/pages/dashboard/message/userchatlist';
// import Userchat from './src/pages/dashboard/message/userChat';

import Verify from './src/pages/verify/verify';

import { createStackNavigator } from 'react-navigation';
// import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

const store = createStore(appReducer, applyMiddleware(thunk));

export default class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
  }

  constructor(props) {
    super(props);
    
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBackgroundColor('black');
    }
  }
  
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <Screens />
        </PaperProvider>
      </Provider>
    );
  }
}

const Screens = createStackNavigator({
  Home: Home,
  Register: Register,
  Login: Login,
  Verify: Verify,
  Dashboard: {
    screen: createMaterialTopTabNavigator({
      Xplore: createStackNavigator(
        {
          XploreHome: XploreHome,
          XploreWatch: XploreWatch
        },
        {
          initialRouteName: 'XploreHome',
          header: null
        }
      ),
      Live: createStackNavigator(
        {
          LiveShow: LiveShow,
          Voting: Voting,
          Input: Input,
          Reply: Reply,
        },
        {
          initialRouteName: 'LiveShow',
          header: null,
          headerTransitionPreset: 'fade-in-place',
          headerMode: 'float',
        }
      ),
      Vod: createStackNavigator(
        {
          Vodlist: Vodlist,
          Voddetails: Voddetails,
          Vodwatch: Vodwatch
        },
        {
          initialRouteName: 'Vodlist',
          header: null,
          headerTransitionPreset: 'fade-in-place',
          headerMode: 'float',
        }
      ),
      Settings: createStackNavigator(
        {
          Setting: Settings,
          Password: Password,
        },
        {
          initialRouteName: 'Setting',
          header: null,
          headerTransitionPreset: 'fade-in-place',
          headerMode: 'float',
        }
      ),
      },{
        initialRouteName: 'Live',
        navigationOptions: ({ navigation, screenProps }) => ({
          swipeEnabled: navigation.state.index === 0,
          tabBarVisible: navigation.state.index === 0,
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Xplore') {
              iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Live') {
              iconName = `ios-cloudy${focused ? '' : '-outline'}`;
            } else if (routeName === 'Vod') {
              iconName = `ios-videocam${focused ? '' : '-outline'}`;
            } else if (routeName === 'Settings') {
              iconName = `ios-settings${focused ? '' : '-outline'}`;
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} size={10} color={tintColor} style={{ color: 'white' }} />;
          },
        }),
        animationEnabled: true,
        optimizationsEnabled: true,
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false,
          showIcon: true,
          indicatorStyle: {
            backgroundColor: "#f48221"
          },
          style: {
            backgroundColor: 'black',
            marginTop: Platform.OS === 'ios' ? 30 : 0
          }
        }
      }),
    navigationOptions: {
      header: null,
      headerMode: 'none'
    }
  }, 
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
); // const Stack = createStackNavigator({

store.subscribe(() => {
  console.log("Store Changed, ", store.getState());
});


// <dict>
// 		<key>NSAllowsArbitraryLoads</key>
// 		<true/>
// 		<key>NSExceptionDomains</key>
// 		<dict>
// 			<key>localhost</key>
// 			<dict>
// 				<key>NSExceptionAllowsInsecureHTTPLoads</key>
// 				<true/>
// 			</dict>
// 		</dict>
// 	</dict>