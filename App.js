import React, {Component} from 'react';
import { Text, View, AppRegistry, TextInput, Image, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Asset, SplashScreen } from 'expo';
import { API_KEY, API_URL, ICON_URL } from 'react-native-dotenv';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ' ',
      city: 'Literally Nowhere',
      description: 'Clear Skies',
      icon: '01d.png',
      main: 'clear',
      temp: 300,
      temp_max: 312,
      temp_min: 300,
      mainScreen: true

    }
  }

  handleZipCodeInput = () => {
    axios.get(`${API_URL}zip=${this.state.input}&APPID=${API_KEY}`)
    .then((response) => {
      this.setState({
        description: response.data.weather[0].description,
        city: response.data.name,
        icon: response.data.weather[0].icon,
        type: response.data.weather[0].main,
        temp: response.data.main.temp,
        temp_max: response.data.main.temp_max,
        temp_min: response.data.main.temp_min,
        mainScreen: false,
        isReady: false
      })
    })
    .catch(error => console.log(error))
  }

  handleKelvinToFahrenheit = (kelvin) => {
    return Math.round(kelvin * (9/5) - 459.67);
  }

  onPress = () => {
    this.setState({
      input: ' ',
      mainScreen: true
    });
  }

  componentDidMount() {
    SplashScreen.hide();
  }


  render() {

    if (this.state.mainScreen === true) {
      return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={{
              backgroundColor:'#FBEAEB',
              height: 700,
              alignItems: 'center'
            }}>
              <View style={{
                marginTop: 40
              }}>
                <Image
                style={{
                  height: 120, 
                  width: 120,
                }} 
                source={require('./assets/wthr2.png')}/>
              </View>
              
              <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                height : 200,
                width: 250,
                backgroundColor: '#FBEAEB',
                marginTop: 100
              }}>
              <Text style={{
                color: '#2F3C7E',
                fontSize: 30,
                fontFamily: 'Avenir-BookOblique',
                textAlign: 'center'
              }}>where do you live?</Text>
              
              <TextInput
                  style={{height: 30, width: 300, textAlign: 'center', borderColor: '#FBEAEB', borderWidth: 1, marginTop: 30, borderBottomColor: '#2F3C7E'}}
                  onChangeText={(value) => {
                    this.setState({
                      input: value
                    }
                    )}}
                  value={this.state.input}
                  color={'#2F3C7E'}
                  fontSize={30}
                  fontFamily={'Avenir-BookOblique'}
                  borderWidth={1}
                  clearTextOnFocus={true}
                  onSubmitEditing={this.handleZipCodeInput}
                  keyboardType={'number-pad'}
                  returnKeyType={"done"} 
                  />
                  
              </View>
            </View>
        </TouchableWithoutFeedback>
      )
    }
    if (this.state.mainScreen === false) {
        return (
          <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={{ flexDirection: 'column'}}>
              <View style={{
                flexDirection: 'column',
                backgroundColor: '#2F3C7E',
                height: 100,
                padding: 30,
              }}>
                <TextInput
                style={{height: 30, textAlign: 'center', borderColor: 'gray', borderWidth: 1, marginTop: 30}}
                onChangeText={(value) => {
                  this.setState({
                    input: value
                  }
                  )}}
                value={this.state.input}
                color={'#FBEAEB'}
                fontSize={30}
                fontFamily={'Avenir-BookOblique'}
                borderWidth={0}
                clearTextOnFocus={true}
                onSubmitEditing={this.handleZipCodeInput}
                keyboardType={'number-pad'}
                returnKeyType={"done"} 
                />
              </View>
              <View style={{
                backgroundColor:'#FBEAEB',
                height: 600,
                alignItems: 'center'
              }}>
                <Text style={{
                  color: '#2F3C7E',
                  fontSize: 50,
                  fontFamily:'Avenir',
                  marginTop: 20
                  }}>{this.state.city.toLowerCase()}</Text>
                <Text style={{
                  color: '#2F3C7E',
                  fontSize: 60,
                  fontFamily:'Avenir-BookOblique'
                  }}>{this.handleKelvinToFahrenheit(this.state.temp) + '\u00b0 F'}</Text>
                <Text style={{
                  color: '#2F3C7E',
                  fontSize: 20,
                  fontFamily:'Avenir-BookOblique'
                  }}>{this.state.description.toLowerCase()}</Text>
                <Image style={{width: 180, height: 180}} source={{uri: `${ICON_URL}${this.state.icon}`}}/>
                <Text style={{
                  color: '#2F3C7E',
                  fontSize: 20,
                  fontFamily:'Avenir-BookOblique'
                  }}>{'low     ' + this.handleKelvinToFahrenheit(this.state.temp_min)  + '\u00b0 F'}</Text>
                <Text style={{
                  color: '#2F3C7E',
                  fontSize: 20,
                  fontFamily:'Avenir-BookOblique'
                  }}>{'high      ' + this.handleKelvinToFahrenheit(this.state.temp_max)  + '\u00b0 F'}</Text>
                <TouchableHighlight style={{
                  marginTop: 60,
              }} 
                  onPress={this.onPress}>
                  <Image source={require('./assets/wthr2.png')}
                    style={{
                      height: 60,
                      width: 60
                    }}></Image> 
                </TouchableHighlight>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
    }
  }
}
          
          
          

AppRegistry.registerComponent('App', () => App);