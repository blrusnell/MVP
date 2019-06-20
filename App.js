import React, {Component} from 'react';
import {Text, View, AppRegistry, TextInput, Image} from 'react-native';
import { API_KEY, API_URL, ICON_URL } from 'react-native-dotenv';
import axios from 'axios';




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: 'ZIP CODE...',
      city: 'Austin',
      description: 'Clear Skies',
      icon: '01d.png',
      main: 'clear',
      temp: 300,
      temp_max: 312,
      temp_min: 300
      

    }
  }

  handleZipCodeInput = () => {
    axios.get(`${API_URL}zip=${this.state.input}&APPID=${API_KEY}`)
    .then((response) => {
      console.log(response.data)
      this.setState({
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        type: response.data.weather[0].main,
        temp: response.data.main.temp,
        temp_max: response.data.main.temp_max,
        temp_min: response.data.main.temp_min
      })
    })
    .catch(error => console.log(error))
  }

  handleKelvinToFahrenheit = (kelvin) => {
    return Math.round(kelvin * (9/5) - 459.67);
  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: '#2F3C7E',
          height: 100,
          padding: 30,
        }}>
          <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1, marginTop: 30}}
          onChangeText={(value) => {
            console.log(this.state.input)
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
            fontFamily:'Avenir-BookOblique'
            }}>{this.state.city}</Text>
          <Text style={{
            color: '#2F3C7E',
            fontSize: 60,
            fontFamily:'Avenir-BookOblique'
            }}>{this.handleKelvinToFahrenheit(this.state.temp) + '\u00b0 F'}</Text>
          <Text style={{
            color: '#2F3C7E',
            fontSize: 20,
            fontFamily:'Avenir-BookOblique'
            }}>{this.state.description}</Text>
          <Image style={{width: 200, height: 200}} source={{uri: `${ICON_URL}${this.state.icon}`}}/>
          <Text style={{
            color: '#2F3C7E',
            fontSize: 20,
            fontFamily:'Avenir-BookOblique'
            }}>{'Low     ' + this.handleKelvinToFahrenheit(this.state.temp_min)  + '\u00b0 F'}</Text>
          <Text style={{
            color: '#2F3C7E',
            fontSize: 20,
            fontFamily:'Avenir-BookOblique'
            }}>{'High      ' + this.handleKelvinToFahrenheit(this.state.temp_max)  + '\u00b0 F'}</Text>
        </View>
      </View>

    );
  }
}
          
          
          

AppRegistry.registerComponent('App', () => App);