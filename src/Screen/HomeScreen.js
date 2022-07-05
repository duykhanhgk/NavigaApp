import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {getTaskDataByUserAndStatus} from '../Utils/Api';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  SectionList,
  LogBox,
} from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation, route }) {
  LogBox.ignoreLogs(['Require cycle:']);
    const { id,
      userName,
      ten ,
      ho,
      emailAddress} = route.params; 
    var tmp = '';
    const numInprocess =  0 ;
    const numOpened =  0 ;
    const numPending =  0 ;
    const numFinish =  0 ;
    const lsttatus = ['Inprogress', 'Opened', 'Pending', 'Finish'];
    const Stack = createNativeStackNavigator();
    getTaskDataByUserAndStatus(id, ['Inprogress']).then(function(result){
        //console.log(result);
        tmp = result.projectName;
      // if(result.success == true && result.result.isSucceeded == true){
      //     const data = result.result.data[0];
      //     setProject(data.project);
      //     setDescription(data.description);
      //     setStartDate(data.start_date);
      //     setDueDate(data.due_date);
      // }else{
      //     Alert.alert('Warning!', 'GetTask Fail !')
      // }
    })

      const onPressFunction = async () => {
        // navigation
        navigation.navigate('Task', 
          { 
            id : id , 
          }
        );
       
      }
    return (
      <View  style={styles.container}>
        <Text>{tmp}</Text>
        {/* Task inprocess */}
        <Pressable onPress={onPressFunction} style={styles.titleInprogress}>
          <Text style={styles.textTask}>Inprogress : {numInprocess}</Text>
        </Pressable>
        <Pressable onPress={onPressFunction} style={styles.titleOpened}>
          <Text style={styles.textTask}>Opened : {numOpened}</Text>
        </Pressable>
        <Pressable onPress={onPressFunction} style={styles.titlePending}>
          <Text style={styles.textTask}>Pending : {numPending}</Text>
        </Pressable>
        <Pressable onPress={onPressFunction} style={styles.titleFinish}>
          <Text style={styles.textTask}>Finish : {numFinish}</Text>
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
  