import React, { useState, useEffect } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  LogBox,
  FlatList
  
} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import { getTaskData, changeStatus } from '../Utils/Api';


export default function TaskScreen({ navigation, route }) {
    LogBox.ignoreLogs(['Require cycle:']);
    
    const { id, status } = route.params;
    const [userId, setUserId] = useState(id);
 
   const [lstTask1, setLstTask1] = useState(null);
   const lstTask=  [] ;
   const GroupBtnInprogess = ({id}) => (
    <View style = {styles.containerRow}>
      <CustomButton
      title='Finish'
      color='rgb(0, 150, 136)'
      //onPressFunction={() =>  onPressHandle(id,'Finish')}
      />
      <CustomButton
      title='Pending'
      color='rgb(255, 178, 43)'
      onPressFunction={() => onPressHandle(id,'Pending')}
      />
    </View>
   );
  
   const GroupBtnPending = ({id}) => (
    <View style = {styles.containerRow}>
      <CustomButton
      title='Inprogress'
      color='rgb(255, 178, 43)'
      onPressFunction={() => onPressHandle(id,'Inprogress')}
      />
    </View>
   );
   const onPressHandle = async (id,status) => {
    //check có task đang inprogress không nếu có cần top trước
    if(status == 'Inprogress'){
      getTaskData(userId, status).then(function(result){
        if(result.success == true && result.result.isSucceeded == true ){
            if(result.result.data.length > 0){
              Alert.alert('Warning!', 'Hiện đang có Task Inprogress, Vui lòng Stop trước khi start !');
            }else{//khong có task dang chay, inprogress task này
              changeStatus(id,status).then(function(result1){
                if(result1.success == true && result1.result.isSucceeded == true ){
                  navigation.navigate('Home',{});
                }else{
                  Alert.alert('Warning!', 'Change Task không thành công!');
                }
              })
            }   
        }else{
            Alert.alert('Warning!', 'GetTask Fail !')
        }
      })
    }else{
      changeStatus(id,status).then(function(result){
        if(result.success == true && result.result.isSucceeded == true ){
          navigation.navigate('Home',{});
        }else{
          Alert.alert('Warning!', 'Change Task không thành công!');
        }
      })
    }
  }



   const renderItem  = ({ item }) => (
    <View style = {styles.container}>
        <View style = {styles.titleInprogress}>
            {/* <Text style = {styles.textItem}> Id: {item.id} </Text> */}
            <Text style = {styles.textItem}> Project: {item.project} </Text>
            <Text style = {styles.textItem}> Subject: {item.subject} </Text>
            <Text style = {styles.textItem}> Description: {item.description} </Text>
            <View style = {styles.containerRow}> 
              <Text style = {styles.textItemHaft}> Start date: {moment(item.start_date).format('DD/MM/YYYY')} </Text>
              <Text style = {styles.textItemHaft}> Due date: {moment(item.due_date).format('DD/MM/YYYY')} </Text>
            </View>
            
            <View>
              {item.status_id == 3 ? <GroupBtnInprogess id = {item.id}></GroupBtnInprogess> : null }
              {item.status_id == 4 ? <GroupBtnPending id = {item.id}></GroupBtnPending> : null }
              {item.status_id == 1 ? <GroupBtnPending id = {item.id}></GroupBtnPending> : null }
              {/* {item.status_id == 5 ? <GroupBtnPending></GroupBtnPending> : null }  */}
            </View>

        </View>
    </View>
  );
    useEffect(() => {
      navigation.setOptions({ title: status });
      getTaskData(userId, status).then(function(result){
        if(result.success == true && result.result.isSucceeded == true ){
            if(result.result.data.length > 0){
              const lstdata = result.result.data;
              for (const [i, data] of lstdata.entries()) {
                console.log(data);
                lstTask.push({
                  id :  data.id,
                  project : data.project ,
                  subject :  data.subject ,
                  description : data.description ,
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
    },

    textItemHaft : {
      fontSize: 11,
      fontWeight : 'bold',
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 22,
      borderRadius : 10,
  }
  });
  