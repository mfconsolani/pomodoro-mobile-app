import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { stylePatterns } from '../../utils/stylesPatterns';


export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContaner}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={styles.textInput} 
          onSubmitEditing={({nativeEvent}) => setSubject(nativeEvent.text)} />
          <RoundedButton title="+" size={50} onPress={() => addSubject(subject)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContaner: {
    flex: 0.5,
    padding: stylePatterns.paddingSizes.md,
    justifyContent: "center"
  },
  title: {
    color: stylePatterns.color.white,
    fontWeight: "bold",
    fontSize: stylePatterns.fontSizes.lg
  },
  inputContainer: {
    paddingTop: stylePatterns.paddingSizes.md,
    flexDirection: 'row',
    alignItems: "center",
  },
  textInput: {
    flex: 1, 
    marginRight:stylePatterns.spacing.md,
  }
});
