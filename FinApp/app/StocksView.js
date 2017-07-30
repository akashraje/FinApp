import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import ExchangeRow from './ExchangeRow/ExchangeRow';

class ExchangeView extends Component {

    static navigationOptions = {
     title: 'Exchanges',
  }

  constructor(props) {
      super(props);

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

      this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
  }

    render() {
        return(
           <ListView
                dataSource= {this.state.dataSource}
                renderRow= { (data) => <ExchangeRow/>}    
                
            />
        )
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10,
    backgroundColor: 'black'
  }
});

class ExchangeDetailView extends Component {

    static navigationOptions = {
     title: 'Exchange Details',
  }

    render() {
        return(
            <Text> ExchangeDetailView</Text>
        )
    }
}

const StocksView = StackNavigator({
        ExchangeView : { screen: ExchangeView},
        ExchangeDetailView : { screen: ExchangeDetailView}
})

export default StocksView;