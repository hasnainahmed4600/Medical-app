import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, Image, View } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};
class Twitter extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };
  render() {
    return (
      <TouchableOpacity onPress={this._handlePress} >
        <Image
          style={styles.button}
          source={require('../../assets/images/twitter.png')}
        />      
      </TouchableOpacity>
    );
  }
}
class Facebook extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };
  render() {
    return (
      <TouchableOpacity onPress={this._handlePress} >
        <Image
          style={styles.button}
          source={require('../../assets/images/facebook.png')}
        />      
      </TouchableOpacity>
    );
  }
}
class Instagram extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };
  render() {
    return (
      <TouchableOpacity onPress={this._handlePress} >
        <Image
          style={styles.button}
          source={require('../../assets/images/instagram.png')}
        />      
      </TouchableOpacity>
    );
  }
}
const Socialbtns = () => (
  <View style={{  flex: 1,
                  flexDirection: 'row', justifyContent: 'flex-end'}}>
  <Twitter href='https://twitter.com/Self_Care_AZ/'/>
  <Facebook href='https://www.facebook.com/selfcareaz/'/>
  <Instagram href='https://www.instagram.com/Self_Care_AZ/'/>
  </View>
)

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
       // paddingTop: 10,
       // paddingBottom: 10
    },
    buttonStyle: {
        //flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(53, 196, 254, 1.0)',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export { Button, Socialbtns };