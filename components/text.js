

import React, { Component } from 'react';
import { Ionicons, FontAwesome, AntDesign,FontAwesome5, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Base from '../utils/base'

import {
  Dimensions,
  Animated,
  Platform,
  TouchableHighlight

} from 'react-native';


import {
  View, TextField, Text, Button, Colors,
  Image,
  ThemeManager,
  Typography
} from 'react-native-ui-lib';

import { scale, verticalScale, moderateScale,ScaledSheet } from 'react-native-size-matters';



export default class Textview extends Base {
  constructor(props) {
    super(props);

    this.state = {
          
        tipo:"full",
        detail:false,
        all:{}
      }
      this.RBSheet ={}
  }
  componentDidMount() {
    if(this.props.tipo){
      this.setState({tipo:this.props.tipo})
    }

    var all=this.props
    
    this.setState({all:all})

  }
  componentDidUpdate(prevProps) {
      

  }
  render() {

    
    return (<Text {...this.props} style={[this.props.style]} allowFontScaling={false} ></Text>)

  }

}


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttl: {
    fontSize: '28@vs',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '300',
    textAlign: 'center',
    color: '#003057'
  },
});