import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import { stylePatterns } from '../../utils/stylesPatterns';
import { RoundedButton } from '../../components/RoundedButton';

export const HistoryItem = ({ item }) => {
  return (
    <Text style={historyItem(item.status)}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory.length &&
          <>
            <Text style={styles.title}>
              Things we have focused on
            </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
          </>
        }
      </SafeAreaView>
    </>
  );
};

const historyItem = (status) => ({
  color: status > 1 ? 'red' : 'green',
  fontSize: stylePatterns.fontSizes.md
});

const styles = StyleSheet.create({
  title: {
    color: stylePatterns.color.white,
    fontSize: stylePatterns.fontSizes.lg
  },
  clearContainer: {
    alignItems: "center",
    padding: stylePatterns.paddingSizes.md
  }
});