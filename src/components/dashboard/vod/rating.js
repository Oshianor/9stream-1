import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import StarRating from 'react-native-star-rating';
import gone from '../../../assets/aqua.jpg';
import { Post } from '../../reuse/post';
import { Get } from '../../reuse/get';
import PropTypes from 'prop-types';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(rating) {
    const { vodId, user, sendError } = this.props;
    this.setState({
      starCount: rating
    });
    let obj = {
      token: user.token,
      reference_id: vodId,
      rating: Number(rating)
    }
    // console.log(obj);
    Post('/rating/save', obj).then(res => {
      // console.log(res);
      if (res.error !== false) {
        sendError();
      }
    })
  }

  componentDidMount() {
    const { vodId } = this.props;
    Get("/rating/list_by_reference?reference_id=" + vodId).then(res => {
      console.log("RAting", res);
    })
  }
  
  render() {
    const { starCount } = this.state;
    return (
      <View style={styles.bck} >
        <View
          style={styles.fan} 
        >
        <Thumbnail 
          style={styles.tes} 
          large 
          source={gone} 
        />
        <Text>
          {
            starCount === 0 ?
              "Not rated"
            :
              `You Rated ${starCount}`
          }
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={25}
          halfStarEnabled={true}
          rating={starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
        </View>
      </View>
    );
  }
}

Rating.propTypes = {
  user: PropTypes.object.isRequired,
  vodId: PropTypes.string.isRequired,
  sendError: PropTypes.func.isRequired
}

export default Rating;

const styles = StyleSheet.create({
  tes: { padding: 5, marginBottom: 5, borderWidth: 1, borderColor: "white" },
  fan: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  bck: { backgroundColor: '#E0E0E0' }
})