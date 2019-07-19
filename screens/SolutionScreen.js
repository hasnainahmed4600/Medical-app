import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Socialbtns } from '../components/common';
import { makeIsEndingFalse } from '../actions';
import HTML from 'react-native-render-html';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';


class SolutionScreen extends Component {

  static navigationOptions = {
    headerBackTitle: null,
    headerLeft: null,
    title: 'SOLUTION',
    headerTintColor: 'white',
        headerStyle: {
           backgroundColor: 'rgba(53, 196, 254, 1.0)'
        },
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedForYes: true
       };
  }

  componentDidMount() {
    this.props.makeIsEndingFalse();
  }

  buttonTapped() {
    ////console.log("Button Pressed");
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

  onCLickImage(url){
    ////console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));

  }

  setupDifferentProduct() {
    if (this.props.navigationRoute.products !== undefined) {
      return (
        <View style={styles.firstViewStyle}>
      <Text style={styles.firstTextStyle}>OTC Medication Options - One of the following</Text>
      <View style={{ width: '80%', alignItems: 'flex-start' }}>
      <FlatList
               extraData={this.state}
               data={this.props.navigationRoute.products}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <TouchableOpacity onPress={() => this.onCLickImage(item.product_link)} style={{ paddingTop: 20,}}>
                 <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.product_title}</Text>
                 <Image
                  style={{width: 100, height: 100, flex: 1, resizeMode: 'contain'}}
                  source={{uri: item.product_image_url}}
                 />
               </TouchableOpacity>
               }
            />
      </View>
      </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  setupDifferentProduct2() {
    if (this.props.navigationRoute.products2 !== undefined) {
      return (
        <View style={styles.firstViewStyle}>
      <Text style={styles.firstTextStyle}>Taken With - One of the following</Text>
      <View style={{ width: '80%', alignItems: 'flex-start'}}>
      <FlatList
               extraData={this.state}
               data={this.props.navigationRoute.products2}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <TouchableOpacity onPress={() => this.onCLickImage(item.product_link)} style={{ paddingTop: 20,}}>
                 <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.product_title}</Text>
                 <Image
                  style={{width: 100, height: 100, flex: 1, resizeMode: 'contain'}}
                  source={{uri: item.product_image_url}}
                 />
               </TouchableOpacity>
               }
            />
      </View>
      </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  setupDifferentProduct3() {
    if (this.props.navigationRoute.products3 !== undefined) {
      return (
        <View style={styles.firstViewStyle}>
      <Text style={styles.firstTextStyle}>Combination Products - Not to be taken with products listed above</Text>
      <View style={{ width: '80%', alignItems: 'flex-start'}}>
      <FlatList
               extraData={this.state}
               data={this.props.navigationRoute.products3}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <TouchableOpacity onPress={() => this.onCLickImage(item.product_link)} style={{ paddingTop: 20,}}>
                 <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.product_title}</Text>
                 <Image
                  style={{width: 100, height: 100, flex: 1, resizeMode: 'contain'}}
                  source={{uri: item.product_image_url}}
                 />
               </TouchableOpacity>
               }
            />
      </View>
      </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  setupDifferentProduct4() {
    if (this.props.navigationRoute.products4 !== undefined) {
      return (
        <View style={styles.firstViewStyle}>
      <Text style={styles.firstTextStyle}>Complementary Products</Text>
      <View style={{ width: '80%', alignItems: 'flex-start' }}>
      <FlatList
               extraData={this.state}
               data={this.props.navigationRoute.products4}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <TouchableOpacity onPress={() => this.onCLickImage(item.product_link)} style={{ paddingTop: 20}}>
               <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.product_title}</Text>
                 <Image
                  style={{width: 70, height: 140, flex: 1, resizeMode: 'contain'}}
                  source={{uri: item.product_image_url}}
                 />
               </TouchableOpacity>
               }
            />
      </View>
      </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  checkingForHtml(body) {

    if (body.includes('href')) {
      const recommededLink = body.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
      ////console.log(`link ${recommededLink}`)
      return(
        <View style={{ marginTop: 20}}>
              <HTML html={body} onLinkPress={() => Linking.openURL(recommededLink)}/>
        </View>
      );

    } else {
      return (
        <View>
          <Text style={styles.secondTextStyle}>{body}</Text>
        </View>
      );
    }
  }

  setUpUI() {
    const { recommendations, products } = this.props.navigationRoute;
    return (
      <View>
      <View style={styles.firstViewStyle}>
      <Text style={styles.firstTextStyle}>Recommendations</Text>
      <FlatList
               extraData={this.state}
               data={recommendations}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <View>
                  {this.checkingForHtml(item.body)}
               </View>
               }
            />
      </View>

      {this.setupDifferentProduct()}

      {this.setupDifferentProduct2()}

      {this.setupDifferentProduct3()}

      {this.setupDifferentProduct4()}
      

      

      
      </View>
    );
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={ styles.mainContainerStyle }>
      <Socialbtns/>
        {this.setUpUI()}

        <View style={styles.firstViewStyle}>
          <Button onPress={() => this.buttonTapped()}>
          START OVER
          </Button>
        </View>

        {this.setUpAds()}
        
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    mainContainerStyle: {
      flex: 1,
      backgroundColor: 'rgba(219, 219, 222, 0.5)'
    },
    firstViewStyle: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 30,
      paddingBottom: 20,
     // height: 170,
      alignItems: 'center'
    },
    firstTextStyle: {
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      fontSize: 20,
      fontWeight: '900',
      color: 'black'
    },
    secondTextStyle: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      fontSize: 15,
      fontWeight: '400',
      color: 'black'
    },
  });

  const mapStateToProps = ({  solution }) => {
    const { navigationRoute } = solution;
    return {  navigationRoute };
  };

  export default connect(mapStateToProps, { makeIsEndingFalse })(SolutionScreen);