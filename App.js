import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { stylePatterns } from './src/utils/stylesPatterns';
import { Timer } from './src/features/timer/Timer';


export default function App() {
  const [ focusSubject, setFocusSubject ] = useState('gardening');
  return (
    <View style={styles.container}>
      {focusSubject 
      ? <Timer 
      focusSubject={focusSubject}
      onTimerEnd={() => {
        setFocusSubject('');
      }}
      />
      : <Focus addSubject={setFocusSubject}/>
      }
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: stylePatterns.color.violet
  },
});
