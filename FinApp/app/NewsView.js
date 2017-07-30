import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ListView,
    Dimensions,
    Image,
    StatusBar,
    TouchableOpacity,
    WebView,
    Modal,
    Button
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const NEWS_URL = 'https://newsapi.org/v1/articles?source=financial-times&apiKey=1a3dc33a7124441b989243d29029d7ba'; 

export class NewsView extends Component {

    constructor() {
        super();
        const newsList = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        fetching: false;
        selectedNews= '';
        modalVisible = false;

        this.state = {
            newsList,
            selectedNews,
            modalVisible,
            dataSource: this.ds.cloneWithRows(newsList),
      };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    componentDidMount() {
        this.setState({
            fetching: true
        });

        fetch(NEWS_URL, {
            method: 'get',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then(response => {return response.articles})
        .then(newsList => this.setState({
            newsList,
            fetching: false,
            dataSource: this.ds.cloneWithRows(newsList)
        }))
        .catch(err => console.error('Error while fetching the news', err));
    }

    newsClicked(data) {
        this.setState({
            selectedNews:data.url
        });
        this.setModalVisible(!this.state.modalVisible);
        console.log(data.title);
    }

    render() {
        console.log("Newslist "+this.state.newsList);
        return(
            <View style={{flex:1}}>
                <StatusBar hidden={true}></StatusBar>
                <Modal
                    style={{flex:1}}
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}>
                    
                    <Button
                        title='Close'
                        onPress={() => this.setModalVisible(false)}/>

                    <WebView                
                        source={{uri: this.state.selectedNews}}/>

                </Modal>

                <ActivityIndicator size='large'
                    style={styles.spinner}
                    animating={this.state.fetching}/>
                    <Text style={styles.news}>NEWS</Text>
                    <Text style={styles.powerd}>Powered by https://newsapi.org</Text>
                 <ListView
                        removeClippedSubviews={false}
                        enableEmptySections={true} 
                        dataSource={this.state.dataSource}
                        renderRow={(data) => <TouchableOpacity style={{flexDirection: 'row', padding: 10}}
                                                onPress={() => this.newsClicked(data)}>
                                                <Image style={styles.photo} source={{uri:data.urlToImage}}/>
                                                <Text style={styles.text}>{data.title}</Text>
                                             </TouchableOpacity>}
                    /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
  spinner: {
      position: 'absolute',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
  },
    photo: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  news: {
    fontSize: 25,
    alignSelf:'center',
    alignContent:'center',
    color:'gray'
  },
  text: {
      margin: 5,
      fontSize:17,
      color:'gray'
  },
  powerd:{
      fontSize: 10,
    alignSelf:'flex-end',
    
    color:'gray'
  }
  
});