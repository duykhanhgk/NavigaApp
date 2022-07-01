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
            // Alert.alert('Warning!', 'Login Thành công!!')
            navigation.navigate('Home');
          }else{
            Alert.alert('Warning!', 'Login Thất Bại')
          }
        });
      }
}



