import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import Icon from '@expo/vector-icons/Ionicons';

function AppButton({
  title,
  onPress,
  style,
  textStyle,
  color = 'primary',
  disabled = false,
  showIcon = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {showIcon && (
        <Icon
          name="trash"
          size={19}
          color="white"
          style={{ paddingRight: 4 }}
        />
      )}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

// TODO: Change the color when it is disabled
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 4,
    marginBottom: 8,
    elevation: 1,
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export { AppButton };
