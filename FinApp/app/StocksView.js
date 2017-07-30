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
import GainersFile from './Exchange/Gainers.json';
import LoosersFile from './Exchange/Loosers.json';

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
        this.props.navigation.navigate('ExchangeDetailView', {exchId: ExchangeIdMap[exchange.exchName]});
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
      paddingTop:20,
    },
  headerText: {
        textDecorationLine:'underline',
        fontWeight:'bold',
    },
    rowStyle: {
        flexDirection:'row', 
        padding:15,
        justifyContent:'space-around'
    },
    evenRowStyle : {
        backgroundColor:'#FBDAD3'
    }
});

const ExchangeIdMap = {
    "BSE" : 1,
    "NSE" : 2,
    "Dow Jones" : 3
}

class ExchangeDetailView extends Component {

    static navigationOptions = {
     title: 'Exchange Details',
  }

  constructor(props){
      super(props)
      this.segList = ['BSE', 'NSE', 'Dow Jones'];
      this.gainLoseSegList = ['Gainers', 'Loosers'];
      this.gainerList = GainersFile;
      this.losersList = LoosersFile;
      const dataList = [];
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

      this.state = {
        dataList,
        selectedIndex: this.props.navigation.state.params.exchId - 1,
        gainLoseIndex: 0,
        dataSource: this.ds.cloneWithRows(dataList),
      };
    }

    getGainersList(index) {
        console.log("Raw "+this.gainerList);
        var dataList = [];
        this.gainerList.map((stock) => {
            if(stock.exchangeId == index + 1) {                
                dataList.push(stock);
            }
        });
        return dataList;
    }

    getLosersList(index) {
        console.log(" Loosers Raw "+this.losersList);
        var dataList = [];
        this.losersList.map((stock) => {
            if(stock.exchangeId == index + 1) {                
                dataList.push(stock);
            }
        });
        return dataList;
    }

    componentDidMount() {
        
        var dataList = this.getGainersList(this.state.selectedIndex);        
    
        console.log("Exact Gainers "+dataList);
        this.setState({
            dataList,
            dataSource: this.ds.cloneWithRows(dataList)
        });
    }

   handleIndexChange = (index) => {
       dataList= this.state.gainLoseIndex ? this.getLosersList(index) : this.getGainersList(index) ;
       this.setState({
           dataList,
           dataSource: this.ds.cloneWithRows(dataList),
           selectedIndex: index,            
      });      
    }

    handleGainLoseIndexChange = (index) => {
        dataList= index ? this.getLosersList(this.state.selectedIndex) : this.getGainersList(this.state.selectedIndex);
        this.setState({
           dataList,
           dataSource: this.ds.cloneWithRows(dataList),
           gainLoseIndex: index,            
      }); 
    }

    render() {
        const selected = this.props.navigation.state.params.name;

        return(
            <View style={{flex: 1, backgroundColor:'white'}}>
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

                     <ListView
                        style={{paddingTop:20}}
                        removeClippedSubviews={false}
                        enableEmptySections={true} 
                        dataSource={this.state.dataSource}
                        renderRow={(data, sectionId, rowId) => {
                                            let evenRow = rowId % 2 == 0;
                                            return(
                                                <View style={[styles.rowStyle, evenRow && styles.evenRowStyle]}>
                                                <Text>{data.security}</Text>
                                                <Text>{data.price}</Text>
                                                <Text>{data.change}</Text>
                                            </View>
                                            )
                                        }
                                }
                    /> 

                    <SegmentedControlTab
                        values={this.gainLoseSegList}
                        selectedIndex={this.state.gainLoseIndex}
                        onTabPress={this.handleGainLoseIndexChange}
                    />
            </View>
        )
    }
}

const StocksView = StackNavigator({
        ExchangeView : { screen: ExchangeView},
        ExchangeDetailView : { screen: ExchangeDetailView},        
})

export default StocksView;