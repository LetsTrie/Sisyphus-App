import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { AppButton } from '../../components/button';
import colors from '../../config/colors';
import baseUrl from '../../config/baseUrl';
import { errorLog } from '../../helpers/log';
import { getChallangeData } from '../../services/user';

import { encrypt } from '../../helpers/encrypt';
import InputList from '../../components/InputList';

const createState = ({
  advantagesWithThought,
  disadvantagesWithThought,
  advantagesWithoutThought,
  disadvantagesWithoutThought,
}) => {
  return `${encrypt(advantagesWithThought)}-${encrypt(
    disadvantagesWithThought,
  )}-${encrypt(advantagesWithoutThought)}-${encrypt(
    disadvantagesWithoutThought,
  )}`;
};

const toArray = (arr) => {
  return Array.isArray(arr)
    ? arr.length > 0
      ? arr
      : ['']
    : [arr ?? ''];
};

const ThoughtChallengeP4 = ({ navigation, route, ...props }) => {
  const { accessToken } = props;
  const key = `@thought_ch:${accessToken}`;
  const { getItem, setItem, removeItem } = useAsyncStorage(key);

  const [isFullPageLoading, setIsFullPageLoading] = useState(true);
  const [intialOutputState, setInitialOutputState] = useState('---');
  const [isLoading, setIsLoading] = useState(false);

  const [advantagesWithThought, setAdvantagesWithThought] = useState([
    '',
  ]);
  const [disadvantagesWithThought, setDisadvantagesWithThought] =
    useState(['']);
  const [advantagesWithoutThought, setAdvantagesWithoutThought] =
    useState(['']);
  const [
    disadvantagesWithoutThought,
    setDisadvantagesWithoutThought,
  ] = useState(['']);

  function handleBackButtonClick() {
    navigation.navigate(route.params.goBack ?? 'ThoughtChallengeP3');
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

          setAdvantagesWithThought(
            toArray(item.advantagesWithThought),
          );
          setDisadvantagesWithThought(
            toArray(item.disadvantagesWithThought),
          );
          setAdvantagesWithoutThought(
            toArray(item.advantagesWithoutThought),
          );
          setDisadvantagesWithoutThought(
            toArray(item.disadvantagesWithoutThought),
          );
        }
      } catch (e) {
        errorLog(e);
      } finally {
        setIsFullPageLoading(false);
      }
    })();
  }, []);

  const handlePress = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    setIsLoading(true);

    try {
      let item = await getItem();
      item = item ? JSON.parse(item) : {};

      const payload = {
        ...item,
        advantagesWithThought,
        disadvantagesWithThought,
        advantagesWithoutThought,
        disadvantagesWithoutThought,
      };
      await axios.post(`${baseUrl}/account/meta-data`, payload, {
        headers,
      });
      await removeItem();

      navigation.navigate('ThoughtSummary', {
        goBack: 'ThoughtChallengeP4',
      });
      setIsLoading(false);
    } catch (error) {
      errorLog(error);
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
              উপরের দুটি ধাপে আপনার নেতিবাচক চিন্তায় বা এর প্রতি
              আপনার বিশ্বাসের তীব্রতায়, যদি কোন বিশেষ পরিবর্তন লক্ষ্য
              না করে থাকেন, তৃতীয় ধাপে কাজ শুরু করুন।
            </Text>
            <Text style={[styles.normalText, { paddingBottom: 5 }]}>
              এই পর্বে আপনার চিন্তার "সুবিধা ও অসুবিধা পর্যালোচনা"
              করুন। নিজেকে প্রশ্ন করুন, সঠিক কিংবা বেঠিক যাই হোক, এই
              চিন্তাটি 'ধরে রাখলে' আমার কী কী সুবিধা ও অসুবিধা
            </Text>
            <Text
              style={[
                styles.normalText,
                { fontWeight: 'bold', fontSize: 18, paddingTop: 5 },
              ]}
            >
              সুবিধাঃ
            </Text>

            <InputList
              items={advantagesWithThought}
              setItems={setAdvantagesWithThought}
              placeholder={'চিন্তাটি ধরে রাখলে সুবিধা'}
            />

            <Text
              style={[
                styles.normalText,
                { fontWeight: 'bold', fontSize: 18 },
              ]}
            >
              অসুবিধাঃ
            </Text>

            <InputList
              items={disadvantagesWithThought}
              setItems={setDisadvantagesWithThought}
              placeholder={'চিন্তাটি ধরে রাখলে অসুবিধা'}
            />

            <Text style={styles.normalText}>
              এবার নিজেকে আবার প্রশ্ন করুন, সঠিক কিংবা বেঠিক যাই হোক,
              এই চিন্তাটি 'ছেড়ে দিতে পারলে' আমার কী কী সুবিধা ও
              অসুবিধা আছে?
            </Text>
            <Text
              style={[
                styles.normalText,
                { fontWeight: 'bold', fontSize: 18, paddingTop: 5 },
              ]}
            >
              সুবিধাঃ
            </Text>

            <InputList
              items={advantagesWithoutThought}
              setItems={setAdvantagesWithoutThought}
              placeholder={'চিন্তাটি ছেড়ে দিলে সুবিধা'}
            />

            <Text
              style={[
                styles.normalText,
                { fontWeight: 'bold', fontSize: 18 },
              ]}
            >
              অসুবিধাঃ
            </Text>

            <InputList
              items={disadvantagesWithoutThought}
              setItems={setDisadvantagesWithoutThought}
              placeholder={'চিন্তাটি ছেড়ে দিলে অসুবিধা'}
            />

            <Text style={styles.normalText}>
              এখন আপনার সিদ্ধান্ত, আপনি কি এই চিন্তাটা ধরে রাখবেন নাকি
              ছেড়ে দিবেন।
            </Text>
            <Text style={styles.normalText}>
              সাধারণত কেউ ইচ্ছা করে কোন অপ্রীতিকর চিন্তা ধরে রাখে না।
              খুব অটোমেটিক যেই চিন্তাগুলো চলে আসে, থেকে নিজেকে মুক্ত
              রাখাও সম্ভব।
            </Text>
            <Text style={styles.normalText}>
              কোপিং কার্ড, আচরণগত কিছু কৌশল, ডিপ ব্রিদিং, মাইন্ডফুলনেস
              প্র্যাকটিস ইত্যাদি যে কোন একটি/একাধিক কৌশল রপ্ত করে,
              অদরকারি ও অপ্রীতিকর চিন্তার ক্ষতিকর প্রভাব থেকে আপনি
              নিজেকে মুক্ত রাখতে পারেন।
            </Text>
            <View style={styles.redirectionButtonContainer}>
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

export default connect(mapStateToProps, {})(ThoughtChallengeP4);
