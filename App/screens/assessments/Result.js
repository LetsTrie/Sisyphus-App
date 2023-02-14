import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { AppButton } from '../../components/button';
import colors from '../../config/colors';

import { engToBanNumConversion } from '../../helpers/utils';

const Result = ({ navigation, route, ...props }) => {
  const { stage, type, totalScore } = route.params;
  let { score } = route.params;
  let mtype;
  if (type === 'manoshikObosthaJachaikoron') mtype = 'মানসিক অবস্থা';
  else if (type === 'manoshikChapNirnoy') mtype = 'মানসিক চাপ';
  else if (type === 'duschintaNirnoy') mtype = 'দুশ্চিন্তা';
  else mtype = 'দুশ্চিন্তা';

  let parcentage = 0;
  if (totalScore > 0) {
    parcentage = Math.round((score / totalScore) * 100);
  }

  let pageTitle = '';
  let title = '';
  let description =
    stage === 'স্বাভাবিক মাত্রা'
      ? `আপনার ${mtype} স্বাভাবিক মাত্রায় রয়েছে। এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন।`
      : stage === 'মাঝামাঝি মাত্রা'
      ? `আপনার ${mtype} মাঝামাঝি মাত্রায় রয়েছে। এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন। `
      : `আপনার ${mtype} তীব্র মাত্রায় রয়েছে। এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের মাধ্যমে দ্রুত সময়ের মধ্যে মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন। পাশাপাশি অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন।`;

  let isDanger = false;
  let showTatkhonikButton = false;

  if (type === 'PSS-1') {
    pageTitle = 'আপনার মানসিক চাপের পরিমাণঃ';
    if (score >= 0 && score <= 13) {
      title = 'সাধারন মাত্রা';
      description = `আপনার মানসিক চাপ সাধারন মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত মানসিক চাপ সম্পর্কিত তথ্য গুলো পড়ুন। প্রয়োজন হলে অ্যাপে উল্লেখিত কৌশল গুলো অনুশীলন করুন।`;
    } else if (score >= 14 && score <= 26) {
      title = 'মাঝামাঝি মাত্রা';
      description = `আপনার মানসিক চাপ মাঝামাঝি মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত মানসিক চাপ সম্পর্কিত তথ্য গুলো পড়ুন এবং কৌশল গুলো অনুশীলন করুন। এবং আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    } else if (score >= 27) {
      isDanger = true;
      showTatkhonikButton = true;
      title = 'উচ্চ মাত্রা';
      description = `আপনার মানসিক চাপ উচ্চ মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত মানসিক চাপ সম্পর্কিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং দ্রুত আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    }
  }

  if (type === 'WHO-1') {
    score *= 4;
    if (parcentage <= 49) {
      title = 'কম ওয়েলবিং';
      showTatkhonikButton = true;

      isDanger = true;
      description = `এই স্কোর কম ওয়েলবিং নির্দেশ করে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    } else {
      title = 'বেশি ওয়েলবিং';
      description = `এই স্কোর বেশি ওয়েলবিং নির্দেশ করে। প্রয়োজনবোধে অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন এবং কৌশল গুলো অনুশীলন করুন।`;
    }
  }

  if (type === 'DS-1') {
    let pageTitle = `আপনার বিষণ্ণতার পরিমাণঃ`;
    if (score >= 30 && score <= 100) {
      title = 'সাধারন মাত্রা';
      description = `আপনার বিষণ্ণতা সাধারন মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন। প্রয়োজনবোধে অ্যাপের কৌশল গুলো অনুশীলন করুন ও আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    } else if (score >= 101 && score <= 114) {
      title = 'মাঝামাঝি মাত্রা';
      description = `আপনার বিষণ্ণতা মাঝামাঝি মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন ও কৌশল গুলো অনুশীলন করুন। আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    } else if (score >= 115 && score <= 123) {
      title = 'উচ্চ মাত্রা';
      isDanger = true;
      description = `আপনার বিষণ্ণতা উচ্চ মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং দ্রুত আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    } else if (score >= 124 && score <= 150) {
      title = 'তীব্র মাত্রা';
      showTatkhonikButton = true;

      isDanger = true;
      description = `আপনার বিষণ্ণতা তীব্র মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং দ্রুত আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন।`;
    }
  }

  if (type === 'ANX-1') {
    if (score >= 0 && score <= 54) {
      title = 'সাধারন মাত্রা';
      description = `আপনার দুশ্চিন্তা সাধারন মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন ও কৌশল গুলো অনুশীলন করুন। প্রয়োজনবোধে আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন ।`;
    } else if (score >= 55 && score <= 66) {
      title = 'মাঝামাঝি মাত্রা';
      description = `আপনার দুশ্চিন্তা মাঝামাঝি মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন ও কৌশল গুলো অনুশীলন করুন। এবং আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন ।`;
    } else if (score >= 67 && score <= 77) {
      title = 'উচ্চ মাত্রা';
      isDanger = true;
      description = `আপনার দুশ্চিন্তা উচ্চ মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং দ্রুত আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন ।`;
    } else if (score >= 78 && score <= 144) {
      title = 'তীব্র মাত্রা';
      showTatkhonikButton = true;

      isDanger = true;
      description = `আপনার দুশ্চিন্তা তীব্র মাত্রায় রয়েছে। এই অবস্থার গুণগত মান উন্নয়নের জন্য অ্যাপের মধ্যে উল্লিখিত তথ্য গুলো পড়ুন, কৌশল গুলো অনুশীলন করুন এবং দ্রুত আপনার নিকটস্থ মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন ।`;
    }
  }

  function handleBackButtonClick() {
    navigation.navigate('Homepage');
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

  return (
    <>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.scoreHeading}>{pageTitle}</Text>
          <Text
            style={[
              styles.scoreDesc,
              { color: isDanger ? '#f34637' : '#3f9f2e' },
            ]}
          >
            {title}
          </Text>
          <View
            style={
              isDanger
                ? styles.scoreTextContainerRed
                : styles.scoreTextContainerGreen
            }
          >
            <Text style={styles.scoreText}>
              {engToBanNumConversion(score)}
            </Text>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 2,
              margin: 10,
              padding: 10,
              marginTop: 3,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#ddd',
              marginBottom: 12,
              marginTop: 10,
              marginBottom: 17,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 25.5,
                letterSpacing: 1,
              }}
            >
              {description}
            </Text>
          </View>

          {showTatkhonikButton && (
            <View>
              <AppButton
                title="তাৎক্ষনিক উপশম"
                style={{ backgroundColor: '#479162' }}
                textStyle={{ fontSize: 18 }}
                onPress={() => {
                  navigation.navigate('TatkhonikUposhom', {
                    goBack: 'Homepage',
                  });
                }}
              />
            </View>
          )}

          <View>
            <AppButton
              title="হোমপেজে ফিরে যান"
              style={{ backgroundColor: '#479162' }}
              textStyle={{ fontSize: 18 }}
              onPress={handleBackButtonClick}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    paddingTop: 18,
  },
  scoreHeading: {
    textAlign: 'center',
    fontSize: 22.5,
    paddingBottom: 5,
  },
  scoreDesc: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 12,
    color: colors.primary,
  },
  scoreTextContainer: {},
  scoreTextContainerGreen: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderRadius: 100,
    marginBottom: 13,
    borderColor: '#4fc63a',
    backgroundColor: '#7ed56f',
  },
  scoreTextContainerRed: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderRadius: 100,
    marginBottom: 13,
    borderColor: 'rgb(255, 97, 99)',
    backgroundColor: 'rgb(247, 129, 119)',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, {})(Result);
