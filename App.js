import React, {Component} from 'react';
import {Text, View, AppRegistry, TextInput, Image} from 'react-native';
import { API_KEY, API_URL, ICON_URL } from 'react-native-dotenv';
import axios from 'axios';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: 'ENTER ZIP CODE',
        description: 'hi',
        icon: '01d.png',
        main: 'clear',
        temp: 200,
        temp_max: 300,
        temp_min: 199
      

    }
  }

  handleZipCodeInput = () => {
    axios.get(`${API_URL}zip=${this.state.input}&APPID=${API_KEY}`)
    .then((response) => {
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

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: 'powderblue',
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
          color={'white'}
          fontSize={30}
          fontFamily={'Trebuchet-BoldItalic'}
          borderWidth={0}
          clearTextOnFocus={true}
          onSubmitEditing={this.handleZipCodeInput}
          />
        </View>
        <View style={{
          backgroundColor:'skyblue',
          height: 600,
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white'
            }}>{this.state.temp}</Text>
          <Text style={{
            color: 'white'
            }}>{this.state.description}</Text>
          <Image style={{width: 200, height: 200}} source={{uri: `${ICON_URL}${this.state.icon}`}}/>
          <Text style={{
            color: 'white'
            }}>{this.state.temp_min}</Text>
          <Text style={{
            color: 'white'
            }}>{this.state.temp_max}</Text>
        </View>
      </View>

    );
  }
}
          
          
          

AppRegistry.registerComponent('App', () => App);