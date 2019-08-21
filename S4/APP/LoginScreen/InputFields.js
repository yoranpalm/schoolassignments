import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default class InputFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  Login = () => {
    console.log(this.state.username);
    console.log(this.state.password);
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset="25" enabled>
        <View>
          <Text style={styles.title}>React <Text style={styles.titlebold}>Native</Text></Text>
          <TextInput placeholder='Gebruikersnaam' style={styles.input} onChangeText={val => this.onChangeText('username', val)}></TextInput>
          <TextInput placeholder='Wachtwoord' style={styles.input} secureTextEntry={true} onChangeText={val => this.onChangeText('password', val)}></TextInput>
          <TouchableOpacity style={styles.loginButton} onPress={this.Login}><Text style={styles.setColorWhite}>Inloggen</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Manrope',
    fontSize: 15,
    borderWidth: null,
    borderRadius: 6,
    paddingLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
    width: 250
  },
  loginButton: {
    fontFamily: 'Manrope',
    borderWidth: null,
    borderRadius: 6,
    backgroundColor: 'rgba(99, 102, 158, 0.8)',
    padding: 8,
    marginTop: 7,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setColorWhite: {
    fontFamily: 'Manrope',
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Manrope',
    color: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  titlebold: {
    fontWeight: 'bold',
  }
});

module.exports = InputFields;