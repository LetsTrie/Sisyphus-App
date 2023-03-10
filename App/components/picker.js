import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from './text';
import defaultStyles from '../config/styles';
import PickerItem from './pickerItem';
import { ScreenContainer } from './screenContainer';
import colors from '../config/colors';

function AppPicker({
  icon,
  placeholder,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  selectedItem,
  style,
  width = '100%',
  onChange,
  placeholderColor,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }, style]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={[styles.placeholder]}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ScreenContainer>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalButtonStyle}
          >
            <Text style={styles.modalBtnText}>Close</Text>
          </TouchableOpacity>

          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
                onChange={onChange}
              />
            )}
          />
        </ScreenContainer>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
    fontSize: 15,
  },
  text: {
    flex: 1,
    fontSize: 15,
  },
  modalButtonStyle: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52a871',
    marginHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  modalBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default AppPicker;
