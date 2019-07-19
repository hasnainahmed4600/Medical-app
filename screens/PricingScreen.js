import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button, Socialbtns } from '../components/common';


export default class PricingScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle: null,
    title: 'PRICE',
    headerTintColor: 'white',
        headerStyle: {
           backgroundColor: 'rgba(53, 196, 254, 1.0)'
        },
  };

  buttonTapped() {
    ////console.log("Button Pressed");
    this.props.navigation.navigate('Describe')
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <View style={styles.containerStyle}>
          <Socialbtns/>
          <Image
           style={{width: 100, height: 100}}
           source={require('../assets/images/free.png')} 
          />

          <Text style={styles.textStyle}> 
            ITS FREE!
          </Text>

          <Button onPress={() => this.buttonTapped()}>Get Started Today!</Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    height: hp('100%'), // 70% of height device screen
    //width: wp('100%'),
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    marginTop: 20,
    fontSize: 15,
    color: 'rgba(35, 120, 37, 1.0)',
  }
});