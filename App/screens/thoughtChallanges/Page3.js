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
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { AppButton } from '../../components/button';
import RatingSystem from './RatingSystem';
import colors from '../../config/colors';
import { errorLog } from '../../helpers/log';
import InputList from '../../components/InputList';

const screenName = 'ThoughtChallengeP3';

const toArray = (arr) =>
  Array.isArray(arr) ? (arr.length > 0 ? arr : ['']) : [arr ?? ''];

const ThoughtChallengeP3 = ({ navigation, route, ...props }) => {
  const { accessToken } = props;
  const key = `@thought_ch:${accessToken}`;
  const { getItem, setItem } = useAsyncStorage(key);

  const [isLoading, setIsLoading] = useState(false);
  const [isFullPageLoading, setIsFullPageLoading] = useState(true);

  const [explainInAnotherPOV, setExplainInAnotherPOV] = useState([
    '',
  ]);
  const [proveLeft, setProveLeft] = useState(['']);
  const [proveRight, setProveRight] = useState(['']);
  const [finalThought, setFinalThought] = useState(['']);
  const [rating, setRating] = useState(25);

  const [lastPageThoughts, setLastPageThoughts] = useState(['']);
  const [lastPageRatings, setLastPageRatings] = useState(0);

  const [checkedNo, setCheckedNo] = useState(null);
  const [selectedThought, setSelectedThought] = useState('');

  function handleBackButtonClick() {
    navigation.navigate(route.params.goBack ?? 'ThoughtChallengeP2');
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

  useEffect(() => {
    (async () => {
      try {
        let item = await getItem();
        if (item) {
          item = JSON.parse(item);

          setLastPageThoughts(toArray(toArray(item.initialThinking)));
          setLastPageRatings(item.initialRating ?? 0);

          setExplainInAnotherPOV(toArray(item.explainInAnotherPOV));
          setSelectedThought(item.oneOptionOfThoughts ?? '');
          setProveLeft(toArray(item.proveLeft));
          setProveRight(toArray(item.proveRight));
          setFinalThought(toArray(item.finalThought));
          setRating(item.changedRating ?? 0);
        }
      } catch (e) {
        errorLog(e);
      } finally {
        setIsFullPageLoading(false);
      }
    })();
  }, []);

  const handlePress = async () => {
    setIsLoading(true);

    try {
      let item = await getItem();
      item = item ? JSON.parse(item) : {};

      const payload = {
        ...item,
        explainInAnotherPOV,
        proveLeft,
        proveRight,
        finalThought,
        changedRating: rating,
        oneOptionOfThoughts: selectedThought,
      };

      setItem(JSON.stringify(payload));

      navigation.navigate('ThoughtChallengeP4', {
        goBack: screenName,
      });
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const set2ndRating = (r) => {
    setLastPageRatings(r);
    setRating(r);
  };

  const handleCheckBox = (i, t) => {
    setCheckedNo(i);
    setSelectedThought(t);
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
            <Text
              style={[
                styles.normalText,
                {
                  fontWeight: 'bold',
                  fontSize: 17,
                  lineHeight: 25,
                  paddingBottom: 20,
                },
              ]}
            >
              এবার, আপনার নেতিবাচক চিন্তা (গুলো) একটু পরখ করে দেখার
              পালা। একাধিক নেতিবাচক চিন্তা শনাক্ত করে থাকলে একটি বেছে
              নিন, বিশেষ করে যেই চিন্তাটি আপনাকে সবচেয়ে বেশি যন্ত্রণা
              দিচ্ছে বলে মনে করেন, সেটি দিয়ে কাজ শুরু করুন।
            </Text>

            <View style={{ paddingBottom: 5 }}>
              {lastPageThoughts.map((t, i) => (
                <View style={{ paddingBottom: 10 }} key={i}>
                  <BouncyCheckbox
                    size={24}
                    fillColor={colors.primary}
                    unfillColor="#FFFFFF"
                    text={t}
                    iconStyle={{
                      borderColor: 'red',
                      paddingRight: 0,
                      marginRight: -4,
                    }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={() => handleCheckBox(i, t)}
                    disableBuiltInState
                    isChecked={checkedNo === i}
                    textStyle={{
                      color: '#333',
                      marginBottom: 2,
                      textDecorationLine: 'none',
                    }}
                  />
                </View>
              ))}
            </View>

            <Text style={styles.normalText}>
              প্রথমত, নিজেকে প্রশ্ন করুন, “যেই ঘটনা বা একাধিক ঘটনার
              প্রেক্ষিতে আমি এমনটা ভাবছি, অন্য কোন দৃষ্টিকোণ থেকে ঘটনা
              (গুলো) ব্যাখ্যা করা যায় কি?” কোন তাড়াহুড়া না করে সময়
              নিয়ে প্রশ্নটি ভাবুন এবং উত্তরটি লিখে ফেলুন।
            </Text>

            <InputList
              items={explainInAnotherPOV}
              setItems={setExplainInAnotherPOV}
              placeholder={'অন্য কোন ব্যাখ্যা'}
            />

            <Text style={styles.normalText}>
              লক্ষ্য করুন, আপনার নির্দিষ্ট চিন্তাটিতে বা বিশ্বাসের
              রেটিঙে কোন পরিবর্তন এসেছে কিনা এবং লিখে ফেলুন।
            </Text>

            <View style={{ paddingBottom: 20 }}>
              <RatingSystem
                rating={lastPageRatings}
                setRating={set2ndRating}
              />
            </View>

            <Text style={styles.normalText}>
              দ্বিতীয় পর্বে 'প্রমান' খোঁজার পালা। আপনার নির্দিষ্ট
              চিন্তাটির পেছনে আপনার কিছু কারণ ও প্রমান আছে, সেগুলো
              খুঁজে বের করে নিচের বক্সে এক এক করে লিখুন।
            </Text>

            <InputList
              items={proveLeft}
              setItems={setProveLeft}
              placeholder={'পক্ষে প্রমাণ'}
            />

            <Text style={styles.normalText}>
              এবার গভীর মনোযোগ দিয়ে ভেবে দেখুন, আপনার অভিজ্ঞতায় এমন
              কিছু প্রমান ও কারণ আছে যেগুলো আপনার এই চিন্তাটিকে
              সাপোর্ট করে না। সেগুলো নিচের বক্সে এক এক করে লিখে ফেলুন।
            </Text>

            <InputList
              items={proveRight}
              setItems={setProveRight}
              placeholder={'বিপক্ষে প্রমাণ'}
            />

            <Text style={styles.normalText}>
              এবার উপরের দুটো বক্সে খুব মনোযোগ দিয়ে নিরীক্ষণ করুন এবং
              বিকল্প একটি চিন্তা লিখুন যা যৌক্তিকভাবে বেশি
              সামঞ্জ্যপূর্ণ বা অর্থপূর্ণ।
            </Text>

            <InputList
              items={finalThought}
              setItems={setFinalThought}
            />

            <Text style={styles.normalText}>
              নেতিবাচক চিন্তায় কোন পরিবর্তন হল কি? নেতিবাচক চিন্তার
              প্রতি বিশ্বাসের তীব্রতায় কিছুটা পরিবর্তন হল কি? (রেট
              করুনঃ ০ থেকে ১০০)
            </Text>

            <View style={{ paddingBottom: 20 }}>
              <RatingSystem rating={rating} setRating={setRating} />
            </View>

            <Text style={styles.normalText}>
              আপনার নেতিবাচক চিন্তার প্রতি আপনার বিশ্বাসের পূর্বের
              রেটিং ও বর্তমান রেটিং তুলনা করুন।
            </Text>

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
  redirectionButton: {
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: 200,
    height: 20,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: 200,
    height: 20,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {})(ThoughtChallengeP3);
