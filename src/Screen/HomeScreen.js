import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';


export default function HomeScreen({ navigation }) {
    const onPressHandler = () => {
      navigation.navigate('Login');
    }
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Home Screen</Text>
        <Pressable 
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
        >
          <Text style={styles.text}>Go to LoginScreen</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({
    body :{
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