import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { stylePatterns } from './src/utils/stylesPatterns';
import { Timer } from './src/features/timer/Timer';


export default function App() {
  const [ focusSubject, setFocusSubject ] = useState('');
  const [ focusHistory, setFocusHistory ] = useState([]);

  useEffect(() => {
    if (focusSubject){
      setFocusHistory([...focusHistory, focusSubject]);
    }

  }, [focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject 
      ? <Timer 
      focusSubject={focusSubject}
      onTimerEnd={() => setFocusSubject(null)}
      clearSubject={() => setFocusSubject(null)}
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
    backgroundColor: stylePatterns.color.darkBlue
  },
});
