import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { AppButton } from '../../components/button';
import { errorLog } from '../../helpers/log';
import { createCard } from '../../services/card';

const NewCardModal = ({
  accessToken,
  sectionId,
  modalVisible,
  setModalVisible,
  reloadCards,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const body = { sectionId, text: inputValue };
      await createCard(accessToken, body);
      reloadCards();
      setInputValue('');
      setModalVisible(false);
    } catch (error) {
      errorLog(error.stack);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        style={styles.modal}
        backdropColor={'white'}
        backdropOpacity={1}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ margin: 22 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              নতুন কার্ড যুক্ত করুন
            </Text>
          </View>
          <TextInput
            style={{
              height: 120,
              borderColor: '#c3c3c3',
              borderWidth: 1,
              padding: 10,
              paddingLeft: 15,
              overflow: 'hidden',
              borderRadius: 8,
              fontSize: 16,
            }}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
          />

          <View style={{ alignItems: 'center', marginTop: 15 }}>
            {isLoading ? (
              <ActivityIndicator
                size={50}
                color={'#52a871'}
                style={{ paddingBottom: 25 }}
              />
            ) : (
              <AppButton
                title="সাবমিট করুন"
                style={styles.buttonStyle}
                textStyle={styles.buttonText}
                onPress={handleSubmit}
                disabled={!inputValue}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonStyle: {},
});

export default NewCardModal;
