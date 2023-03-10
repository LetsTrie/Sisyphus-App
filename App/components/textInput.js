import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function AppTextInput({ icon, style, width = '92%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.textInputStyle]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 35,
    flexDirection: 'row',
    padding: 13,
    paddingHorizontal: 13,
    marginTop: 10,
  },
  icon: {
    marginRight: 7,
    alignSelf: 'center',
  },
  textInputStyle: {
    width: '80%',
    fontSize: 15,
  },
});

export default AppTextInput;
