import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppButton } from '../../components/button';
import AppModal from '../../components/modal';
import Text from '../../components/text';

const ScaleDescriptionPage = ({ navigation, route, ...props }) => {
  let testInfo = {
    title: 'Title',
    description: 'Description',
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../assests/images/ReadyForTest.jpeg')}
          style={{ height: '100%', width: '100%' }}
        >
          <LinearGradient
            colors={['#525252', '#757575']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.linearGradientStyle}
          ></LinearGradient>

          <View style={styles.container}>
            <View>
              <Text style={styles.headingText}>{testInfo.title}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                {testInfo.description}
              </Text>
            </View>
            <View>
              <AppButton
                title="Take Test"
                onPress={() =>
                  navigation.navigate('ExploreScale', {
                    ...route.params,
                  })
                }
              />
              <AppButton title="See History" />
            </View>
            <TouchableOpacity
              style={styles.aboutDesc}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.aboutDescText}>
                বিস্তারিত পড়ুন{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {/* <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={testInfo.title}
        description={getDetails()}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  linearGradientStyle: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  headingText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
    lineHeight: 45,
    letterSpacing: 0.2,
    fontWeight: '700',
  },
  descriptionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22.5,
    letterSpacing: 0.2,
    fontWeight: '700',
    lineHeight: 32,
    paddingHorizontal: 3,
  },
  aboutDesc: {
    alignItems: 'center',
    paddingTop: 10,
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    color: '#f8f1f1',
  },
  aboutDescText: {
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    letterSpacing: 1,
  },
});

export { ScaleDescriptionPage };
