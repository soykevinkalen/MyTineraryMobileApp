import React, { useEffect, useState, useRef } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Alert } from 'react-native';
import Header from './Header'
import { connect } from "react-redux"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {Icon} from 'react-native-elements'


const Comment = (props) => {
    const [close, setClose] = useState(false)

    const [view, setView] = useState(false)
    const [updatedComment, setUpdatedComment] = useState('')

    const edit = (comment) =>{
        setView(!view)
        setClose(!close)
        setUpdatedComment(comment.comment)
    }
    const twoOptionAlertHandler = () => {
        //function to make two option alert
        Alert.alert(
          //title
          'Are you sure?',
          //body
          "You won't be able to revert this!",
          [
            { text: 'Yes', onPress: () => props.deleteComment(props.comment) },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      };
    const send = () => {
        if(updatedComment.trim() !== ""){
            props.comment.comment = updatedComment
            props.updateComment(props.comment)
            setView(!view)
            setClose(!close)
        }
    }
    const closeButton = () => {
        setClose(!close)
        setView(!view)
    }
    return(        
        <View style={styles.container}>
            <View style={[styles.imageText, styles.cajaGrande]}>
                <View style={styles.imageText}>
                    <Image style={styles.picUser} source={{uri:`${props.comment.userId.userImage}`}}></Image>
                    <Text style={styles.text}>{props.comment.userId.firstName + " " + props.comment.userId.lastName }</Text>
                </View>
                
            {
                (props.user && props.comment.userId.email === props.user.email) ? 
                <>
                {close ? <Icon 
                        type='material-community'
                        name='close-box'
                        size={30}
                        color = 'blue'
                        onPress={()=> closeButton()}           
                    /> : 
                <View style={styles.imageText}> 
                <Icon 
                        type='material-community'
                        name='pencil-outline'
                        size={30}
                        color = 'blue'
                        onPress = {()=> edit(props.comment)}           
                    />
                <Icon 
                        type='material-community'
                        name='delete'
                        size={30}
                        color = 'blue'
                        onPress = {() => twoOptionAlertHandler()}           
                    />
                </View>}
                </> : null
            }

            </View>
            {!view && 
            <Text style={styles.text}>{props.comment.comment}</Text>}
            {view && (
                <View  style={styles.inputButton}>
                    <TextInput 
                        placeholder="Write a comment"
                        placeholderTextColor = 'white'
                        color = 'white'
                        style = {styles.input}
                        onChangeText={(e) => setUpdatedComment(e)}
                        value={updatedComment}
                    />
                    <Text style={[styles.button,styles.send]} onPress={() => send()}>Send</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        fontSize: 20,
        color:"white",
        backgroundColor: "#141823",
        textAlign: "center",
        borderRadius: 20,
        width:"50%"
    },
    inputButton:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    send:{
        width: '20%',
        height: 30,
        marginLeft: 10
    },
    imageText:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picUser: {
        width: 50,
        height: 50,
        borderRadius: 800
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 5,
    },
    input: {
        width: '60%',
        height: 60,
        backgroundColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'none',
        borderRadius: 20,
        borderColor: "red"
    },
    container: {
        width: '100%',
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent: 'space-around',
        borderColor: 'white',
        paddingVertical: 5,
        borderRadius: 10,
        marginVertical: 5
    },
    cajaGrande: {
        width: '100%'
    }
})

const mapStateToProps = state => {
    return {
        user: state.auth.userLogged,
    }
}

export default connect(mapStateToProps)(Comment)