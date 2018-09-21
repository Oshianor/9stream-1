import React, { Component } from 'react';
import {
  Platform, ScrollView, Text, View, Alert, TouchableOpacity, AsyncStorage
} from 'react-native';
import { Thumbnail, Icon, Spinner } from 'native-base';
import {
  SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker
} from 'react-native-settings-components';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, getUserObject } from '../../store/actions/user';
import { Post } from '../reuse/post';
import { Snackbar } from 'react-native-paper';


class SettingForm extends Component {

  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      allowPushNotifications: false,
      country: '',
      list: [],
      text: '',
      visible: false
    };

  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem(key, JSON.stringify(item));
      // return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.props.data.countries.forEach(element => {
      this.state.list.push({ label: element.name, value: element.name })
    });
    this.setState({
      list: this.state.list
    })
    if (typeof this.props.user.user.profile !== "undefined") {
      this.setState({
        firstname: this.props.user.user.profile.firstName,
        lastname: this.props.user.user.profile.lastName,
        country: this.props.user.user.profile.countryName
      })
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.user !== this.props.user && typeof prevProps.user.profile !== "undefined") {
  //     this.setState({
  //       firstname: this.props.user.profile.firstName,
  //       lastname: this.props.user.profile.lastName,
  //       country: this.props.user.profile.countryName
  //     })
  //   }
  // }

  updateFirstName(firstname) {
    let obj = {
      token: this.props.user.user.token,
      id: this.props.user.user.id,
      data: {
        firstName: firstname
      }
    }
    Post("/user/update_profile", obj).then(res => {
      if (res.error) {
        this.setState({
          text: "Unable to update first name",
          visible: true
        })
      } else {
        this.props.user.user['profile'] = res.content;
        this.props.getUserObject(this.props.user.user);
        this.setState({
          text: "First name updated",
          visible: true
        })
      }
    })
  }


  updateLastName(name) {
    let obj = {
      token: this.props.user.user.token,
      id: this.props.user.user.id,
      data: {
        lastName: name
      }
    }
    Post("/user/update_profile", obj).then(res => {
      if (res.error) {
        this.setState({
          text: "Unable to update last name",
          visible: true
        })
      } else {
        this.props.user.user['profile'] = res.content;
        this.props.getUserObject(this.props.user.user);
        this.setState({
          text: "Last name updated",
          visible: true
        })
      }
    })
  }


  updateCountry(country) {
    let alph = 'ng';
    this.props.data.countries.forEach((count, index) => {
      if (count.name === country) {
        alph = this.props.data.countries[index]["alpha-2"];
      }
    })
    console.log(alph);

    let obj = {
      token: this.props.user.user.token,
      id: this.props.user.user.id,
      data: {
        countryName: country,
        countryCode: alph
      }
    }
    Post("/user/update_profile", obj).then(res => {
      if (res.error) {
        this.setState({
          text: "Unable to update your country",
          visible: true
        })
      } else {
        this.props.user.user['profile'] = res.content;
        this.props.getUserObject(this.props.user.user);
        this.setState({
          text: "Your country updated",
          visible: true
        })
      }
    })
  }

  handleLogout = () => {
    let obj = {
      token: this.props.user.user.token
    }
    Post('/user/logout', obj).then(res => {
      if (!res.error) {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('user_raw');
        this.props.navigation.navigate('Login');
        this.setState({
          text: 'Logged out successful',
          visible: true
        })
      }
    })
  }

  render() {
    // colors.blueGem
    // console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        {
          typeof this.props.user.user.profile === "undefined" ?
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
            <View style={{ flex: 1 }}>
              <View
                style={[{ padding: 16, backgroundColor: 'black' },
                (Platform.OS === 'ios') ? { paddingTop: 30, justifyContent: 'center', flexDirection: 'row' } : null]}
              >
                <Text style={{ color: '#f48221', fontWeight: 'bold', fontSize: 18 }}>Profile Settings</Text>
              </View>
              <ScrollView
                style={{ flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white }}
              >
                <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? { color: colors.monza } : null} />
                <SettingsDividerLong android={false} />

                <SettingsEditText
                  title="First Name"
                  dialogDescription={'Enter your first name.'}
                  valuePlaceholder="..."
                  negativeButtonTitle={'Cancel'}
                  positiveButtonTitle={'Save'}
                  onSaveValue={(value) => {
                    this.updateFirstName(value)
                  }}
                  value={this.props.user.user.profile.firstName}
                  dialogAndroidProps={{
                    widgetColor: colors.monza,
                    positiveColor: colors.monza,
                    negativeColor: colors.monza,
                  }}
                />

                <SettingsDividerShort />

                <SettingsEditText
                  title="Last Name"
                  dialogDescription={'Enter your last name.'}
                  valuePlaceholder="..."
                  negativeButtonTitle={'Cancel'}
                  positiveButtonTitle={'Save'}
                  onSaveValue={(value) => {
                    this.updateLastName(value)
                  }}
                  value={this.props.user.user.profile.lastName}
                  dialogAndroidProps={{
                    widgetColor: colors.monza,
                    positiveColor: colors.monza,
                    negativeColor: colors.monza,
                  }}
                />

                <SettingsDividerShort />

                <SettingsPicker
                  title="Country"
                  dialogDescription={'Change Your Country.'}
                  possibleValues={this.state.list}
                  negativeButtonTitle={'Cancel'}
                  positiveButtonTitle={'Save'}
                  onSaveValue={(value) => {
                    this.updateCountry(value)
                  }}
                  value={this.props.user.user.profile.countryName}
                  styleModalButtonsText={{ color: colors.monza }}
                />

                <SettingsDividerShort />

                <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('Password', 
                    { 
                      email: this.props.user.user.profile.email, 
                      token: this.props.user.user.token 
                    })
                  } 
                >
                  <SettingsCategoryHeader
                    title="Change Password"
                    titleStyle={{ color: 'gray' }}
                    containerStyle={{ marginBottom: 10 }}
                  />
                </TouchableOpacity>

                <SettingsDividerLong android={false} />
                <SettingsCategoryHeader title={'Account Settings'} textStyle={(Platform.OS === 'android') ? { color: colors.monza } : null} />
                <SettingsDividerLong android={false} />
                <SettingsSwitch
                  title={'Deactivate Account'}
                  onSaveValue={(value) => {
                    // console.log('allow push notifications:', value);
                    // this.setState({
                    //   allowPushNotifications: value
                    // });
                    Alert.alert("Deactivate Account",
                      "Are you sure you want to continue?",
                      [
                        { text: 'Yea', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'Not sure', onPress: () => console.log('OK Pressed') },
                      ],
                      { cancelable: true }
                    )
                  }}
                  value={this.state.allowPushNotifications}
                  thumbTintColor={(this.state.allowPushNotifications) ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerLong android={false} />

                <TouchableOpacity onPress={this.handleLogout} >
                  <SettingsCategoryHeader
                    title="Log Out"
                    titleStyle={{ color: 'red' }}
                    containerStyle={{ marginBottom: 10 }}
                  />
                </TouchableOpacity>

                <SettingsDividerLong />

                <SettingsCategoryHeader
                  title="v0.6.0"
                  titleStyle={{ color: 'black' }}
                  containerStyle={{ marginBottom: 10 }}
                />

                {/* <SettingsDividerShort /> */}
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
        }
      </View>
    )
  }
}

const colors = {
  iosSettingsBackground: 'rgb(235,235,241)',
  white: '#FFFFFF',
  monza: '#C70039',
  switchEnabled: (Platform.OS === 'android') ? '#C70039' : null,
  switchDisabled: (Platform.OS === 'android') ? '#efeff3' : null,
  switchOnTintColor: (Platform.OS === 'android') ? 'rgba(199, 0, 57, 0.6)' : null,
  blueGem: '#27139A',
};

const Settings = withNavigation(SettingForm);
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);










//   let userdata = {
//     {
//       "id": "5b9101e7dfba270f25440d2f", 
//       "username": "abundanceoshianor@gmail.com", 
//       "password": "", 
//       "login_time": 1536829158, 
//       "duration": 2592000000, 
//       "token": "cjm0ceg9j018xzoqn77qzf48g_8af15a05c731855be504c52374bdf929", 
//       "active": true, 
//       "devices": [], "idle_timeout": 36000000000, "mustResetPassword": false, "profile": { "_id": "5b9101e7dfba270f25440d2f", "added": "2018-09-06T10:31:03.892Z", "addedByUserId": "5b9101e7dfba270f25440d2f", "addressLine1": null, "addressLine2": null, "updated": "2018-09-13T08:54:35.494Z", "updatedByUserId": "5b9101e7dfba270f25440d2f", "accountId": "5b877a57572ba88863d6cac2", "avatar": null, "birthdate": null, "city": null, "countryCode": null, "countryName": "Nigeria", "displayName": "vander undefined", "email": "abundanceoshianor@gmail.com", "fbId": null, "fbData": null, "firstName": "vander", "lastName": "Oshianor ", "lastLoginDate": 1536229863000, "gender": null, "readNotifications": null, "operations": null, "paymentData": null, "phone": "+23408121784611", "postalCode": null, "registeredDevices": null, "username": "abundanceoshianor@gmail.com", "favoriteBrands": null, "favoriteCelebs": null, "favoriteVideos": null, "favoriteCharities": null, "favoriteCategories": null, "offersSaved": null, "userId": "5b9101e7dfba270f25440d2f", "userIp": null, "watchlist": null, "current_device": null, "subscriptionPlan": null, "ppvTickets": null, "billingInfo": null, "transactionalPlans": null }, "device_error": false }
// }












{/* <SettingsEditText
  title="Username"
  dialogDescription={'Enter your username.'}
  valuePlaceholder="..."
  negativeButtonTitle={'Cancel'}
  positiveButtonTitle={'Save'}
  onSaveValue={(value) => {
    console.log('username:', value);
    this.setState({
      username: value
    });
  }}
  value={this.state.username}
  dialogAndroidProps={{
    widgetColor: colors.monza,
    positiveColor: colors.monza,
    negativeColor: colors.monza,
  }}
/>
  <SettingsDividerShort /> */}




