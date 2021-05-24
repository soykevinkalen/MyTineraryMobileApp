// import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import Header from '../components/Header'
// import Footer from '../components/Footer'
import React, { useEffect, useState, useRef } from 'react';

import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'

// import GoogleLogin from 'react-google-login'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import {NavLink} from 'react-router-dom'
// import GoogleButton from 'react-google-button'
import {StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native'

const SignIn = (props) => {
    const [user, setUser] = useState({email: '', password: ''})
    // const [eye, setEye] = useState(false)
    // useEffect (() =>{
    //     window.scrollTo(0,0)
    // }, [])
    const readInputUser = (e, campo) => {
        setUser({
          ...user,
          [campo]: e
        })
    }

    const sendValueUser = async () => {
        // e && e.preventDefault()
        // let userGen = e ? user : googleUser
        if(Object.values(user).some(value => value === "")){
            // return toast.error('Fill in the fields')
            return false
        }
        const response = await props.logInUser(user)
        if(response){
            // toast.error(response)
            console.log(response)
        }else{
            props.navigation.navigate('home')
            // toast.success('Welcome')
            // setTimeout(function(){ props.history.push('/') }, 5000);       
        }
    }
    // const responseGoogle = (response) => {
    //     if(response.profileObj.email){
    //         sendValueUser(null, {email: response.profileObj.email, password: 'a'+response.profileObj.googleId})
    //     }
    // }

    return(
        <>
            <ImageBackground style={styles.background} source={{uri:"https://i.ibb.co/cQLgmDh/northern-lights-1197755-1920.jpg"}}>
                {/* <div> */}
                    {/* <FlightTakeoffIcon className='logoForm'/> */}
                    <Text style={styles.texto}>Sign in</Text>
                    <View style={styles.formulario}>
                        <TextInput 
                            placeholder="Please, enter your email adress"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'email')}
                        />
                        {/* <input type="text" placeholder="Please, enter your email adress"
                        onChange={readInputUser} value={user.email} name="email" /> */}
                        <TextInput 
                            placeholder="Please, enter your password"
                            placeholderTextColor = 'white'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => readInputUser(e, 'password')}
                        />
                        {/* <div> */}
                            {/* <input type= "password" eye ? "text" : "password"  placeholder="Please, enter your password" */}
                            {/* onChange={readInputUser} value={user.password} name="password" /> */}
                            {/* {eye ? <VisibilityOffOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eyeSignUp' onClick={()=>setEye(!eye)}/>} */}
                        {/* </div> */}
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={sendValueUser}>
                            <Text style={{color:'white'}}>Sign in!</Text>
                        </TouchableOpacity>
                        {/* <button className="boton" onClick={sendValueUser}>Sign in!</button> */}
                        {/* <GoogleLogin
                            clientId="974935643152-dc0ocnkdohrlv5gug0tjbf6r9t32smcb.apps.googleusercontent.com"
                            render={renderProps => (
                                <GoogleButton className='btn-google' onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
                            )}
                            buttonText="Sign in with google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                    </View>
                    {/* <ToastContainer /> */}
                    <Text style={styles.text}>Don't have an account? <Text style={{fontWeight: 'bold'}} onPress={()=>props.navigation.navigate('signup')}>Sign up!</Text></Text>
                    {/* <p className='account'>Don't have an account?  <NavLink to='/signup' className="navLink sign">Sign up here!</NavLink></p> */}
                {/* </div> */}
            </ImageBackground>
            {/* <Footer /> */}
        </>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        color: 'white',
        marginTop: 30,
        backgroundColor: "#aeafafab",

    },
    background: {
      flex: 1,
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
        color: 'white',
        // textDecorationLine: 'underline',
        marginTop: 10,
        fontWeight: 'bold',
        backgroundColor: "#aeafafab",

    },
    formulario: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 60,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        // backgroundColor: 'red',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'none',
        backgroundColor: "#aeafafab",

    },
    boton: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 30,
        fontSize: 20,
        marginTop: 30,
        color: 'white'
    }
  });

const mapDispatchToProps = {
    logInUser: authActions.logInUser 
}

export default connect(null ,mapDispatchToProps)(SignIn)
