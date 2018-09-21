import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import StarRating from 'react-native-star-rating';
import gone from '../../../assets/aqua.jpg';
import { Post } from '../../reuse/post';
import { Get } from '../../reuse/get';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    let obj = {
      token: this.props.user.token,
      reference_id: this.props.vodId,
      rating: Number(rating)
    }
    console.log(obj);
    Post('/rating/save', obj).then(res => {
      console.log(res);
      if (res.error !== false) {
        this.props.sendError();
      }
    })
  }

  componentDidMount() {
    Get('/rating/list_by_reference/' + this.props.vodId).then(res => {
      console.log("RAting", res);
      
    })
  }
  
  render() {
    return (
      <View style={{ backgroundColor: '#E0E0E0' }} >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 12 }} 
        >
        <Thumbnail 
          style={{ padding: 5, marginBottom: 5, borderWidth: 1, borderColor: "white" }} 
          large 
          source={gone} 
        />
        <Text>
          {
            this.state.starCount === 0 ?
              "Not rated"
            :
              `You Rated ${this.state.starCount}`
          }
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={25}
          halfStarEnabled={true}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
        </View>
      </View>
    );
  }
}

export default Rating;