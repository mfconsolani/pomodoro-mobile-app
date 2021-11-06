import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { stylePatterns } from '../utils/stylesPatterns';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 2,
  isPaused,
  onProgress,
  onEnd
}) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  
  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(()=> {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    onProgress(millis/minutesToMillis(minutes));

    return () => clearInterval(interval.current);
  }, [isPaused, millis]);


  return (
    // <View style={styles.container}>
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: stylePatterns.fontSizes.xxxl,
    fontWeight: "bold",
    color: stylePatterns.color.white,
    padding: stylePatterns.paddingSizes.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  },
});