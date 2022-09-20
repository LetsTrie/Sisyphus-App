import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { AppButton } from '../../components/button';
import Text from '../../components/text';
import { useNavigation } from '@react-navigation/native';

const ScaleDescriptionPage = (props) => {
  const navigation = useNavigation();

  const takeTestHandle = () => {
    props.closeModal();
    setTimeout(() => {
      navigation.navigate('ExploreScale', {
        ...props.scale,
      });
    }, 5);
  };

  return (
    <View style={styles.scrollViewStyle}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>
            {props.scale.banglaTitle}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {props.scale.description}
          </Text>
        </View>
        <View>
          <AppButton
            title="স্কেল পূরণ করুন"
            onPress={takeTestHandle}
            style={{ backgroundColor: '#52a871' }}
            textStyle={{ fontSize: 17.5 }}
          />
          <AppButton
            title="হিস্ট্রি দেখুন"
            style={{ backgroundColor: '#52a871' }}
            textStyle={{ fontSize: 17.5 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    height: '100%',
  },
  container: {
    height: '100%',
    padding: 10,
  },
  headingText: {
    textAlign: 'center',
    // color: 'white',
    fontSize: 26,
    lineHeight: 45,
    letterSpacing: 0.2,
    fontWeight: '700',
    paddingHorizontal: 15,
    fontWeight: '700',
    paddingVertical: 15,
    paddingBottom: 15,
    color: '#52a871',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 28.5,
    padding: 5,
    paddingBottom: 30,
    color: '#666',
  },
});

export { ScaleDescriptionPage };
