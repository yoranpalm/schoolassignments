import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Font } from 'expo';

import background from './assets/images/OnePlus.gif';

var InputFields = require('./InputFields');

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Manrope': require('./assets/fonts/Manrope.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground style={styles.background} source={background}>
        <View style={styles.container}>
          {
            this.state.fontLoaded ? (
              <InputFields />
            ) : null
          }
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null
  }
});