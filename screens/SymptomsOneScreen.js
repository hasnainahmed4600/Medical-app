import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  FlatList, 
  Alert, 
  Image,
  Platform 
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';
import { connect } from 'react-redux';
import { fetchSymptom, fetchAnswer, updateRadioSelectedValue, fetchAnswerForMultiSelection } from '../actions';
import { Button } from '../components/common';
import { CheckBox } from 'react-native-elements';
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

class SymptomsOneScreen extends Component {

      constructor(props) {
        super(props);
        this.state = {
          checkedForYes: false,
          CheckedForNo: false,
          selectedCheckBoxId: null,
          selectedMultipleCheckBoxValue: {},
          currentQuestionNo: 0,
          questionsUrls: [],
          singleSelectDatas:[],
          questionKinds: [],
          symptomInputs: []
           };
      }

      componentDidMount() {
        const {params} = this.props.navigation.state
        this.props.fetchSymptom(params.id);
        this.setState({currentQuestionNo:0,
           questionsUrls:[params.id],
           singleSelectDatas:[0],
           questionKinds:[0],
          });
      }


    static navigationOptions = {
        headerBackTitle: null,
        title: 'DETAILS',
        headerTintColor: 'white',
            headerStyle: {
               backgroundColor: 'rgba(53, 196, 254, 1.0)'
            },
      };

      buttonTapped() {
       const { singleSelectData } = this.props;
       const {questionsUrls, currentQuestionNo} = this.state;
       //const url  = 'api/v1/flows/set_middle/29414';  currentQuestionNo:currentQuestionNo+1,
       const url  = this.props.symptom.post_url;

       if (singleSelectData === null || (isEmpty(this.state.selectedMultipleCheckBoxValue)&&!((this.props.symptom.prompt.role == 'Boolean') || (this.props.symptom.prompt.role == 'One Select'))))
        {
        Alert.alert('Please', 'Select One', 'OK');
       } else {
        this.setState({currentQuestionNo:currentQuestionNo+1,
          questionsUrls:[...this.state.questionsUrls, url],
          singleSelectDatas:[...this.state.singleSelectDatas, singleSelectData],
         });
         if ((this.props.symptom.prompt.role == 'Boolean') || (this.props.symptom.prompt.role == 'One Select')) {
          
          this.setState({
            questionKinds: [...this.state.questionKinds, 1]
          }, ()=>{this.props.fetchAnswer(url, singleSelectData);})
          //this.props.fetchSymptom(52);
         } else {
          
          this.props.fetchAnswerForMultiSelection(url, singleSelectData);
         }
       }
      }
      backbuttonTapped() {
        const {questionsUrls, currentQuestionNo, singleSelectDatas, questionKinds} = this.state;
        const url  = questionsUrls[currentQuestionNo-1];
        const singleSelectData = singleSelectDatas[currentQuestionNo-1];
        const flag = questionKinds[currentQuestionNo-1];
        var urls = this.state.questionsUrls;
        urls.splice(-1, 1)
        var singles = this.state.singleSelectDatas
        singles.splice(-1, 1)
        var flags = this.state.questionKinds
        flags.splice(-1, 1)

        if (this.state.currentQuestionNo>1) {
          flag?this.props.fetchAnswer(url, singleSelectData):this.props.fetchAnswerForMultiSelection(url, singleSelectData);
        } else {
         this.props.fetchSymptom(url);
        }

        this.setState({
          currentQuestionNo: currentQuestionNo-1,
          questionsUrls:[...urls],
          singleSelectDatas:[...singles],
          questionKinds:[...flags]
        })

       }

        onSelectingRadioButton = (value) => {
        let {checkedForYes} = this.state
        const { inputs } = this.props.symptom;
        inputs.map(v => {
          if (v.value === value) {
            v.isSelected = true
          } else {
            v.isSelected = false
          }
          }
        )
        this.setState({ checkedForYes: !checkedForYes })
        this.props.updateRadioSelectedValue(inputs, value);
        
      }

      onSelectingCheckBox(value) {
        let {checkedForYes, selectedMultipleCheckBoxValue} = this.state
        const { inputs } = this.props.symptom;
        if (value.name !== "None of the above conditions") {
          
          inputs.map(v => {
              if (v.name === value.name) {
                if( selectedMultipleCheckBoxValue[value.name] === undefined ) {
                  selectedMultipleCheckBoxValue[value.name] = value.value
                v.isSelected = true
                } else {
                  const { name } = value;
                  delete selectedMultipleCheckBoxValue[name];
                  v.isSelected = false
                }
              } 
              if (v.name == "None of the above conditions")
              {v.isSelected = false; delete selectedMultipleCheckBoxValue[v.name];}
            }

          )
        } else {
          var flag = false
          if( selectedMultipleCheckBoxValue[value.name] === undefined ) {
            selectedMultipleCheckBoxValue = {}
            selectedMultipleCheckBoxValue[value.name] = value.value
            flag = true
          } else {
            selectedMultipleCheckBoxValue = {}
          }
          inputs.map(v => {
            v.isSelected = false
            if (v.name == "None of the above conditions")
              if (flag)
                v.isSelected = true
              else v.isSelected = false
          }
          )
        }
        var selectedCheckbox = selectedMultipleCheckBoxValue
        var sortable = [];
        for (var vehicle in selectedCheckbox) {
            sortable.push([vehicle, selectedCheckbox[vehicle]]);
        }
      
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        var obj = {};
        sortable.forEach(function(data){
          obj[data[0]] = data[1]
        });
        this.props.updateRadioSelectedValue(inputs, obj);
        this.setState({ checkedForYes: !checkedForYes, selectedMultipleCheckBoxValue : obj })
      }

      onImageLoadComplete(image) {
        const { inputs } = this.props.symptom;
        inputs.map(v => {
            if (v.image === image) {
              v.imageLoading = false
            }
          }
        )
        this.props.updateRadioSelectedValue(inputs, null);
      }

      onImageLoadStarts(image) {
        const { inputs } = this.props.symptom;
        inputs.map(v => {
          if (v.image === image) {
            v.imageLoading = true
          }
          }
        )
        this.props.updateRadioSelectedValue(inputs, null);
      }

      settingImage(image, imageLoading) {
        if (image.length > 1) {
          if (imageLoading === false) {
            return (
              <View>
              {/* <ActivityIndicator size="large" color='black' /> */}
              <Image 
              style={{width: 150 , height: 150, flex: 1,marginLeft: 20, resizeMode: 'contain'}}
              source={{uri: image}}
              //onLoadStart={(e) => this.onImageLoadStarts(image)}
              //onLoadEnd={(e) => this.onImageLoadComplete(image)}
              />
              </View>
            );

          } else {
            return (
              <View>
                
              <Image 
              style={{width: 100 , height: 100, flex: 1,marginLeft: 20, resizeMode: 'contain'}}
              source={{uri: image}}
              //onLoadStart={(e) => this.onImageLoadStarts(image)}
              //onLoadEnd={(e) => this.onImageLoadComplete(image)}
              />
              </View>
            );
          }
        } else {
          return (
            <View></View>
          );
        }
      }

      

      settingSelectOption() {
          if ((this.props.symptom.prompt.role == 'Boolean') || (this.props.symptom.prompt.role == 'One Select')) {
          return (
            <View>
              <FlatList
               extraData={this.state.checkedForYes}
               data={this.props.symptom.inputs}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <View style={{ padding: 1 }}>
                 <CheckBox
                  left
                  title={item.name}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor='rgba(53, 196, 254, 1.0)'
                  containerStyle={{backgroundColor: 'white', borderColor: 'white', marginBottom: 0}}
                  checked={item.isSelected}
                  onPress={() => this.onSelectingRadioButton(item.value)}
                />
                {this.settingImage(item.image, item.imageLoading)}
               </View>
               }
            />
            </View>
          );
        } else {
          return (
            <View>
              <FlatList
               extraData={this.state.checkedForYes}
               data={this.props.symptom.inputs}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item, index }) => 
               <View style={{ padding: 1 }}>
                 <CheckBox
                   title={item.name}
                   checked={item.isSelected}
                   onPress={() => this.onSelectingCheckBox(item)}
                 />
               </View>
               }
            />
            </View>
          );
         
        }
      }

      setUI() {
        if (this.props.isLoading === true) {
          return (
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ); 
        } else {
          if (this.props.symptom.ending !== true) {
            return (
              <View style={styles.firstViewStyle}>
                <Text style={styles.firstTextStyle}>{this.props.symptom.prompt.question}</Text>
                <Text style={styles.secondTextStyle}>{this.props.symptom.prompt.body}</Text>
                
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  {this.settingSelectOption()}
                </View>
                  {this.state.currentQuestionNo?<Button style={{width: 200}} onPress={() => this.backbuttonTapped()}>Previous</Button>:null}
                <Button style={{width: 200}} onPress={() => this.buttonTapped()}>Next</Button>

              </View>
            );
            
          } else {
            this.props.navigation.navigate('Solution');
          }
        }

               
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

      render() {
          return (
            <ScrollView style={ styles.mainContainerStyle }>
                {this.setUI()}
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

  const mapStateToProps = ({  symptoms }) => {
    const { symptom, isLoading, singleSelectData } = symptoms;
    return {  symptom, isLoading, singleSelectData };
  };

  export default connect(mapStateToProps, { fetchSymptom, fetchAnswer, updateRadioSelectedValue, fetchAnswerForMultiSelection })(SymptomsOneScreen);
