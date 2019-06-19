import React, {Component} from 'react';
import {Text, View, AppRegistry, TextInput} from 'react-native';
import { API_KEY, API_URL } from 'react-native-dotenv';
import axios from 'axios';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: 'ENTER ZIP CODE',
      currentWeather: {},

    }
  }

  handleZipCodeInput = () => {
    axios.get(`${API_URL}zip=${this.state.input}&APPID=${API_KEY}`)
    .then((response) => {
      console.log(response.data);
      this.setState({
        currentWeather: response.data
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
          height: 160,
          padding: 30,
        }}>
          <TextInput
          style={{height: 70, borderColor: 'gray', borderWidth: 1, marginTop: 70}}
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
          height: 600
        }}>

        </View>
      </View>

    );
  }
}