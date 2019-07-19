import React from 'react';
import { 
    Text, 
    ScrollView, 
    StyleSheet, 
    View, 
    Platform, 
} from 'react-native';
import { Button, Socialbtns } from '../components/common';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'expo-ads-admob';

export default class AboutScreen extends React.Component {
    static navigationOptions = {
        headerBackTitle: null,
        title: 'ABOUT',
        headerTintColor: 'white',
        headerStyle: {
           backgroundColor: 'rgba(53, 196, 254, 1.0)'
        },
      };

      UNSAFE_componentWillMount() {
        this.props.navigation.navigate('Home')
      }

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
                   {'The Self Care AZ App allows users to receive a personalized treatment for common, minor health conditions such as headache, nausea, colds, bee stings and other conditions. Most people experience these health conditions often, or will experience them at some point in the future. \n\nThe app asks a series of questions to the user and then provides optimal treatment information which includes natural and non drug treatment methods, along with over the counter medicines that are safe to consider. This app gives the most effective and safe OTC product recommendation which is tailored to patient specific information(considering age, other health conditions, causes, and more). Along with increasing safety and treatment effectiveness, this app also allows users to receive more comprehensive and accurate treatment information while in a private environment, leading to better outcomes and more privacy. \n\nThe Self Care AZ App was developed by licensed pharmacists and software engineers and is a product of PharmacyHQ.com. \n\nAll people can benefit profoundly from downloading this app because it also includes preventative healthcare information regarding diet, exercise and lifestyle modifications which can be used to decrease the rate of development of chronic and acute illnesses in the general population. \n\nIt is a great app to have when an unexpected health situation pops up! \n\nThis app saves pharmacists’ time because they will no longer have to do this process themselves while relying on their memory in the middle of a busy day, saving them countless hours of time which they can use to maximize productivity for pharmacy businesses.'}
                  </Text>
                  <Button 
                  onPress={() => this.buttonTapped()}
                  >
                  Get Started Today!
                  </Button>
                  <Text style={{fontSize: 15, color: 'rgba(35, 120, 37, 1.0)', marginTop: 30}}>Contact: Pharmacyhq.contact@gmail.com</Text>
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
        backgroundColor: 'white'        
    },
    buttonStyle: {
        backgroundColor: 'red',
    }
  });