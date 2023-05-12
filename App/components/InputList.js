import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TextInput from './textInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

const SingleInputBox = ({
  value,
  index,
  handleDeleteButton,
  dataUpdateInInputField,
  placeholder = 'চিন্তা গুলো লিখুন',
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'stretch',
        paddingBottom: 5,
        paddingHorizontal: 5,
      }}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        icon="lightbulb-on"
        name="data"
        placeholder={placeholder}
        onChangeText={(data) => dataUpdateInInputField(index, data)}
        value={value}
        style={{
          borderRadius: 0,
          borderWidth: 1,
          borderColor: '#95cba8',
          borderRightWidth: 0,
        }}
        width="88%"
      />

      <TouchableOpacity
        style={{
          width: '12%',
          backgroundColor: colors.danger,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleDeleteButton(index)}
      >
        <MaterialCommunityIcons
          name={'trash-can-outline'}
          size={20}
          style={{
            padding: 8,
            color: 'white',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const AddMore = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        display: 'flex',
        marginTop: 4,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: '85%',
          backgroundColor: '#d5d5d5',
          padding: 3,
          borderRadius: 3,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          <MaterialCommunityIcons name={'plus'} size={17} />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const InputList = ({ items, setItems, placeholder }) => {
  const list = items.length === 0 ? [''] : items;
  const setList = setItems;

  const addMoreInputField = () =>
    setList((prev) => {
      return [...prev, ''];
    });

  const handleDeleteButton = (index) => {
    setList((items) => {
      items = items.filter((item, i) => i !== index);
      if (items.length === 0) items.push('');
      return items;
    });
  };

  const dataUpdateInInputField = (index, data) => {
    setList((dataList) => {
      return dataList.map((item, i) => {
        return i === index ? data : item;
      });
    });
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <View>
        <View>
          {list.map((item, index) => (
            <SingleInputBox
              value={item}
              index={index}
              key={index}
              handleDeleteButton={handleDeleteButton}
              dataUpdateInInputField={dataUpdateInInputField}
              placeholder={placeholder}
            />
          ))}
        </View>

        <AddMore onPress={addMoreInputField} />
      </View>
    </View>
  );
};

export default InputList;
