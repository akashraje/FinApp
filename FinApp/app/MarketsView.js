import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ListView
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import LoosersFile from './Exchange/Loosers.json';

export class MarketsView extends Component {

    constructor() {
        super();
     this.gainers = LoosersFile;  
        const dataList = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        
        this.state= {
            dataList,
            dataSource: this.ds.cloneWithRows(dataList),
        }
    }

componentDidMount() {
     
}
    

 SECTIONS = [
  {
    title: 'BSE',
    content: "Akash"//this.getGainers(1),
  },
  {
    title: 'NSE',
    content: "Raje"//this.getGainers(2),
  },
  {
      title: 'Dow Jones',
      content: "ASR"//this.getGainers(3)
  }
];

getGainers(section) {
        var dataList = [];
        console.log(this.gainers);
        this.gainers.map((stock) => {
            if(stock.exchangeId == section.content) {                
                dataList.push(stock);
            }
        });
        return dataList;
    }

    renderHeader(section) {
        return (
            <View style={{margin:5}}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
            </View>
     );
    }

    

    getDataSource(section) {
        return this.ds.cloneWithRows(section.content);
    }

    renderContent(section) {
        // const dataSource = this.getDataSource(section);
        
        return (
            <View>
        <View style={styles.contentView}>
            <Text style={styles.content}>Reliacne</Text>
            <Text>717</Text>                                       
        </View>
        <View style={styles.contentView}>
            <Text style={styles.content}>Unitech</Text>
            <Text>981</Text>                                       
        </View>
        <View style={styles.contentView}>
            <Text style={styles.content}>Tata Motors</Text>
            <Text>1213</Text>                                       
        </View>
        <View style={styles.contentView}>
            <Text style={styles.content}>Mahindra</Text>
            <Text>717</Text>                                       
        </View>
        </View>
        );
    }

    render() {
        return(
            <Accordion 
                sections={this.SECTIONS}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentView:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#FBDAD3'
    },
    content:{
        fontSize:20,
        
    },
    sectionHeader:{
        fontSize:20,
        borderWidth:1,
        paddingLeft:5
    },
    sectionView: {
        backgroundColor:'#FBDAD3'
    }
})