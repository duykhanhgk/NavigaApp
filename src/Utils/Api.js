import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ImageBackground,
  Alert,
  LogBox
} from 'react-native'; 


export async function getJSONAsyncLogin(userName, password) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "userNameOrEmailAddress":userName,
        "password": password,
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

export async function callApi(url,requestOptions){
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
}



