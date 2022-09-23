import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { AppButton } from './button';
import { useNavigation } from '@react-navigation/native';

const AppModal = ({
  modalVisible,
  setModalVisible,
  title,
  description,
  navigateTo,
  onPress,
  isLoading = false,
}) => {
  const onPressHandler = async () => {
    try {
      await onPress();
      // navigation.navigate(navigateTo);
    } catch (error) {}
  };
  const navigation = useNavigation();
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={styles.scrollViewStyle}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ paddingBottom: 15 }}>
                <Text style={styles.modalHeading}>{title}</Text>
                <Text style={styles.modalText}>{description}</Text>
              </View>
              {isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={'#52a871'}
                  style={{ paddingBottom: 25 }}
                />
              ) : (
                <AppButton
                  onPress={onPressHandler}
                  title="সম্মতি প্রদান করুন"
                  style={{ backgroundColor: '#52a871' }}
                  textStyle={{ fontSize: 18 }}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginBottom: 0,
    height: '100%',
  },
  modalView: {
    margin: 10,
    marginVertical: 0,
    padding: 30,
    paddingHorizontal: 25,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeading: {
    color: '#5caf7a',
    fontSize: 30,
    paddingVertical: 10,
    paddingBottom: 15,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 39,
    fontWeight: '700',
  },
  modalText: {
    fontSize: 17,
    lineHeight: 26.5,
    color: '#555',
    paddingBottom: 5,
    textAlign: 'justify',
  },
  modalBoldText: {
    fontSize: 17,
    lineHeight: 29,
    color: '#444',
    paddingBottom: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollViewStyle: {
    // marginBottom: 20,
    minHeight: '100%',
  },
});

export default AppModal;
