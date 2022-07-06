
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ImageBackground,
  Alert,
  LogBox,
} from 'react-native'; 



export async function getJSONAsyncLogin(userName, password) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "userNameOrEmailAddress":'khanhnd',
        "password": 'Khanh914119',
        "twoFactorVerificationCode": "null",
        "rememberClient": "true",
        "twoFactorRememberClientToken": "string",
        "singleSignIn": "false",
        "returnUrl": "null",
        "captchaResponse": "string"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const response = await fetch("http://portalapi.hinnova.vn/api/TokenAuth/Authenticate", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function Login(navigation, userName, password) {
    if (userName.length == 0 || password.length == 0) {
        Alert.alert('Warning!', 'Chưa nhập user hoặc password kìa bạn ơi !!');
      }else{
        getJSONAsyncLogin(userName,password).then(function(result){
          if(result.success == true){
            //Get thong tin user 
            const authen = result.result.accessToken;
            if(authen.length == 0 ){
                Alert.alert('Warning!', 'Login Thất Bại');
            }else{
                // console.log(authen);
                getUserData(authen).then(function(result){
                     //console.log(result.result.user);
                    //Chuyen sang home
                     navigation.navigate(
                        'Home', 
                        { 
                            id : result.result.user.id , 
                            userName : result.result.user.userName ,
                            ten : result.result.user.name ,
                            ho :  result.result.user.surname,
                            emailAddress : result.result.user.surname.emailAddress
                            
                        }
                    );
                })
            }
           
          }else{
            Alert.alert('Warning!', 'Login Thất Bại')
          }
        });
      }
}

export async function getUserData(authen){
    const Authenticate = "Bearer "+ authen ;
    const url = 'http://portalapi.hinnova.vn/api/services/app/Session/GetCurrentLoginInformations';
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", Authenticate);
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    const response = await callApi(url, requestOptions);
    const json = await response;
    return json;
}

export async function getTaskData(userId, status){
  // const url = 'http://portalapi.hinnova.vn/api/services/app/HIN_Dashboards/DataResultStore_Param?nameStore=Widget_Redmine_GetDetail&dataSrcId=4&userID_url=10073';
  var url = 'http://portalapi.hinnova.vn/api/services/app/HIN_Dashboards/DataResultStore_Param?nameStore=Widget_Redmine_GetDetail&dataSrcId=4';
  if(userId > 0 && status.length != 0 ){
    url += '&userID_url='+userId;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify([
      {
        "Varible": "Tracker",
        "Value": "Task"
      },
      {
        "Varible": "Status",
        "Value": status
      },
      {
        "Varible": "title",
        "Value": status
      }
    ]);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const response = await callApi(url, requestOptions);
    const json = await response;
    // console.log(json);
    return json;
  }else {
    Alert.alert('Warning!', 'GetTask Fail !')
  }
}



export async function callApi(url,requestOptions){
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
}



