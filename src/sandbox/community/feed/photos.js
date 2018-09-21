import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';
import { StyleSheet, ScrollView, Modal, TouchableHighlight, Image, View } from 'react-native';
import { getAllImages } from "../../../../store/actions/community";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      // modalVisble: false
    }
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  // toggleModal = () => {
  //   this.setState({
  //     modalVisble: !this.state.modalVisble
  //   })
  // }

  handleConfirmSelect = () => {

  }

  displayImages = () => {
    if (typeof this.props.community.images[0] !== "undefined") {
      return (
        this.props.community.images.map((img, index) => (
          <TouchableHighlight
            style={{ opacity: index === this.state.index ? .5 : 1 }}
            onPress={() => this.setIndex(index)}
            key={index}
            underlayColor='transparent'
          >
            <Image
              source={{ uri: img.node.image.uri }}
              style={{ width: this.props.width / 3, height: width / 3 }}
            />
          </TouchableHighlight>
        ))
      )
    } else {
      return null
    }

  }

  handleCancel = () => {

  }

  render() {
    return (
      <View style={classes.modal} >
        <ScrollView
          contentContainerStyle={classes.scrollview}
        >
          {this.displayImages()}

          <View style={classes.container} >
            <Fab
              // active={this.props.community.fabStatus}
              // direction="up"
              containerStyle={{}}
              // style={classes.elev, open}
              position="bottomLeft"
              onPress={this.handleCancel}
            >
              <Icon name="ios-close" style={{ color: "black", fontSize: 32 }} />
            </Fab>
            <Fab
              // active={this.props.community.fabStatus}
              // direction="up"
              containerStyle={{}}
              // style={classes.elev, open}
              position="bottomRight"
              onPress={this.handleConfirmSelect}
            >
              <Icon name="ios-checkbox-outline" style={{ color: "black", fontSize: 32 }} />
            </Fab>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    community: state.community
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllImages: getAllImages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  scrollview: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  modal: {
    paddingTop: 20,
    flex: 1
  }
})