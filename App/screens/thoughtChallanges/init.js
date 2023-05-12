import React from 'react';
import { View, Text } from 'react-native';
import { AppButton } from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorLog } from '../../helpers/log';

import { connect } from 'react-redux';

const screen = 'ThoughtChallengeInit';

const ThoughtChallengeInit = ({ navigation, ...props }) => {
  const key = `@thought_ch:${props.accessToken}`;

  const goToSummaryPage = () => {
    navigation.navigate('ThoughtSummary', {
      goBack: screen,
    });
  };

  const handleInitiateThoughtChallenge = async () => {
    try {
      await AsyncStorage.removeItem(key);
      navigation.navigate('ThoughtChallengeP1', {
        goBack: screen,
      });
    } catch (e) {
      errorLog(e);
    }
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <AppButton
        title={'চিন্তার পরিবর্তনের আগের ফলাফল'}
        onPress={goToSummaryPage}
      />
      <AppButton
        title={'নতুন চিন্তার পরিবর্তন করুন'}
        onPress={handleInitiateThoughtChallenge}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(ThoughtChallengeInit);
