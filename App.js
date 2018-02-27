/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Icon,} from 'react-native-elements';
import InputButton from './InputButton';


const inputButtons = [
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    ['C', 0, '=', '+'],
    ['CtoF','FtoC']
];

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
        super(props);

        this.initialState = {
            previousInputValue: 0,
            inputValue: 0,
            symbolSelected: null,
            resultDisplayed: false,
        };

        this.state = this.initialState;
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayPanel}>
          <Text style={styles.displayText}>{this.state.inputValue}</Text>
          <Text style={styles.displayText}>{this.state.previousInputValue} {this.state.symbolSelected}</Text>
        </View>
        <View style={styles.keysPanel}>
          {this._renderInputButtons()}
        </View>
      </View>
    );
  }
   _renderInputButtons() {

        let views = inputButtons.map((row, rowId) => {
            let inputRow = row.map((buttonVal, columnId) => {
                return <InputButton
                            value={buttonVal}
                            onPress={this._onInputButtonPressed.bind(this, buttonVal)}
                            key={columnId} />;
            });

            return <View style={styles.inputRow} key={'row-' + rowId}>{inputRow}</View>;
        });

        return views;
    }

    _onInputButtonPressed(input) {
        if((typeof input)=='number')
        {
          return this._handleNumberInput(input);
        }else
        {
          return this._handleStringInput(input);
        }
    }

    _handleNumberInput(num) {
      
      if(this.state.resultDisplayed)
      {
        this.setState({
            inputValue: num,
            resultDisplayed: false,
        });
      }else
      {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue,
        });
      }
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    symbolSelected: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;

            case '=':
                let symbol = this.state.symbolSelected,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                let result = eval(previousInputValue + symbol + inputValue);
                  if(!(result%1==0))
                  {
                    result = result.toFixed(5);  
                  }
                this.setState({
                    previousInputValue: null,
                    inputValue: result,
                    symbolSelected: null,
                    resultDisplayed : true,
                });
                break;

            case 'C':
                this.setState({
                  previousInputValue: 0,
                  inputValue: 0,
                  symbolSelected: null,
                  resultDisplayed: false,
                });
                break;

            case 'CtoF':
              let farenheit = this._convertFarenheitToCelsius(this.state.inputValue);
              this.setState({
                    previousInputValue: null,
                    inputValue: farenheit,
                    symbolSelected: null,
                    resultDisplayed : true,
                });
              break;

            case 'FtoC':
              let celsius = this._convertFarenheitToCelsius(this.state.inputValue); 
              this.setState({
                    previousInputValue: null,
                    inputValue: celsius,
                    symbolSelected: null,
                    resultDisplayed : true,
                });           
              break;

        }
    }

    _convertFarenheitToCelsius(inp)
    {
      let result = (inp+32)*5/9;
      return result;
    }

    _convertCelciusToFarenheit(inp)
    {
      let result = (inp*9/5)-32;
      return result;
    }
}

// export default class App extends Component<Props> {
//     state = {
//       count:0,
//     };

//   render() {
//     return (
//         <View style={styles.container}>
//           <Text style = {{flex:1, fontSize: 50,}}>{this.state.count}</Text>
//           <TouchableOpacity style= {{flex:1}} onPress={
//             ()=>{this.setState({
//             count: this.state.count+1,
//             });}
//           }>
//             <Text> Arun </Text>
//           </TouchableOpacity>
//         </View>
//       );
    

//   }
//   }



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#474545', 
    flex: 1,
    flexDirection: 'column',
  },
  displayPanel: {
    flex: 2,
    backgroundColor: '#474545',
  },
  keysPanel: {
    flex: 8, 
    backgroundColor: '#2b2a2a',
  },
    playlistTitle: {
      color: '#fff', 
      fontSize: 30,
      textAlign: 'center',
    },
    trackTitle: {
      color: '#fff', 
      fontSize: 40,
      textAlign: 'center',
    },
  trackControlPanel: {
    backgroundColor: '#38f', 
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  inputRow: {
        flex: 1,
        flexDirection: 'row'
    },
    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 8,
    },


});
