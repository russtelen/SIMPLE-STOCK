import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, SafeAreaView} from 'react-native';
import finnhub from '../api/Finnhub'
import { API_KEY } from "@env";
import {EvilIcons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import { Button } from 'react-native-elements';

export default function Search() {
    const [results, setResults] = useState();
    const [term, setTerm]= useState()  
    
    const searchAPI = async (data) => {
        console.log("term", term)        
        const response = await finnhub.get(`quote?symbol=${data}&token=${API_KEY}`)       
        console.log("results", results) 
        setResults(response.data.c)         
    };  

    useEffect( () => {
      //console.log("results", results)        
    },[results])
    
    return(
        <>
        {             
            results ? (
            <View style={styles.container}>
                <View style={styles.section1}>
                    <EvilIcons styles={styles.icon} name="search"/>
                    <TextInput styles={styles.input} placeholder="Enter stock index here" onChangeText={(event) => setTerm(event)} />
                    <Button styles={styles.button} title="SEARCH" onPress={() => searchAPI(term)}/>
                </View>
                <View style={styles.section2}> 
                    <Text style={{margin: 15}}> ${results}</Text>
                    <View style={{margin: 5}}>
                        <Button styles={styles.button}   title="BUY"/>
                    </View>
                    <View style={{margin: 5}}>
                        <Button styles={styles.button}  title="SELL"/> 
                    </View>
                </View>                
            </View>
        ) :  (       
        <View style={styles.container}>
            <View style={styles.section1}>
                <EvilIcons styles={styles.icon} name="search"/>
                <TextInput styles={styles.input} placeholder="Enter stock index here" onChangeText={(event) => setTerm(event)} />
                <Button styles={styles.button} title="SEARCH" onPress={() => searchAPI(term)}/>
            </View>
        </View>
    )    
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',         
        alignItems: 'center',
        marginTop: Constants.statusBarHeight        
    }, 
    section1: {
       display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',         
        alignItems: 'flex-start',  
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 6, 
        width: 300,
        margin: 15,
        marginTop: 25
    },

    section2: {
        display:'flex',
         flexDirection: 'row',
         justifyContent:'center',         
         alignItems: 'center',  
         
         width: 300,
         height: 100         
     },            

    input: {
        flex:6,
        width: 150,
        height: 100,
        borderWidth: 5,
        borderColor: "#20232a",
        borderRadius: 6,        
    },
    icon: {
        // flex: 1,
        marginHorizontal: 15,
        fontSize: 50,
        marginHorizontal: 15
    },
    button: {
        // flex: 1,
        margin: 15,        
 
    }
})