import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { stylePatterns } from '../../utils/stylesPatterns';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

export const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} onProgress={onProgress}/>
      </View>
      <View style={{ paddingTop: stylePatterns.paddingSizes.xxl }}>
        <Text style={styles.title}>We are focusing on</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarContainer}>
      <ProgressBar color="#5E84E2" style={styles.progressBar} progress={progress}/>
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          onPress={() => setIsStarted(!isStarted)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: stylePatterns.color.white,
    textAlign: "center"
  },
  task: {
    fontWeight: 'bold',
    textAlign: "center",
    color: stylePatterns.color.white
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flex: 0.3,
    padding: stylePatterns.paddingSizes.xxl,
    justifyContent: "center",
    alignItems: "center"
  },
  progressBar:{
    height:10,
  },
  progressBarContainer:{
    paddingTop: stylePatterns.paddingSizes.sm
  }
});