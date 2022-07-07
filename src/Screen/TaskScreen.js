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
  FlatList
  
} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import { getTaskData } from '../Utils/Api';





export default function TaskScreen({ navigation, route }) {
    LogBox.ignoreLogs(['Require cycle:']);
    
    const { id, status } = route.params;
    navigation.setOptions({ title: status });

    const [task, setTask] = useState({
      id :  0 ,
      subject :  '' ,
      start_date : '' , 
      due_date : '', 
      status : '',  
   });  
   const [lstTask1, setLstTask1] = useState(null);
   const lstTask=  [] ;
   
  const GroupBtnInprogess = () => (
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
   );

   const GroupBtnPending = () => (
    <View style = {styles.containerRow}>
      <CustomButton
      title='Inprogess'
      color='rgb(255, 178, 43)'
      //onPressFunction={onPressHandler}
      />
    </View>
   );



   const renderItem  = ({ item }) => (
    <View style = {styles.container}>
        <View style = {styles.titleInprogress}>
            <Text style = {styles.textItem}> Id: {item.id} </Text>
            <Text style = {styles.textItem}> Subject: {item.subject} </Text>
            <Text style = {styles.textItem}> Start date: {moment(item.start_date).format('DD/MM/YYYY')} </Text>
            <Text style = {styles.textItem}> Due date: {moment(item.due_date).format('DD/MM/YYYY')} </Text>
            <View>
              {item.status_id == 3 ? <GroupBtnInprogess></GroupBtnInprogess> : null }
              {item.status_id == 4 ? <GroupBtnPending></GroupBtnPending> : null }
            </View>

        </View>
    </View>
  );
    useEffect(() => {
      getTaskData(id, status).then(function(result){
        if(result.success == true && result.result.isSucceeded == true ){
            if(result.result.data.length > 0){
              const lstdata = result.result.data;
              for (const [i, data] of lstdata.entries()) {
                lstTask.push({
                  id :  data.id,
                  subject :  data.subject ,
                  start_date : data.start_date , 
                  due_date : data.due_date,   
                  status_id : data.status_id,
                });
              }
              setLstTask1(lstTask);
            }else{
              Alert.alert('Warning!', 'No Task !')
            }
            
        }else{
            Alert.alert('Warning!', 'GetTask Fail !')
        }
      })
    },[]);
    if (lstTask1 == null  || lstTask1[0].id === 0) {
      return <Text>Still loading...</Text>;
    }
    return (
      
     <SafeAreaView >
      <FlatList
        data={lstTask1}
        renderItem={renderItem}
       // keyExtractor={item => item.id}
      />
     </SafeAreaView>
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
      // width : '100%',
      // height : '100%',
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
  