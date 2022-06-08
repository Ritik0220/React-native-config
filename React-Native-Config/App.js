/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Config from "react-native-config";

const App: () => Node = () => {
  
  return (
    <View
    style={{
      flex:1,
      backgroundColor:'#7882A4',
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Text style={{fontSize: 18, color: '#D1D1D1'}}>{Config.API_URL}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
