import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('Home');
  }
  return (
    <View style={styles.body}>
      <View style={styles.body_colum}>
        <Text >User</Text>
        <TextInput
            style={styles.input}
            placeholder='Enter your name'
            // onChangeText={(value) => setName(value)}
          />
          <Text>Pass</Text>
          <TextInput
              style={styles.input}
              placeholder='Enter your age'
              // onChangeText={(value) => setAge(value)}
          />
        <Pressable 
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
        >
          <Text style={styles.text}>Go to HomeScreen</Text>
      </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  body :{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  body_colum :{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  text :{
    fontSize : 40 ,
    fontWeight : 'bold',
    margin : 10
  },
})