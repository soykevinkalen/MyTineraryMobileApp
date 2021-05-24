import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
import {Icon} from 'react-native-elements'
import SelectPicker from 'react-native-form-select-picker';
import { StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity,ToastAndroid } from 'react-native'

const SignUp = (props) => { 
    const [user, setUser] = useState({firstName: '', lastName: '', email: '', password: '', userImage: '', country: ''})
    const [countries, setCountries] = useState([])
    const [eye, setEye] = useState(true)
    const [mistakes, setMistakes] = useState({firstName: '', lastName: '', email: '', password: '', userImage: '',country: ''})
    useEffect(()=>{
        axios.get('https://restcountries.eu/rest/v2/all')
        .then( response => {
            setCountries(response.data)})
        .catch(error => console.log(error))
    },[])
    const readInputUser = (e, campo) => {
        setUser({
          ...user,
          [campo]: e
        })
    }

    const sendValueUser = async () => {
        setMistakes({firstName: '', lastName: '', email: '', password: '', userImage: '',country: ''})
        // e && e.preventDefault()
        // let userGen = e ? user : googleUser
        
        if(Object.values(user).some(value => value === "")){
            ToastAndroid.showWithGravityAndOffset(
                "Fill in the fields",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return false
        }
        const response = await props.createUser(user)
        if(response){
            if(response.controllers){
                if(response.controllers === "There was an error in the user engraving. Retry"){
                    // return toast.error(response.controllers)
                    ToastAndroid.showWithGravityAndOffset(
                        "There was an error in the user engraving. Retry",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    return false
                }
                return setMistakes({'email': response.controllers})
            }
            response.map(error => setMistakes((prevState) =>{ 
                return {...prevState, [error.context.label]: error.message}
             }))
        }else{
            setUser({firstName: '', lastName: '', email: '', password: '', userImage: '', country: ''})
            ToastAndroid.showWithGravityAndOffset(
                `Welcome ${user.firstName}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            props.navigation.navigate('home')            
        }
    }
    // const responseGoogle = (response) => {
    //     const {givenName, familyName, email, googleId, imageUrl} = response.profileObj
    //     sendValueUser(null, {firstName: givenName, lastName: familyName , email, password: "a"+googleId, userImage: imageUrl, country: 'google', google: true})
    // }
    return(
        
            <ImageBackground style={styles.background} source={{uri:"https://i.ibb.co/cQLgmDh/northern-lights-1197755-1920.jpg"}}>
                    <View style={styles.formulario}>
                    <Text style={styles.texto}>Sign up!</Text>
                        <TextInput 
                            placeholder="Enter your first name"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'firstName')}
                            value={user.firstName}
                            
                        />
                        {mistakes.firstName ? <Text>{mistakes.firstName}</Text> : null}
                        <TextInput 
                            placeholder="Enter your last name"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'lastName')}
                            value={user.lastName}
                        /> 
                        {mistakes.lastName ? <Text>{mistakes.lastName}</Text> : null} 
                        <TextInput 
                            placeholder="Enter your email adress"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'email')}
                            value={user.email}
                            keyboardType='email-address'

                        /> 
                        {mistakes.email ? <Text>{mistakes.email}</Text> : null} 
                        <View style = {styles.inputContainer}>
                        
                            <TextInput 
                                secureTextEntry={eye}
                                placeholder="Enter your password"
                                placeholderTextColor = 'white'
                                color = 'white'
                                style = {styles.input}
                                onChangeText={(e) => readInputUser(e, 'password')}
                                value={user.password}  
                                                          
                            />
                            <View style={styles.eyeContainer}>
                                <Icon 
                                    type='material-community'
                                    name= {eye ? "eye-off-outline" : "eye-outline"} 
                                    size={40}
                                    onPress={()=> setEye(!eye)}
                                    color='white'
                                />
                            </View>
                            
                        </View>
                        
                            {mistakes.password ? <Text>{mistakes.password}</Text> : null} 
                        <TextInput 
                            placeholder="Enter the URL of your picture"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'userImage')}
                            value={user.userImage}
                        />
                        
                        {mistakes.userImage ? <Text>{mistakes.userImage}</Text> : null} 

                        <View style={[styles.input, styles.textArea]}>
                            <SelectPicker default='Choose a country' label ='country' placeholder='Choose your country' placeholderStyle={{color:'white'}} onValueChange={(value) => readInputUser(value,"country")} value={user.country} >
                            {countries.map((country, index) =>{
                                return(
                                <SelectPicker.Item label ={country.name} value={country.name} key={country.name} >{country.name} </SelectPicker.Item>
                                )
                            })}
                            </SelectPicker>
                        </View>
                        
                        {mistakes.country ? <Text>{mistakes.country}</Text> : null} 
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={sendValueUser}>
                            <Text style={{color:'white'}}>Sign up!</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Already have an account? <Text style={{fontWeight: 'bold'}} onPress={()=>props.navigation.navigate('signin')}>Sign in here!</Text></Text>
                        
                    </View>
                
            </ImageBackground>

    )
}


const styles = StyleSheet.create({
    inputContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    eyeContainer: {
        position:'absolute',
        right: 20,
        top: 20
    },
    textArea:{ 
        height: 40,
        width:"95%",
        paddingLeft:10,
        color: 'white'
    },
    background: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center',
      },
      text:{
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 10
      },
      texto: {
          fontSize: 30,
          color: 'white',
          // textDecorationLine: 'underline',
          marginTop: 10,
          fontWeight: 'bold',
        //   backgroundColor: "#aeafafab",
  
      },
    //   form: {
    //     justifyContent: 'space-evenly',
    //     width: '90%',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(16,16,16,0.5)',
    //     borderRadius:15,
    //   },
      formulario: {
            width: '90%',
            alignItems: 'center',
            backgroundColor: 'rgba(16,16,16,0.5)',
            borderRadius:15,
      },
      input: {
        // height: '10.7%',
        // backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.9)',
        width: '95%',
        height: 60,
        // borderBottomWidth: 5,
        // borderBottomColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'none',
        // backgroundColor: "#aeafafab",
  
      },
      boton: {
          backgroundColor: 'black',
          paddingVertical: 5,
          paddingHorizontal: 30,
          fontSize: 20,
          marginTop: 30,
          color: 'white',
        borderRadius: 12,

      }
  });

const mapDispatchToProps = {
    createUser: authActions.createUser
}

export default connect(null ,mapDispatchToProps)(SignUp)