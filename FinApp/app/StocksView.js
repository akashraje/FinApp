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
import ExchangeFile from './ExchangeRow/Exchange.json';

class ExchangeView extends Component {

    static navigationOptions = {
     title: 'Exchanges',
  }

  constructor() {
      super();
        const exchDataList = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

      this.state = {
          exchDataList,
          dataSource: this.ds.cloneWithRows(exchDataList),
      };
  }

  componentDidMount() {
    console.log("componentDidMount");
    const exchDataList = ExchangeFile;
    console.log(exchDataList);
    this.setState({
            exchDataList,
            dataSource: this.ds.cloneWithRows(exchDataList)
      });
  }

  rowClicked(exchange) {
        console.log("Selected Exchange "+exchange.exchName);
        this.props.navigation.navigate('ExchangeDetailView', {name: exchange.exchName});
}

    render() {
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <ListView     
                    enableEmptySections={true}           
                    dataSource= {this.state.dataSource}
                    renderRow= { (data) => <ExchangeRow ExchangeData={data} onSelect={this.rowClicked.bind(this)}/> }                    
                />
            </View>           
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
            <Text> {this.props.navigation.state.params.name}</Text>
        )
    }
}

const StocksView = StackNavigator({
        ExchangeView : { screen: ExchangeView},
        ExchangeDetailView : { screen: ExchangeDetailView},        
})

export default StocksView;