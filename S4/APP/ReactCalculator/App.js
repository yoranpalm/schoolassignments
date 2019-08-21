import React from 'react';
import { StyleSheet, Text, View, Alert, YellowBox } from 'react-native';
import styles from './Styles.js';
import InputButton from './InputButton.js';

YellowBox.ignoreWarnings(['Remote debugger']);

const buttons = [
  ['M+', 'MR', 'MC', 'CE'],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [0],
  ['+', '-', '*'],
  ['=', '/', 'x2']
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { output: "", selectedSymbol: "", memory: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}><Text style={styles.outputText}>{this.state.output}</Text></View>
        <View style={styles.buttons}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }

  renderButtons() {
    let buttonView = [];

    buttons.forEach((item, index) => {
      let row = [];

      item.forEach((item, index) => {
        row.push(<InputButton key={index} onPress={(item) => { this.inputButtonPressed(item); }} waarde={item} />);
      })

      buttonView.push(<View key={index} style={styles.inputRow}>{row}</View>);
    });

    return buttonView;
  }

  inputButtonPressed(value) {
    if (value == "+" || value == "-" || value == "/" || value == "*") {
      console.log(value);
      let x = this.state.output;
      this.setState({ first: x, selectedSymbol: value, output: "" });
    }
    else if (value == "M+") {
      let m = this.state.memory;
      let x = this.state.output;
      this.setState({ memory: m + x });
      console.log('Added ' + x + ' to memory');
    }
    else if (value == "MR") {
      let m = this.state.memory;
      this.setState({ output: m });
      console.log('Memory: ' + m);
    }
    else if (value == "MC") {
      let e = "";
      this.setState({ memory: e });
      console.log('Memory cleared');
    }
    else if (value == "CE") {
      let e = "";
      this.setState({ first: e, selectedSymbol: 0, output: e });
      console.log('Output cleared');
    }
    else if (value == "=") {
      let y = eval(this.state.first + this.state.selectedSymbol + this.state.output);
      console.log(this.state.first + this.state.selectedSymbol + this.state.output);
      console.log(y);
      this.setState({ first: 0, selectedSymbol: null, output: y });
    }
    else {
      this.setState({
        output: this.state.output == "null" ? "" + value : this.state.output + '' + value
      });
    }
  }
}