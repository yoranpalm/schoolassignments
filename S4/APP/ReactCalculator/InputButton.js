import React from 'react';
import styles from './Styles.js';
import { Text, View, TouchableHighlight } from 'react-native';

export default class InputButton extends React.Component
{
    render()
    {
        return(
            <TouchableHighlight onPress={()=>this.props.onPress(this.props.waarde)} style={styles.inputButton}
            underlayColor="#DCDCDC">
            <Text style={styles.inputButtonText}>{this.props.waarde}</Text>
            </TouchableHighlight>
        );
    }
}