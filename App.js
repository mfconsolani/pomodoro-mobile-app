import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { stylePatterns } from './src/utils/stylesPatterns';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
};

export default function App() {
  const [ focusSubject, setFocusSubject ] = useState('');
  const [ focusHistory, setFocusHistory ] = useState([]); 

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1), subject, status}]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e){
      console.log(e);
    }
  };

  useEffect(()=> {
    loadFocusHistory();
  }, []);

  useEffect(()=> {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {focusSubject 
      ? <Timer 
      focusSubject={focusSubject}
      onTimerEnd={() => {
        addFocusHistorySubjectWithStatus(focusSubject,STATUSES.COMPLETE);
        setFocusSubject(null);
      }}
      clearSubject={() => {
        addFocusHistorySubjectWithStatus(focusSubject,STATUSES.CANCELLED);
        setFocusSubject(null);
      }}
      />
      : 
      (<>
        <Focus addSubject={setFocusSubject}/>
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
      </>)
      }
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
