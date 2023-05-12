import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ProgressBar = ({ progress, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressBarInner, { width: `${progress}%` }]}
        >
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProgressBar;
