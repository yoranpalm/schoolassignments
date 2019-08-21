import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MapView, Marker } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      currentPosition: { coords: { longitude: 6.09444, latitude: 52.5125 } },
      currentPositionString: "",
      positionId: "",
      timerId: null
    }
  }

  ClearWatch = () => {
    navigator.geolocation.clearWatch(this.state.timerId);
    this.setState({ timerId: null });
  }

  GetWatch = () => {
    let id = navigator.geolocation.watchPosition(
      (position) => {
        let geoPos = JSON.stringify(position);
        this.setState({ currentPosition: position, currentPositionString: geoPos });
      },
      (error) => {
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    );
    this.setState({ positionId: id })
  }

  GetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let geoPos = JSON.stringify(position);
        this.setState({ currentPosition: position, currentPositionString: geoPos });
      },
      (error) => {
        console.log(error)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
    );
  }

  componentDidMount() {
    this.setState({ timerId: setInterval(() => this.GetWatch(), 2000) });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableHighlight onPress={this.GetLocation} style={styles.optionButton}><Text>Get location</Text></TouchableHighlight>
          <TouchableHighlight onPress={this.ClearWatch} style={styles.optionButton}><Text>Save battery</Text></TouchableHighlight>
        </View>
        <Text style={styles.coordsBottom}>{this.state.currentPosition.coords.latitude} / {this.state.currentPosition.coords.longitude}</Text>
        <MapView
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          region={{
            latitude: this.state.currentPosition.coords.latitude,
            longitude: this.state.currentPosition.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{ latitude: this.state.currentPosition.coords.latitude, longitude: this.state.currentPosition.coords.longitude }}
            title={"Huidige locatie"}
            description={"Uw huidige locatie"} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGroup: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row'
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: null,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    width: 'auto',
    zIndex: 999,
    height: 35,
    margin: 4
  },
  coordsBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: null,
    borderRadius: 6,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    width: 'auto',
    zIndex: 999,
    height: 35,
    marginBottom: 20
  }
});
