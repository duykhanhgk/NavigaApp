import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {getTaskData} from '../Utils/Api';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  SectionList,
  LogBox,
} from 'react-native';

export default function HomeScreen({ navigation, route }) {
  LogBox.ignoreLogs(['Require cycle:']);
    const { id,
      userName,
      ten ,
      ho,
      emailAddress} = route.params; 
    const Stack = createNativeStackNavigator();
    const [task, setTask] = useState({
      id: 0,
      taskName : "" ,
      projectId: 0,
      projectName : "",
      description : "",
      startDate : "",
      dueDate : "",
      status : 0,
    }); 
    const [numTask, setNumTask] = useState({
       numInprocess :  0 ,
       numOpened :  0 ,
       numPending :  0 ,
       numFinish : 0 ,    
    }); 
    const lsttatus = ['Inprogress', 'Opened', 'Pending', 'Finish'];
    const onPressInprogress = async () => {
      navigation.navigate('Task', 
        { 
          id : id , 
          status : 'Inprogress',
        }
      );
    }
    const onPressOpened = async () => {
      navigation.navigate('Task', 
        { 
          id : id , 
          status : 'Opened',
        }
      );
    }
    const onPressPending = async () => {
      navigation.navigate('Task', 
        { 
          id : id , 
          status : 'Pending',
        }
      );
    }
    const onPressFinish = async () => {
      navigation.navigate('Task', 
        { 
          id : id , 
          status : 'Finish',
        }
      );
    }

    useEffect(() => {
      
        for (const [i, status] of lsttatus.entries()) {
          getTaskData(id, status).then(function(result){
            if(result.success == true && result.result.isSucceeded == true){
               const data = result.result.data;
              if(status === 'Inprogress'){
                setNumTask(previousState => {
                  return { ...previousState, numInprocess: data.length }
                });
              }else if (status === 'Opened'){
                setNumTask(previousState => {
                  return { ...previousState, numOpened: data.length }
                });
              }else if (status === 'Pending'){
                setNumTask(previousState => {
                  return { ...previousState, numPending: data.length }
                });
              }else if (status === 'Finish') {
                setNumTask(previousState => {
                  return { ...previousState, numFinish: data.length }
                });
              }
            }else{
                Alert.alert('Warning!', 'GetTask '+status+' Fail !') 
            }
          })
        }

        
    }, []);
    

   
    return (
      <View  style={styles.container}>
        <Pressable onPress={onPressInprogress} style={styles.titleInprogress}>
          <Text style={styles.textTask}>Inprogress : {numTask.numInprocess}</Text>
        </Pressable>
        <Pressable onPress={onPressOpened} style={styles.titleOpened}>
          <Text style={styles.textTask}>Opened : {numTask.numOpened}</Text>
        </Pressable>
        <Pressable onPress={onPressPending} style={styles.titlePending}>
          <Text style={styles.textTask}>Pending : {numTask.numPending}</Text>
        </Pressable>
        <Pressable onPress={onPressFinish} style={styles.titleFinish}>
          <Text style={styles.textTask}>Finish : {numTask.numFinish}</Text>
        </Pressable>
      </View>

      // </SafeAreaView>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8 
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    },
    titleInprogress: {
      width : '100%',
      height : '25%',
      textAlign : 'center',
      fontSize: 32,
      backgroundColor: 'rgb(116, 96, 238)' ,
      borderColor : 'white',
      borderWidth : 5 ,
    },
    titleOpened: {
      width : '100%',
      height : '25%',
      textAlign : 'center',
      fontSize: 32,
      backgroundColor: 'rgb(252, 75, 108)',
      borderColor : 'white',
      borderWidth : 5 ,
    },
    titlePending: {
      width : '100%',
      height : '25%',
      textAlign : 'center',
      fontSize: 32,
      backgroundColor: 'rgb(255, 178, 43)' ,
      borderColor : 'white',
      borderWidth : 5 ,
    },
    titleFinish: {
      width : '100%',
      height : '25%',
      textAlign : 'center',
      fontSize: 32,
      backgroundColor: 'rgb(0, 150, 136)' ,
      borderColor : 'white',
      borderWidth : 5 ,
    },
    textTask: {
      fontSize: 32,
      textAlign : 'center',
    }

  });
  