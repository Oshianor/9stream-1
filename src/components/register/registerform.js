import React, { Component } from 'react';
import { Picker } from 'native-base';
import { StyleSheet, View, Platform, Dimensions, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId } from '../../store/actions/user';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import validator from 'validator';
import { Snackbar, Button } from 'react-native-paper';
import { Post } from '../reuse/post';
import { withNavigation } from 'react-navigation';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

const { width } = Dimensions.get('window');

class Registerform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      lastName: '',
      code: '+000',
      email: '',
      duration: 20000,
      // gender: 'male',
      phone: '',
      password: '',
      firstName: '',
      // date: '',
      country: '',
      index: "",
      // isDateTimePickerVisible: false,
      error: "",
      text: '',
      visible: false,
      loading: false
    }
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

  handleRegister = () => {
    this.setState({
      loading: true
    })
    const { email, firstName, lastName, phone, code, country, password } = this.state;

    let obj = {
      first_name: firstName,
      email: email.toLowerCase(),
      last_name: lastName,
      password: password,
      country: country,
      country_code: code,
      phone_number: phone
    }

    let log = {
      username: email,
      password: password,
      device_id: DeviceInfo.getUniqueID(),
      device_name: DeviceInfo.getModel()
    }

    let emailer = email.toLowerCase();
    emailer = emailer.replace(/ /g, "");

    // validate first name
    if (firstName !== "") {
      // validated last name
      if (lastName !== "") {
        // validate email
        if (validator.isEmail(emailer)) {
          // console.log("EMAILER", emailer);
          // validate phone number
          if (validator.isLength(phone, { min: 5, max: 20 })) {
            // validate country
            if (country !== "") {
              // validate password
              if (validator.isLength(password, { min: 5, max: 20 })) {
                Post("/user/register", obj).then((res) => {
                  if (!res.error) {
                    this.setState({
                      loading: false,
                      lastName: '',
                      email: '',
                      phone: '',
                      password: '',
                      firstName: '',
                      country: '',
                    })
                    this.storeItem('user_raw', log);
                    this.props.navigation.navigate('Verify', {
                      email: email.toLowerCase(),
                      password: password
                    })
                    this.props.sendError("Check your email to verify account.", true);
                  } else {
                    this.props.sendError(res.message, true);
                    this.setState({ 
                      password: '',
                      loading: false
                    });
                  }
                })
              } else {
                this.props.sendError("Password length must have a min of 5 and max of 20", true);
                this.setState({
                  // text: "Password length must have a min of 5 and max of 20",
                  password: '',
                  // visible: true,
                  loading: false
                })
              }
            } else {
              this.props.sendError("You must select a country", true);
              this.setState({
                // text: "You must select a country",
                // visible: true,
                loading: false,
                password: '',
              })
            }
          } else {
            this.props.sendError("Phone field is required and must be valid", true);
            this.setState({
              // text: "Phone field is required and must be valid",
              // visible: true,
              loading: false,
              password: '',
            })
          }
        } else {
          this.props.sendError("Email provided is invalid. Check your email", true);
          this.setState({
            // text: "Email provided is invalid. Check your email",
            // visible: true,
            loading: false,
            password: '',
          })
        }
      } else {
        this.props.sendError("Last name field is required", true);
        this.setState({
          // text: "Last name field is required",
          // visible: true,
          loading: false,
          password: '',
        })
      }
    } else {
      this.props.sendError("First name field is required", true);
      this.setState({
        // text: "First name field is required",
        // visible: true,
        loading: false,
        password: '',
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.country !== this.state.country) {
      if (this.state.index !== "") {
        let code = this.props.data.countries[this.state.index === 0 ? this.state.index : this.state.index - 1]["alpha-2"];
        this.setState({
          code
        })
      }
    }
  }

  sendError(text, visible){
    this.setState({
      text,
      visible
    })
  }


  onValueChange(value, index) {
    this.setState({
      country: value,
      index
    });
  }

  displayFirst = () => {
    return (
      <Kohana
        style={classes.input}
        label={'First Name'}
        iconClass={MaterialsIcon}
        iconName={'account-circle'}
        value={this.state.firstName}
        onChangeText={firstName => this.setState({ firstName })}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        useNativeDriver
      />
    )
  }

  displayLast = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Last Name'}
        iconClass={MaterialsIcon}
        iconName={'account-circle'}
        value={this.state.lastName}
        onChangeText={lastName => this.setState({ lastName })}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        useNativeDriver
      />
    )
  }

  displayEmail = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Email'}
        iconClass={MaterialsIcon}
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        iconName={'email'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        useNativeDriver
      />
    )
  }

  displayCountry = () => {
    return (
      <View style={{ paddingRight: 5, backgroundColor: 'gray', marginBottom: 10 }}>
        <Picker
          note
          // mode="dropdown"
          style={{ color: 'white' }}
          selectedValue={this.state.country}
          onValueChange={this.onValueChange.bind(this)}
        >
          <Picker.Item label="Select your Country" value="" />
          {
            this.props.data.countries.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.name} />
            ))
          }
        </Picker>
      </View>
    )
  }

  displayCodeAndPhone = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Phone Number'}
        iconClass={MaterialsIcon}
        iconName={'phone'}
        value={this.state.phone}
        onChangeText={phone => this.setState({ phone })}
        textContentType="telephoneNumber"
        keyboardType='phone-pad'
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        useNativeDriver
      />
    )
  }

  password = () => {
    return (
      <Kohana
        style={classes.input}
        label={'Password'}
        iconClass={MaterialsIcon}
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        iconName={'lock'}
        iconColor={'#f4d29a'}
        labelStyle={{ color: 'white', fontWeight: '400', fontSize: 15, marginTop: Platform.OS === 'ios' ? 4 : -2 }}
        inputStyle={{ color: 'white' }}
        secureTextEntry
        useNativeDriver
      />
    )
  }

  render() {
    return (
      <View style={classes.container}>

        {/* first and last name */}
        {this.displayFirst()}

        {this.displayLast()}

        {/* Email field */}
        {this.displayEmail()}

        {/* gender and date of birth */}
        {/* {this.displayGenderAndAge()} */}

        {/* select country field */}
        {this.displayCountry()}

        {/* country code and phone number */}
        {this.displayCodeAndPhone()}

        {/* password details */}
        {this.password()}


        <Button mode="contained" loading={this.state.loading} style={classes.button} onPress={this.handleRegister} >
          REGISTER
        </Button>

        <TouchableOpacity style={classes.buttonLog} onPress={() => this.props.navigation.navigate('Login')} >
          <Text style={classes.buttonTextLog}>LOGIN</Text>
        </TouchableOpacity>

        <Snackbar
          visible={this.state.visible}
          duration={this.state.duration}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Hide',
            onPress: () => { this.setState({ visible: false }) },
          }}
        >
          {this.state.text}
        </Snackbar>

      </View>
    );
  }
}

// export default Registerform;
const Registerforms = withNavigation(Registerform);
function mapStateToProps(state) {
  return {
    data: state.route,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: setUserId,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Registerforms);

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 10,
    // width: 350
    width: (width - 80),
  },
  input: {
    height: Platform.OS === 'android' ? 40 : 52,
    // width: 350,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: 'white',
    // paddingHorizontal: 10
  },
  date: {
    width: 160,
    height: 40,
    marginBottom: 10,
    backgroundColor: 'gray',
    paddingHorizontal: 10
  },
  dateText: {
    textAlign: 'left',
    color: "#ffffff",
    fontWeight: '300',
    paddingTop: 10
  },
  inputhalf: {
    height: 40,
    width: 250,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: '#606062',
    color: 'white',
    paddingHorizontal: 10
  },
  inputSick: {
    height: 40,
    width: 160,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: '#606062',
    color: 'white',
    paddingHorizontal: 10
  },
  gender: {
    height: 40,
    width: 160,
    backgroundColor: 'gray',
    marginBottom: 10,
    // color: '#606062',
    color: 'white',
    paddingHorizontal: 10
  },
  realcountry: {
    // height: 40,
    marginTop: -10,
    width: 350,
    backgroundColor: 'gray',
    // marginBottom: 10,
    // paddingHorizontal: 10
    paddingLeft: 10,
    paddingRight: 10
  },
  country: {
    height: 40,
    width: 100,
    backgroundColor: 'gray',
    marginBottom: 10,
    color: 'white',
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#f48221',
    paddingVertical: 5,
    width: 350
  },
  buttonText: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonLog: {
    marginTop: 20,
    // backgroundColor: 'black',
    paddingVertical: 10,
    width: 350
  },
  buttonTextLog: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '700',
    paddingTop: -10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})





















// displayFirstAndLast = () => {
//   return (
//     <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', padding: 2 }} >
//       <View style={{ paddingRight: 5 }}>
//         <TextInput
//           underlineColorAndroid='transparent'
//           placeholder="First Name*"
//           value={this.state.fullname}
//           onChangeText={firstName => this.setState({ firstName })}
//           placeholderTextColor="rgba(255,255,255,0.7)"
//           style={classes.inputSick}
//         />
//       </View>

//       <View style={{ flex: 0.1 }} />

//       <View style={{ paddingLeft: 5 }}>
//         <TextInput
//           underlineColorAndroid='transparent'
//           placeholder="Last Name*"
//           value={this.state.fullname}
//           onChangeText={lastName => this.setState({ lastName })}
//           placeholderTextColor="rgba(255,255,255,0.7)"
//           style={classes.inputSick}
//         />
//       </View>
//     </View>
//   )
// }

// displayEmail = () => {
//   return (
//     <TextInput
//       underlineColorAndroid='transparent'
//       placeholder="Email*"
//       value={this.state.email}
//       keyboardType="email-address"
//       onChangeText={email => this.setState({ email })}
//       textContentType="email"
//       placeholderTextColor="rgba(255,255,255,0.7)"
//       style={classes.input}
//     />
//   )
// }

// displayCountry = () => {
//   return (
//     <View style={{ paddingRight: 5, backgroundColor: 'gray', marginBottom: 10 }}>
//       <Picker
//         note
//         // mode="dropdown"
//         style={{ color: 'white' }}
//         selectedValue={this.state.country}
//         onValueChange={this.onValueChange.bind(this)}
//       >
//         <Picker.Item label="Select your Country" value="" />
//         {
//           this.props.data.countries.map((item, index) => (
//             <Picker.Item key={index} label={item.value} value={item.value} />
//           ))
//         }
//       </Picker>
//     </View>
//   )
// }

// displayCodeAndPhone = () => {
//   return (
//     <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', padding: 2 }} >
//       <View style={{ paddingRight: 5 }}>
//         <Picker
//           style={classes.country}
//           selectedValue={this.state.code}
//           onValueChange={(itemValue, itemIndex) => this.setState({ code: itemValue })}>
//           <Picker.Item
//             label={
//               this.state.index !== "" ?
//                 this.props.data.countries[this.state.index === 0 ? this.state.index : this.state.index - 1].code
//                 :
//                 this.state.country === "" ?
//                   "+000"
//                   :
//                   this.state.code
//             }
//             value={
//               this.state.index !== "" ?
//                 this.props.data.countries[this.state.index === 0 ? this.state.index : this.state.index - 1].code
//                 :
//                 this.state.country === "" ?
//                   "+000"
//                   :
//                   this.state.code
//             }
//           />
//         </Picker>
//       </View>
//       {/* <View style={{flex: 0.1}}/> */}
//       {/* style={{ paddingLeft: 5 }} */}
//       <View >
//         <TextInput
//           underlineColorAndroid='transparent'
//           placeholder="Phone*"
//           onChangeText={phone => this.setState({ phone })}
//           textContentType="telephoneNumber"
//           keyboardType='phone-pad'
//           placeholderTextColor="rgba(255,255,255,0.7)"
//           style={classes.inputhalf}
//         />
//       </View>
//     </View>
//   )
// }

// password = () => {
//   return (
//     <TextInput
//       underlineColorAndroid='transparent'
//       placeholder="Password*"
//       onChangeText={password => this.setState({ password })}
//       placeholderTextColor="rgba(255,255,255,0.7)"
//       secureTextEntry
//       style={classes.input}
//     />
//   )
// }


























  // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // _handleDatePicked = (date) => {
  //   // console.log('A date has been picked: ', date);
  //   this.setState({
  //     date: date
  //   })
  //   this._hideDateTimePicker();
  // };












  
















  // displayGenderAndAge = () => {
  //   const { date } = this.state;
  //   return (
  //     <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', padding: 2 }} >
  //       <View style={{ paddingRight: 5 }}>
  //         <Picker
  //           style={classes.gender}
  //           selectedValue={this.state.gender}
  //           onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
  //           <Picker.Item label="Male" value="male" />
  //           <Picker.Item label="Female" value="female" />
  //         </Picker>
  //       </View>

  //       <View style={{ flex: 0.1 }} />

  //       <View style={{ paddingLeft: 5 }}>
  //         <TouchableOpacity style={classes.date} onPress={this._showDateTimePicker}>
  //           <Text style={classes.dateText} >
  //             {
  //               this.state.date !== "" ?
  //                 date.toDateString()
  //                 :
  //                 "Date of birth*"
  //             }
  //           </Text>
  //         </TouchableOpacity>
  //         <DateTimePicker
  //           isVisible={this.state.isDateTimePickerVisible}
  //           onConfirm={this._handleDatePicked}
  //           onCancel={this._hideDateTimePicker}
  //           minimumDate={new Date(1960, 8, 10)}
  //           maximumDate={new Date(2029, 12, 31)}
  //           date={new Date(2000, 12, 31)}
  //         />
  //       </View>
  //     </View>
  //   )
  // }














// async getKey() {
//   try {
//     const value = await AsyncStorage.getItem('@MySuperStore:key');
//     this.setState({ myKey: value });
//   } catch (error) {
//     console.log("Error retrieving data" + error);
//   }
// }

// async saveKey(value) {
//   try {
//     await AsyncStorage.setItem('@MySuperStore:key', value);
//   } catch (error) {
//     console.log("Error saving data" + error);
//   }
// }

// async resetKey() {
//   try {
//     await AsyncStorage.removeItem('@MySuperStore:key');
//     const value = await AsyncStorage.getItem('@MySuperStore:key');
//     this.setState({ myKey: value });
//   } catch (error) {
//     console.log("Error resetting data" + error);
//   }
// }



