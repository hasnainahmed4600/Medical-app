import React from 'react';
import { ScrollView, StyleSheet, Text, View, Platform  } from 'react-native';
import { Button, Socialbtns} from '../components/common';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'expo-ads-admob';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle: null,
    title: 'HOW IT WORKS',
    headerTintColor: 'white',
        headerStyle: {
           backgroundColor: 'rgba(53, 196, 254, 1.0)'
        },
  };

  setUpAds() {
    if (Platform.OS === 'ios') {
        return (
            <View>
                <AdMobBanner
              style={styles.bottomBanner}
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-8099281252903721/3940115405"
      // Test ID, Replace with your-admob-unit-id
      //testDeviceID="EMULATOR" ca-app-pub-8099281252903721/1172096234
      didFailToReceiveAdWithError={this.bannerError}
              />
            </View>
        );
    } else {
        return (
            <View>
                <AdMobBanner
              style={styles.bottomBanner}
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-8099281252903721/6013359371"
      // Test ID, Replace with your-admob-unit-id
      //testDeviceID="EMULATOR" ca-app-pub-8099281252903721/1279907448
      didFailToReceiveAdWithError={this.bannerError}
              />
            </View>
        );
    }
  }

  buttonTapped() {
    ////console.log("Button Pressed");
    this.props.navigation.navigate('HomeStack')
  }

  render() {
      return (
          <ScrollView style={{ backgroundColor: 'white' }}>
          <Socialbtns/>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>
              1. The user selects the health condition or combination of symptoms that they have. The "/" symbol represents the word "or" and the "+" symbol represents "and". Example: "Cough + Headache/Sore Throat" should be selected if the user has a cough and a headache, or if the user has a cough and a sore throat.{"\n\n"}
              2. The user answers a series of questions regarding their age, health condition, the causes of their condition, and other questions.{"\n\n"}
              3. The user receives a treatment recommendation that includes all treatment options including over the counter medications, natural treatments, and lifestyle changes which can treat the condition. Every recommendation is unique and tailored to the patient's specific information which was entered regarding their condition, this maximizes safety and efficiency of the treatment.
              </Text>
              <Button 
              onPress={() => this.buttonTapped()}
              >
              Get Started Today!
              </Button>
            </View>
            {this.setUpAds()}
          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
textStyle: {
    fontSize: 15,
    color: 'rgba(35, 120, 37, 1.0)',
},
containerStyle: {
    flex: 1,
    padding: 40,        
},
buttonStyle: {
    backgroundColor: 'red',
}
});
