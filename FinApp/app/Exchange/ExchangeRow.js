import React, { Component } from 'react';
import { View,
        Text,
        StyleSheet,
        Dimensions,
        TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ExchangeRow extends Component {

    getArrow(gainLossData) {
        return gainLossData.isGain ? 'long-arrow-up' : 'long-arrow-down' ;
    }

    getGainLossColor(gainLossData) {
        return gainLossData.isGain ? 'green' : 'red';
    }

    render() {
        console.log(this.props.ExchangeData);
        const ExchangeData = this.props.ExchangeData;
        return(
            <TouchableOpacity style={styles.container}
                onPress={() => this.props.onSelect(ExchangeData)}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.textStyle}>{ExchangeData.exchName}</Text>
                        <Text style={{color:'gray',fontSize:10}}>{ExchangeData.dateTime}</Text>
                    </View>
                    <View>
                        <Text style={styles.valueStyle}>{ExchangeData.value}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon name= { this.getArrow(ExchangeData.gainLoss) }
                                color={this.getGainLossColor(ExchangeData.gainLoss)}
                                size={19}/>
                            <Text 
                                style={{color:this.getGainLossColor(ExchangeData.gainLoss), paddingLeft:5}}>
                                    {ExchangeData.gainLoss.value}
                            %</Text>
                        </View>                        
                    </View>
                </View>

                <Text style={styles.gainLoseStyle}>Gainers & Losers</Text>
            </TouchableOpacity>
        );
    }

    
}



ExchangeRow.PropTypes = {
    ExchangeData: React.PropTypes.any.isRequired
}

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
        justifyContent:'space-between',
        backgroundColor:'white',
    },
    value: {    
        alignSelf: 'flex-end',
    },
    textStyle: {
        fontSize:20,
        textDecorationLine:'underline',
        color:'gray'
    },
    valueStyle: {
        fontSize:20,
        color:'gray'
    },
    gainLoseStyle: {
        fontSize:18,
        color:'#4A93D6',
        textDecorationLine:'underline',
        fontWeight:'bold',
        alignSelf: 'flex-end',
    }

});

export default ExchangeRow;