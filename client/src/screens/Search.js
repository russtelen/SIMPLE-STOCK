import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, SafeAreaView} from 'react-native';
import finnhub from '../api/Finnub'
//import { API_KEY } from "dotenv";
import {EvilIcons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import { Button } from 'react-native-elements';
import { stockTransaction } from '../network';

export default function Search() {
    const [results, setResults] = useState();
    const [term, setTerm] = useState();
    const [numberOfShares, setNumberOfShares] = useState(1);

    useEffect( () => {           
        console.log("results", results)              
    },[results])

    const searchAPI = async (data) => {
        console.log("term", term)        
        //const response = await finnhub.get(`quote?symbol=${data}&token=${API_KEY}`)       
        const response = await finnhub.get(`quote?symbol=${data}&token=c1he28v48v6qtr46ae90`)    
        //console.log("results", results) 
        setResults(+(response.data.c))         
    };  

    //handling buy
    const handleBuy = async (data) => {
        console.log("data", data)
        console.log("results", results)
        try {
            const res = await stockTransaction(data);
            console.log(data);
            if (res) {
                alert(res.message);                
            }
        } catch (e) {
            console.log(e);
        }
    };

    //handling sell
    const handleSell = async (data) => {
        console.log("data", data)
        console.log("results", results)
        try {
            const res = await stockTransaction(data);
            if (res) {
                alert(res.message);                
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <>
        {             
            results ? (
            <View style={styles.container}>
                <View style={styles.section1}>
                    <EvilIcons styles={styles.icon} name="search"/>
                    <TextInput styles={styles.input} placeholder="Enter stock index here" onChangeText={(event) => setTerm(event)} />
                    <Button buttonStyle={{backgroundColor:"#ffb347"}} styles={styles.button} title="SEARCH" onPress={() => searchAPI(term)}/>
                </View>
                <View style={styles.section2}> 
                    <Text style={{margin: 15}}> ${results}</Text>
                    <View style={styles.numberOfShares}>
                        <TextInput
                            placeholder="# of shares"
                            style={styles.textInputBox}
                            clearButtonMode="always"
                            type="number"
                            keyboardType="number-pad"
                            value={numberOfShares}
                            onChangeText={(event) => setNumberOfShares(event)}
                        ></TextInput>
                    </View>
                    <View style={{margin: 5}}>
                        <Button buttonStyle={{backgroundColor:"#ffb347"}} styles={styles.button}   title="BUY"
                            onPress={() =>
                                handleBuy({
                                    symbol: term,
                                    numShares: numberOfShares,
                                    quotePrice: -(results),
                                })
                            }
                        />
                    </View>
                    <View style={{margin: 5}}>
                        <Button buttonStyle={{backgroundColor:"#ffb347"}}  title="SELL"
                            onPress={() =>
                                handleSell({
                                    symbol: term,
                                    numShares: numberOfShares,
                                    quotePrice: (results)
                                })
                            }
                        /> 
                    </View>
                </View>                
            </View>
        ) :  (       
        <View style={styles.container}>
            <View style={styles.section1}>
                <EvilIcons styles={styles.icon} name="search"/>
                <TextInput styles={styles.input} placeholder="Enter stock index here" onChangeText={(event) => setTerm(event)} />
                <Button buttonStyle={{backgroundColor:"#ffb347"}} styles={styles.button} title="SEARCH" onPress={() => searchAPI(term)}/>
            </View>
        </View>
    )    
        }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
    },
    section1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#20232a',
        borderRadius: 6,
        width: 300,
        margin: 15,
        marginTop: 25,
    },

    section2: {
        display:'flex',
         flexDirection: 'row',
         justifyContent:'center',         
         alignItems: 'center',          
         width: 300,
         height: 100         
     },

     numberOfShares: {
        display:'flex',
         flexDirection: 'row',
         justifyContent:'center',         
         alignItems: 'center',
         borderWidth: 1,
         borderColor: '#20232a',
         borderRadius: 6,
         width: 78,
         height: 30,
         marginRight: 8    
     },            

    input: {
        flex: 6,
        width: 150,
        height: 100,
        borderWidth: 5,
        borderColor: '#20232a',
        borderRadius: 6,
    },
    icon: {
        // flex: 1,
        marginHorizontal: 15,
        fontSize: 50,
        marginHorizontal: 15,
    },
    button: {
        // flex: 1,
        margin: 15,
        color : "#1E6738",
                
 
    }
})
