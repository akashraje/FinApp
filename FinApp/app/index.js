/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import StocksView from './StocksView'
import Icon from 'react-native-vector-icons/Entypo';
import { MarketsView } from './MarketsView';
import { NewsView } from './NewsView'
import { TabNavigator } from 'react-navigation';

class Markets extends Component {

    static navigationOptions = {
        tabBarLabel: 'Markets',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='line-graph'
                size = {25}/>
        )
    }

    render() {
        return(
            <MarketsView/>
        );
    }
}

class News extends Component {

    static navigationOptions = {
        tabBarLabel: 'News',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='news'
                size = {25}/>
        )
    }
    render() {
        return(
            <NewsView/>
        );
    }
}

export default FinApp = TabNavigator({
    TabItem1: {
        screen: StocksView,
        navigationOptions: {
        tabBarLabel: 'Stocks',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='calculator'
                size = {25}/>
        )
    }
    },
    TabItem2: {
        screen: Markets,
    },
    TabItem3: {
        screen: News,
    }, 
    },{
        tabBarOptions: {
            activeTintColor: '#e91e63',
        }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FinApp', () => FinApp);
