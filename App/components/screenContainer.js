import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';

function ScreenContainer({ children, style, onLayout }) {
  return (
    <SafeAreaView style={[styles.screen, style]} onLayout={onLayout}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export { ScreenContainer };
