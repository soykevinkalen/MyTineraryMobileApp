import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './Components/Header';

export default function App() {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Header />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
