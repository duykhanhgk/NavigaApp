import React, { useState, useEffect } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  SectionList,
  Alert,
  Button,
  LogBox,
} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import { getTaskData } from '../Utils/Api';

export default function TaskScreen({ navigation, route }) {
    LogBox.ignoreLogs(['Require cycle:']);
      //Khai bao cac useSate can thiet
    const [project, setProject] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    navigation.setOptions({ title: 'Inprogress!' });
    const { id, status } = route.params;

    

   useEffect(() => {
    getTaskData(id, status).then(function(result){
      if(result.success == true && result.result.isSucceeded == true){
          const data = result.result.data[0];
          setProject(data.project);
          setDescription(data.description);
          setStartDate(data.start_date);
          setDueDate(data.due_date);
      }else{
          Alert.alert('Warning!', 'GetTask Fail !')
      }
    })
  },[]);
    

    return (
        <View style = {styles.container}>
            <View style = {styles.titleInprogress}>
                {/* <View style = {styles.containerRow}> */}
                <Text style = {styles.textItem}> PROJECT: {project} </Text>
                <Text style = {styles.textItem}> Description: {description} </Text>
                <Text style = {styles.textItem}> Start date: {moment(startDate).format('DD/MM/YYYY')} </Text>
                <Text style = {styles.textItem}> Due date: {moment(dueDate).format('DD/MM/YYYY')} </Text>
                <View style = {styles.containerRow}>
                  <CustomButton
                  title='Finish'
                  color='rgb(0, 150, 136)'
                  //onPressFunction={onPressHandler}
                  />
                  <CustomButton
                  title='Pending'
                  color='rgb(255, 178, 43)'
                // onPressFunction={onPressHandler}
                  />
                </View>
            </View>

        </View>
        
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
      height : '50%',
      item : 'center',
      fontSize: 32,
      backgroundColor: 'rgb(116, 96, 238)' ,
      borderColor : 'white',
      borderWidth : 5 ,
      borderRadius : 10,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    containerRow: {
        flex: 1,
        flexDirection : 'row',
        width : '100%',
        height : '50%',
        fontSize: 32,
        //backgroundColor: 'white' ,
        //borderColor : 'white',
        //borderWidth : 5 ,
        // borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
    },
    textItem : {
        fontSize: 11,
        fontWeight : 'bold',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius : 10,
    }
  });
  