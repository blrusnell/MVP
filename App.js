import React, {Component} from 'react';
import {Text, View, AppRegistry, TextInput} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: 'ENTER ZIP CODE'
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: 'powderblue',
          height: 200,
          padding: 30,
        }}>
          <TextInput
          style={{height: 70, borderColor: 'gray', borderWidth: 1, marginTop: 70}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          defaultValue={this.state.input}
          color={'white'}
          fontSize={30}
          fontFamily={'Trebuchet-BoldItalic'}
          borderWidth={0}
          clearTextOnFocus={true}
          />
        </View>
        <View style={{
          backgroundColor:'skyblue',
          height: 500
        }}>

        </View>
      </View>

    );
  }
}