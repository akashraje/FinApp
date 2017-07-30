import React from 'react';
import { View,
        Text,
        StyleSheet,
        Dimensions } from 'react-native';


const ExchangeRow = (props) => (
    <View style={styles.container}>
        <Text>Nifty</Text>
        <Text>04.05 PM | 07 July 2017</Text>
        <Text style={styles.value}>7634.17</Text>
        <Text style={styles.value}>1.92%</Text>
        <Text style={styles.gainloser}>Gainers & Losers</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        margin: 5,
        width: Dimensions.get('window').width - 10,
        height: 150,
        borderWidth:StyleSheet.hairlineWidth,   
        shadowColor:'gray', 
        shadowOffset:{width:0, height:5},  
        shadowOpacity: 6,  
    },
    value: {    
        alignItems:'flex-start',
        alignSelf: 'flex-end',
    },
    gainloser: {    
        alignSelf:'flex-end',
    }

});

export default ExchangeRow;