import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList, ActivityIndicator, Modal, Platform, StyleSheet } from 'react-native';
import { Button, Twitter, Socialbtns } from '../components/common';
import { fetchIssue, makeIsTermsDone, makeIsTermsNotDone } from '../actions';
import Overlay from 'react-native-modal-overlay';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';
console.disableYellowBox = true;

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'DESCRIBE PROBLEM',
        headerTintColor: 'white',
            headerStyle: {
               backgroundColor: 'rgba(53, 196, 254, 1.0)'
            },
      };

      constructor(props) {
        super(props);
        this.state = {
          termsValues: [
            {
            'title': '',
            'message1': ' The information and any reference materials posted here by PharmacyHQ. is intended solely for the information of the reader. Such information should NOT be considered or construed as medical advice or used for treatment purposes and is NOT intended to replace consultation with a qualified medical professional. This site is not designed to and does not provide medical advice, professional diagnosis, opinion, treatment or services to you or to any other individual.',
            'message2': 'Through this site and linkages to other sites, PharmacyHQ provides general information for educational purposes only. The information provided in this site, or through linkages to other sites, is not a substitute for medical or professional care, and you should not use the information in place of a visit, call consultation or the advice of your physician or other healthcare provider.',
            'message3': 'PharmacyHQ is not liable or responsible for any advice, course of treatment, diagnosis or any other information, services or product you obtain through this site. This site is intended as an educational service and is not a substitute for seeking the care of a qualified healthcare professional.'
          },
          {
            'title': 'IF YOU BELIEVE YOU HAVE A MEDICAL EMERGENCY, YOU SHOULD IMMEDIATELY CALL 911 OR YOUR PHYSICIAN.',
            'message1': 'If you believe you have any other health problem, or if you have any questions regarding your health or a medical condition, you should promptly consult your physician or other healthcare provider. Never disregard medical or professional advice, or delay seeking it, because of something you read on this site or a linked website. Never rely on information on this website in place of seeking professional medical advice. You should also ask your physician or other healthcare provider to assist you in interpreting any information in this site or in the linked websites, or in applying the information to your individual case. Medical information changes constantly, therefore the information provided on the site should not be considered current, complete or exhaustive, nor should you rely on such information to recommend a course of treatment for you or any other individual. Reliance on any information provided on this site is solely at your own risk.',
            'message2': 'Please note that communication via the Internet and electronic mail may not be secure, and PharmacyHQ cannot guarantee the security or confidentiality of any information which is transmitted. Because electronic mail may be delayed by hours or days, please do not rely on this mode of communication to convey urgent information.',
            'message3': ''
          },
          {
            'title': 'Disclaimer of warranty',
            'message1': 'While we try to keep the information on the web site as accurate as possible, we disclaim any warranty concerning its accuracy, timeliness and completeness, and any other warranty, express or implied, including warranties of merchantability or fitness for a particular purpose.',
            'message2': '',
            'message3': ''
          },
          {
            'title': 'Limitation of liability',
            'message1': 'The user assumes all responsibility and risk for the use of this web site and the Internet in general. Under no circumstances shall PharmacyHQ., or its employees, agents, or representatives, or its affiliates, including without limitation The Physicians Organization of PharmacyHQ., or anyone else involved in creating or maintaining this web site be liable for any direct, indirect, incidental, special or consequential damages, lost profits, or other damages whatsoever including, without limitation, damages that result from: the use or inability to use or access the web site and/or any other web sites which are linked to this site; reliance by a member or visitor on any information obtained via the web site; or mistakes, omissions, interruptions, deletion of files, viruses, errors, defects, or any failure of performance, communications failure, theft, destruction or unauthorized access. In states which do not allow the above limitations of liability, liability shall be limited to the greatest extent permitted by law.',
            'message2': '',
            'message3': ''
          }
          ]
           };
      }

      UNSAFE_componentWillMount() {
        if (this.props.isTermsAndCondition === false ) {
          ////console.log('fuckkkkkkkkkkkkkkkkkk');
          this.props.fetchIssue();
        }
      }

      buttonTapped(id) {
        ////console.log("Button Pressed");
        ////console.log(id);
        this.props.fetchSymptom(id);
        this.props.navigation.navigate('Details')
      }

      overlayTapped() {
    this.props.makeIsTermsDone();
    this.props.fetchIssue();
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
      showUI() {
        
        if (this.props.isLoading == true) {
          return (
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ); 
        } else {
          return (
            <View>
            <FlatList
              
               data={this.props.issues}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <View style={{ padding: 10 }}>
                 <Text 
                 style={{ color: 'rgba(50, 187, 252, 1.0)', fontWeight: 'bold' }}
                 onPress={
                  () => this.props.navigation.navigate("Details", {id: item.id})
                }
                 >
                 {item.name}
                 </Text>
               </View>
               }
            />
            {this.setUpAds()}
            </View>
          );
        }
      }

    render() {
        return (
          
          <ScrollView style={{ flex: 1}}>
            <Socialbtns/>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontWeight: '700', fontSize: 17}}>What best describes your issue?</Text>
            </View>

            {this.showUI()}
          <Modal 
            animationType={'fade'}
            visible={this.props.isTermsAndCondition}>
            <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <View style={{
              backgroundColor: 'white',
            width: 320,
            height: 450,
            padding: 20 }}>
              <Text style={{fontWeight:'bold', fontSize: 25}}>Terms of Service</Text>
              <View style={{borderBottomWidth: 1, width: 100, paddingTop: 10}}></View>
              <FlatList
              style={{flex:1}}
               extraData={this.state}
               data={this.state.termsValues}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <View style={{ padding: 1 }}>
                 <Text style={{fontWeight:'bold', fontSize: 12, paddingTop: 10}}>{item.title}</Text>
                 <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 10, textAlign:'center'}}>{item.message1}</Text>
                 <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 10, textAlign:'center'}}>{item.message2}</Text>
                 <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 10, textAlign:'center'}}>{item.message3}</Text>
               </View>
               }
              />
              <Button onPress={() => this.overlayTapped()}>
              Get Started Today!
              </Button>
            </View>
            </View>
         
        </Modal>

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
const mapStateToProps = ({ auth }) => {
	const { issues, isLoading, isTermsAndCondition } = auth;
	return { issues, isLoading, isTermsAndCondition };
};

export default connect(mapStateToProps, { fetchIssue, makeIsTermsDone, makeIsTermsNotDone })(HomeScreen);