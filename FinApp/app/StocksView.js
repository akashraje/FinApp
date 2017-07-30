import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import ExchangeRow from './Exchange/ExchangeRow';
import ExchangeFile from './Exchange/Exchange.json';

import SegmentedControlTab from 'react-native-segmented-control-tab'


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
  },
  header: {
      flexDirection:'row', 
      justifyContent:'space-around', 
      paddingTop:20
    },
  headerText: {
        textDecorationLine:'underline',
        fontWeight:'bold',
    }
});

class ExchangeDetailView extends Component {

    static navigationOptions = {
     title: 'Exchange Details',
  }

  constructor(props){
      super(props)
      this.segList = ['BSE', 'NSE', 'Dow Jones'];
      this.state = {
        selectedIndex: this.getSelectedIndex(this.props.navigation.state.params.name),
      };
    }

   handleIndexChange = (index) => {
      this.setState({
        selectedIndex: index,
      });
    }

    getSelectedIndex(selected) {
    var index;
     this.segList.map((exchange, i) => {
            if (exchange === selected) {
                index = i;
            }
        });
        return index;
    }

    render() {
        const selected = this.props.navigation.state.params.name;
        console.log("Selected "+this.getSelectedIndex(selected));
        return(
            <View style={{flex: 1}}>
                <SegmentedControlTab
                    values={this.segList}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    />

                    <View style={styles.header}>
                        <Text style={styles.headerText}>STOCKS</Text>
                        <Text style={styles.headerText}>Current Price</Text>
                        <Text style={styles.headerText}>% CHANGE</Text>
                    </View>
            </View>
        )
    }

    
}

const StocksView = StackNavigator({
        ExchangeView : { screen: ExchangeView},
        ExchangeDetailView : { screen: ExchangeDetailView},        
})

export default StocksView;