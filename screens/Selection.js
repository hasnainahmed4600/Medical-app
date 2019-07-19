import React, { Component } from 'react';
import { 
    Text, 
    ScrollView, 
    StyleSheet, 
    View 
} from 'react-native';
import { connect } from 'react-redux';
import { makeIsTermsDone, makeIsTermsNotDone } from '../actions';
import { Button, Socialbtns} from '../components/common';

class Selection extends Component {
    static navigationOptions = {
        headerBackTitle: null,
        title: 'ABOUT',
        headerTintColor: 'white',
        headerStyle: {
           backgroundColor: 'rgba(53, 196, 254, 1.0)'
        },
      };

      buttonTapped() {
        ////console.log("Button Pressed");
        this.props.makeIsTermsDone();
      }

      render() {
          return (
              <ScrollView style={{ backgroundColor: 'white', margin: 20 }}>
              <Socialbtns/>
                <View style={styles.containerStyle}>
                <Text style={{fontWeight:'bold', fontSize: 25}}>Terms of Service</Text>
                <View style={{borderBottomWidth: 1, width: 100, paddingTop: 10}}></View>
                
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                The information and any reference materials posted here by PharmacyHQ. is intended solely for the information of the reader. Such information should NOT be considered or construed as medical advice or used for treatment purposes and is NOT intended to replace consultation with a qualified medical professional. This site is not designed to and does not provide medical advice, professional diagnosis, opinion, treatment or services to you or to any other individual.                 
                </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                Through this site and linkages to other sites, PharmacyHQ provides general information for educational purposes only. The information provided in this site, or through linkages to other sites, is not a substitute for medical or professional care, and you should not use the information in place of a visit, call consultation or the advice of your physician or other healthcare provider.                 
                </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                PharmacyHQ is not liable or responsible for any advice, course of treatment, diagnosis or any other information, services or product you obtain through this site. This site is intended as an educational service and is not a substitute for seeking the care of a qualified healthcare professional.                 
                </Text>

                <Text style={{fontWeight:'bold', fontSize: 12, paddingTop: 20}}>IF YOU BELIEVE YOU HAVE A MEDICAL EMERGENCY, YOU SHOULD IMMEDIATELY CALL 911 OR YOUR PHYSICIAN. </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                If you believe you have any other health problem, or if you have any questions regarding your health or a medical condition, you should promptly consult your physician or other healthcare provider. Never disregard medical or professional advice, or delay seeking it, because of something you read on this site or a linked website. Never rely on information on this website in place of seeking professional medical advice. You should also ask your physician or other healthcare provider to assist you in interpreting any information in this site or in the linked websites, or in applying the information to your individual case. Medical information changes constantly, therefore the information provided on the site should not be considered current, complete or exhaustive, nor should you rely on such information to recommend a course of treatment for you or any other individual. Reliance on any information provided on this site is solely at your own risk.                 
                </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                Please note that communication via the Internet and electronic mail may not be secure, and PharmacyHQ cannot guarantee the security or confidentiality of any information which is transmitted. Because electronic mail may be delayed by hours or days, please do not rely on this mode of communication to convey urgent information.                 
                </Text>

                <Text style={{fontWeight:'bold', fontSize: 12, paddingTop: 20}}>Disclaimer of warranty </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                While we try to keep the information on the web site as accurate as possible, we disclaim any warranty concerning its accuracy, timeliness and completeness, and any other warranty, express or implied, including warranties of merchantability or fitness for a particular purpose.                
                </Text>

                <Text style={{fontWeight:'bold', fontSize: 12, paddingTop: 20}}>Limitation of liability </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                The user assumes all responsibility and risk for the use of this web site and the Internet in general. Under no circumstances shall PharmacyHQ., or its employees, agents, or representatives, or its affiliates, including without limitation The Physicians Organization of PharmacyHQ., or anyone else involved in creating or maintaining this web site be liable for any direct, indirect, incidental, special or consequential damages, lost profits, or other damages whatsoever including, without limitation, damages that result from: the use or inability to use or access the web site and/or any other web sites which are linked to this site; reliance by a member or visitor on any information obtained via the web site; or mistakes, omissions, interruptions, deletion of files, viruses, errors, defects, or any failure of performance, communications failure, theft, destruction or unauthorized access. In states which do not allow the above limitations of liability, liability shall be limited to the greatest extent permitted by law.                 
                </Text>
                <Text style={{fontWeight:'200', fontSize: 10, paddingTop: 20, textAlign:'center'}}>
                By choosing to use the PharmacyHQ web site, you acknowledge and agree to these terms and conditions. In its sole discretion, PharmacyHQ may from time-to-time revise these terms and conditions by updating this posting.                
                </Text>

                  <Button 
                  onPress={() => this.buttonTapped()}
                  >
                  OK, Got It
                  </Button>
                </View>
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

  export default connect(null, { makeIsTermsDone })(Selection);
