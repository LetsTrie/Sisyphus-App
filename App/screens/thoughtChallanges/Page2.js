import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { AppButton } from '../../components/button';
import RatingSystem from './RatingSystem';
import colors from '../../config/colors';
import { errorLog } from '../../helpers/log';
import InputList from '../../components/InputList';

const screenName = 'ThoughtChallengeP2';

const ThoughtChallengeP2 = ({ navigation, route, ...props }) => {
  const { accessToken } = props;
  const key = `@thought_ch:${accessToken}`;
  const { getItem, setItem } = useAsyncStorage(key);

  const [isFullPageLoading, setIsFullPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState(25);
  const [initThinking, setInitThinking] = useState(['']);

  // ****************************************************************
  // Handle Back-button Functionality
  // ****************************************************************
  function handleBackButtonClick() {
    navigation.navigate('ThoughtChallengeP1', {
      ...(route.params ?? {}),
    });
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  // ****************************************************************
  // Get Initial Data
  // ****************************************************************
  useEffect(() => {
    (async () => {
      try {
        let item = await getItem();
        if (item) {
          item = JSON.parse(item);

          setRating(item.initialRating ?? 25);
          setInitThinking(item.initialThinking ?? ['']);
        }
      } catch (e) {
        errorLog(e);
      } finally {
        setIsFullPageLoading(false);
      }
    })();
  }, []);

  const handlePress = async () => {
    try {
      setIsLoading(true);

      const payload = {
        initialThinking: initThinking,
        initialRating: rating,
      };
      setItem(JSON.stringify(payload));

      navigation.navigate('ThoughtChallengeP3', {
        goBack: screenName,
      });
    } catch (e) {
      errorLog(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isFullPageLoading ? (
        <ActivityIndicator
          size={50}
          color={'#52a871'}
          style={{ paddingTop: 25 }}
        />
      ) : (
        <ScrollView>
          <View style={{ padding: 15, paddingTop: 20 }}>
            <Text style={styles.normalText}>
              চিন্তার পরিবর্তনের জন্য প্রথমেই নিজের চিন্তাগুলো
              সচেতনভাবে লক্ষ্য করুন এবং একটি ডায়েরি তৈরি করুন। নিচের
              উদাহরণগুলো লক্ষ্য করুন।
            </Text>
            <View>
              <Text style={[styles.headerText]}>চিন্তার ডাইরি</Text>
            </View>

            <Text style={styles.normalText}>
              চলুন কিছু ভাবনার ধরন দেখে নিই, যা মানুষ বিভিন্ন
              পরিস্থিতিতে ভাবেঃ
            </Text>

            <Text style={styles.normalText}>
              ◉ আমাকে কেউ মুল্য দেয় না
            </Text>

            <Text style={styles.normalText}>
              ◉ আমাকে কেউ ভালোবাসেনা
            </Text>

            <Text style={styles.normalText}>
              ◉ বেঁচে থাকার কোন অর্থ নেই
            </Text>

            <Text style={styles.normalText}>
              ◉ চাকরীর পরীক্ষায় আমি পাশ করবো না
            </Text>

            <Text style={[styles.normalText, { marginBottom: 7 }]}>
              ◉ আমার স্মৃতিশক্তি দুর্বল
            </Text>

            <Text style={[styles.normalText]}>
              এগুলো এক ধরনের “নেতিবাচক চিন্তা” যা আপনার সুন্দর ও
              সুস্থভাবে চলতে বাধা হয়ে দাঁড়ায়।
            </Text>

            <Text style={[styles.normalText, { marginTop: 10 }]}>
              আপনি আপনার নেতিবাচক চিন্তা (গুলো) লিখে ফেলুন
            </Text>

            <InputList
              items={initThinking}
              setItems={setInitThinking}
            />

            <Text style={styles.normalText}>
              আপনি এই চিন্তাগুলো কতটুকু বিশ্বাস করেন (০ থেকে ১০০ রেট
              করুন)
            </Text>

            <View style={{ paddingBottom: 20 }}>
              <RatingSystem rating={rating} setRating={setRating} />
            </View>
            <View style={styles.redirectionButtonContainer}>
              {isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={'#52a871'}
                  style={{ paddingBottom: 25 }}
                />
              ) : (
                <AppButton
                  title="পরবর্তী পেইজ"
                  style={styles.redirectionButton}
                  onPress={handlePress}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 18,
    color: colors.primary,
  },
  normalText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    paddingBottom: 5,
  },
  textAreaStyle: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    overflow: 'hidden',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 18,
  },
  redirectionButtonContainer: {
    marginTop: -5,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(ThoughtChallengeP2);
