
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
} from 'react-native';


export default class InputButton extends Component {
    
    render() {
        return (
            <TouchableOpacity style={styles.inputButton}
                                underlayColor="#193441"
                                onPress={this.props.onPress}>
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
    
}

const styles = StyleSheet.create({
  inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#91AA9D'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },

    
});