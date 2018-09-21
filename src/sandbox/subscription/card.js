import React, { Component } from 'react';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { View, Button, Text } from 'native-base';

class Card extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      form: ''
    }
  }
  

  _onChange = (form) => {
    this.setState({
      form
    })
  }

  handleCardPayment = () => {

  }

  render() {
    return (
      <View>
        <CreditCardInput
          onChange={this._onChange}
        />
        <Button
          style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end' }}
          onPress={this.handleCardPayment} >
          <Text>Make Payment</Text>
        </Button>
      </View>
    );
  }
}

export default Card;