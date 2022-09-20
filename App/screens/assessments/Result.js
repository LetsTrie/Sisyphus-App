import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { errorLog } from '../../helpers/log';

import { ScaleComponent } from '../../components/Scale/Scales';
import { chooseScale } from '../../helpers/chooseScale';
import { submitScale } from '../../services/scale';
import { connect } from 'react-redux';
import { getLatestProgress } from '../../redux/actions/scaleActions';

import { AppButton } from '../../components/button';
import colors from '../../config/colors';

const Result = ({ navigation, route, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { score, stage, type, totalScore } = route.params;

  let mtype;
  if (type === 'manoshikObosthaJachaikoron') mtype = 'মানসিক অবস্থা';
  else if (type === 'manoshikChapNirnoy') mtype = 'মানসিক চাপ';
  else if (type === 'duschintaNirnoy') mtype = 'দুশ্চিন্তা';
  else mtype = 'দুশ্চিন্তা';

  let parcentage = 0;
  if (totalScore > 0) {
    parcentage = Math.round((score / totalScore) * 100);
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
          <Text style={styles.scoreHeading}>
            {type === 'manoshikChapNirnoy'
              ? 'আপনার মানসিক চাপের পরিমাণঃ'
              : type === 'manoshikObosthaJachaikoron'
              ? 'আপনার মানসিক অবস্থার পরিমানঃ'
              : 'আপনার দুশ্চিন্তার পরিমাণঃ'}
          </Text>
          <Text style={styles.scoreDesc}> {stage ?? 0} </Text>
          <View
            style={
              parcentage <= 50
                ? styles.scoreTextContainerGreen
                : styles.scoreTextContainerRed
            }
          >
            <Text style={styles.scoreText}> {score}</Text>
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
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 25.5,
                letterSpacing: 1,
              }}
            >
              {stage === 'স্বাভাবিক মাত্রা'
                ? `আপনার ${mtype} স্বাভাবিক মাত্রায় রয়েছে। এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন।`
                : stage === 'মাঝামাঝি মাত্রা'
                ? `আপনার ${mtype} মাঝামাঝি মাত্রায় রয়েছে। এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন। `
                : `আপনার ${mtype} তীব্র মাত্রায় রয়েছে । এই অবস্থার গুনগত মান উন্নয়নের জন্য অ্যাপসের মাধ্যমে দ্রুত সময়ের মধ্যে মানসিক স্বাস্থ্য সেবা প্রফেশনালদের সাথে যোগাযোগ করুন। পাশাপাশি অ্যাপসের ভিডিওগুলো দেখুন ও অনুশীলন করুন।`}
            </Text>
          </View>

          <AppButton title={'অনুশীলন করুন'} />
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
    textAlign: 'center',
    fontSize: 35,
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
