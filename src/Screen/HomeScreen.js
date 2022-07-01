import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation, route }) {
    const { id,
      userName,
      ten ,
      ho,
      emailAddress} = route.params; 

      const DATA = [
        {
          title: "Main dishes",
          data: ["Pizza", "Burger", "Risotto"]
        },
        {
          title: "Sides",
          data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
          title: "Drinks",
          data: ["Water", "Coke", "Beer"]
        },
        {
          title: "Desserts",
          data: ["Cheese Cake", "Ice Cream"]
        }
      ];

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Thông tin user</Text>
        <Text style={styles.header}>{ho + ' '+ten}</Text>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
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
    }
  });
  