import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    Dimensions.addEventListener("change", this.changedDimensions);

    let dims = Dimensions.get('window');
    this.state = {
      width: dims.width,
      height: dims.height,
      beer: []
    }
  }

  changedDimensions = ({ screen, window }) => {
    this.setState({
      width: window.width,
      height: window.height
    })
  }

  GetBier = async () => {
    let response = await fetch("https://api.ypwebdev.nl/bier");
    let data = await response.json();

    this.setState({ beer: data });
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.slider}>
        <Image style={{ width: 250, height: 330 }}
          source={{ uri: 'https://yoranpalm.nl/images/0-1.png' }} />
        <Text style={styles.title}>{item.naam}</Text>
        <Text style={styles.subtitle}>{(item.perc * 100).toFixed(2)}%</Text>
      </View>
    );
  }

  componentDidMount() {
    this.GetBier();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.GetBier} style={styles.beerButton}><Text style={styles.beerButtonText}>Biertjes ophalen</Text></TouchableHighlight>
        <Carousel
          layout={'default'}
          ref={(c) => { this._carousel = c; }}
          data={this.state.beer}
          renderItem={this.renderItem}
          sliderWidth={this.state.width}
          itemWidth={250}
          autoplay={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  beerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: null,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    width: 250,
    marginBottom: 10,
    marginTop: 180
  },
  beerButtonText: {
    color: 'white',
    textAlign: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    paddingLeft: 20
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 6,
    color: 'red',
    fontSize: 12,
  },
  slider: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 6,
    paddingBottom: 30
  }
});