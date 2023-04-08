import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { AppButton } from './button';
import Text from './text';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const ModalWithTitleDescription = (props) => {
  const navigation = useNavigation();

  const handleCloseButton = () => {
    props.closeModal();
    setTimeout(() => {
      navigation.navigate(props.navigateTo, {
        ...props.scale,
        goBack: props.goBack,
      });
    }, 5);
  };

  return (
    <View style={styles.scrollViewStyle}>
      <ScrollView>
        <View style={styles.container}>
          {props.title !== '' && (
            <View>
              <Text style={styles.headingText}>{props.title}</Text>
            </View>
          )}

          {props.icon && (
            <View style={styles.imageContainer}>
              <ImageBackground
                source={props.icon}
                style={styles.imageBackground}
              ></ImageBackground>
            </View>
          )}

          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {props.description}
            </Text>
          </View>
          <View>
            <AppButton
              title={props.buttonText}
              onPress={handleCloseButton}
              style={{ backgroundColor: '#52a871' }}
              textStyle={{ fontSize: 17.5 }}
            />
          </View>

          {props.returnToHomepageExists && (
            <View>
              <AppButton
                title={'হোমপেইজে প্রবেশ করুন'}
                onPress={() => props.closeModal()}
                style={{ backgroundColor: colors.medium }}
                textStyle={{ fontSize: 17.5 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
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
    textAlign: 'justify',
    lineHeight: 26,
    padding: 5,
    paddingHorizontal: 9,
    color: '#666',
    paddingBottom: 10,
  },
  imageContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
  },
  imageBackground: {
    height: 200,
    width: 200,
  },
});

export { ModalWithTitleDescription };
