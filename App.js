import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { stylePatterns } from './src/utils/stylesPatterns';
import { Timer } from './src/features/timer/Timer';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
};

export default function App() {
  const [ focusSubject, setFocusSubject ] = useState('');
  const [ focusHistory, setFocusHistory ] = useState([]); 

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status}]);
  };

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject 
      ? <Timer 
      focusSubject={focusSubject}
      onTimerEnd={() => {
        addFocusHistorySubjectWithState(focusSubject,STATUSES.COMPLETE);
        setFocusSubject(null);
      }}
      clearSubject={() => {
        addFocusHistorySubjectWithState(focusSubject,STATUSES.CANCELLED);
        setFocusSubject(null);
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
    backgroundColor: stylePatterns.color.darkBlue
  },
});
