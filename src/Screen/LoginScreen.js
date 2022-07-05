import React, { useState, useEffect } from 'react';

import CustomButton from '../Utils/CustomButton';
import {Login} from '../Utils/Api';
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

export default function LoginScreen({ navigation }) {
  LogBox.ignoreLogs(['Require cycle:'])
  //Khai bao cac useSate can thiet
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
 
  useEffect(() => {
   // getData();
  }, []);

  const onPressHandler = async () => {
    Login(navigation,userName,password);
   
  }
  return (
    <View style={styles.container}>
      <ImageBackground  
         resizeMode="cover"
         source={require('../../assets/pexels-deepu-b-iyer-40465.jpg')}
         style={styles.image}
      >
        <TextInput
            style={styles.input}
            placeholder='UserName or Email'
            onChangeText={(value) => setUserName(value)}
        />
        <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
        />
        <CustomButton
            title='Login'
            color='#1eb900'
            onPressFunction={onPressHandler}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body :{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  body_colum :{
    flexDirection: 'row',
    marginLeft : '10%', 
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 130,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems : "center"
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
}
})