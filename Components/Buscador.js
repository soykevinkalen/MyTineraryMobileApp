import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import citiesActions from '../redux/actions/citiesActions'

const Buscador = (props) => {
    return(
        <View style={styles.container}>
             <TextInput 
                    placeholder="Search cities"
                    placeholderTextColor = 'white'
                    color = 'white'
                    style = {styles.input}
                    onChangeText={(e) => props.filtro(e)}
                    textDecorationLine='none'
                    />
            <ScrollView>
                    {
                        props.citiesFilter.length ? props.citiesFilter.map(city => {
                            return(
                                <TouchableOpacity style={styles.containerCaja} key={city._id} onPress={() => props.navigation.navigate('itineraries', {id:city._id})} >
                                    <View style={styles.caja}>
                                        <Image style={styles.fotoCiudad} source={{uri:`${city.path}`}}/>
                                        <View style={styles.containerText}>
                                            <Text style={styles.nombreCiudad}>{city.city}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : <View style={styles.caja}>
                            <Text style={styles.nombreCiudad}>We don't have any city that matches your search!</Text>
                            <Text style={styles.nombreCiudad}>Try another one!</Text>
                        </View>
                    }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCaja: {
        marginVertical: 10
    },
    input: {
        width: '60%',
        height: 60,
        backgroundColor: '#424242',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        borderRadius:45,
        textDecorationLine: 'none'
    },
    caja:{
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        width: '100%',
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent: 'space-around',
        marginTop: 30,
        height:'100%'    
    },
    nombreCiudad: {
        color:'white',
        textAlign: "center",
        fontSize: 20,        
    },
    containerText: {
        position:"absolute",
        width:"100%",
        backgroundColor: "rgba(16,16,16,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    fotoCiudad: {
        width: 350,
        height: 250,
        borderRadius:45,
        borderWidth: 1,
    },
})

const mapStateToProps = state => {
    return {
        citiesFilter:  state.city.citiesFilter,
    }
}
const mapDispatchToProps = {
    filtro: citiesActions.filterValue
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador)

