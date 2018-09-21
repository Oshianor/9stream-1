import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, ListItem, Text, Item, Radio, Right, Left, Input } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button } from 'react-native-paper';

class Billingcomponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      checked: 'card',
    }
  }

  displayCard = () => {
    return (
      <Content>
        <Item style={{ height: 40, margin: 10, padding: 10 }} regular>
          <Input placeholder='Card Number' />
        </Item>
        <Grid>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Item style={{ height: 40, margin: 10, maxWidth: 80 }} regular>
                    <Input placeholder='mm' />
                  </Item>
                </Col>
                <Text style={{ fontSize: 30, marginLeft: -10,  marginTop: 10 }} >/</Text>
                <Col>
                  <Item style={{ height: 40, margin: 10, maxWidth: 80 }} regular>
                    <Input placeholder='yy' />
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col>
              <Item style={{ height: 40, marginLeft: 30, margin: 10, maxWidth: 100 }} regular>
                <Input placeholder='CVV' />
              </Item>
            </Col>
          </Row>
        </Grid>
        <Item style={{ height: 40, margin: 10 }} regular>
          <Input placeholder='Name' />
        </Item>
      </Content>
    )
  }

  displayWallet = () => {
    return (
      <Content>
        <Item style={{ height: 40, margin: 10, padding: 10 }} regular>
          <Input placeholder='Full Name' />
        </Item>
        <Item style={{ height: 40, margin: 10, padding: 10 }} regular>
          <Input placeholder='Email' />
        </Item>
        <Item style={{ height: 40, margin: 10 }} regular>
          <Input placeholder='Password' />
        </Item>
        <Button>Create 9pay Account</Button>
      </Content>
    )
  }
  
  render() {
    console.log(this.state);
    
    const { checked } = this.state;
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, justifyContent: 'center', padding: 10 }} >
            <Text>Select Your Payment Method</Text>
          </View>
          <ListItem>
            <Left>
              <Text>Card</Text>
            </Left>
            <Right>
              <Radio selected={this.state.checked === 'card' ? true : false} onPress={() => this.setState({ checked: 'card' })} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>9pay</Text>
            </Left>
            <Right>
              <Radio selected={this.state.checked === '9pay' ? true : false} onPress={() => this.setState({ checked: '9pay' })} />
            </Right>
          </ListItem>
        </Content>
        {
          this.state.checked === 'card' &&
            this.displayCard()
        }
        {
          this.state.checked === '9pay' &&
            this.displayWallet()
        }
        
      </Container>
    );
  }
}

export default Billingcomponent;