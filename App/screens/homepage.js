import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  ToastAndroid,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

import readingMaterials from './readingMaterials/data';
import { AppButton } from '../components/button';
import { logoutAction } from '../redux/actions/authActions';
import { getUserInformations } from '../services/user';
import { errorLog } from '../helpers/log';
import { ModalWithTitleDescription } from '../components/ModalWithTitleDescription';

const screenName = 'Homepage';
const emoji = [
  {
    icon: '😍',
    label: 'Great',
    banglaLabel: 'খুব ভালো',
    weight: 60,
    toasterMessage: 'জেনে ভালো লাগছে যে আপনি আজ খুব ভালো আছেন! 😍',
  },
  {
    icon: '😇',
    label: 'Good',
    banglaLabel: 'ভালো',
    weight: 60,
    toasterMessage: 'জেনে ভালো লাগছে যে আপনি আজ ভালো আছেন! 😍',
  },
  {
    icon: '😊',
    label: 'Ok',
    banglaLabel: 'মোটামুটি',
    weight: 60,
    toasterMessage:
      'জেনে ভালো লাগছে যে আপনি আজ মোটামুটি ভালো আছেন! 😊',
  },
  {
    icon: '😞',
    label: 'Bad',
    banglaLabel: 'ভালো নেই',
    weight: 60,
    toasterMessage: 'জেনে খারাপ লাগছে যে আপনি আজ ভালো নেই! 😞',
  },
  {
    icon: '😣',
    label: 'Awful',
    banglaLabel: 'একদম ভালো নেই',
    weight: 60,
    toasterMessage: 'জেনে খারাপ লাগছে যে আপনি আজ একদম ভালো নেই! 😞',
  },
];
const cap1stLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Homepage = ({ navigation, ...props }) => {
  const { logoutAction } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalNavigateTo, setModalNavigateTo] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');
  const [modalIcon, setModalIcon] = useState(null);
  const [
    modalReturnToHomepageExists,
    setModalReturnToHomepageExists,
  ] = useState(false);
  const [
    isPressedOnReadingMaterials,
    setIsPressedOnReadingMaterials,
  ] = useState(false);
  const [isPressedOnPsychoeducation, setIsPressedOnPsychoEducation] =
    useState(false);
  const [
    isPressedOnSonkhiptoKoushol,
    setIsPressedOnSonkhiptoKoushol,
  ] = useState(false);

  const closeModal = () => setModalVisible(false);

  const logoutFromApp = async () => {
    await logoutAction();
    navigation.navigate('LoginSignup');
  };

  useEffect(() => {
    (async () => {
      try {
        const { firstName, name, isAccountVerified, ...userInfo } =
          await getUserInformations(props.accessToken);

        setUsername(cap1stLetter(firstName || name));

        if (!isAccountVerified) {
          navigation.navigate('DemographicInformation');
        }
      } catch (error) {
        await logoutFromApp();
        errorLog(error.toString());
      }
    })();
  }, []);

  function handleBackButtonClick() {
    navigation.navigate('LoginSignup');
    return true;
  }

  const handleEmojiPress = (emoji) => {
    if (emoji.label === 'Awful') {
      setModalVisible(true);
      setModalTitle('');
      setModalDescription(
        `জেনে খারাপ লাগছে যে আপনি আজ একদম ভালো নেই! আপনি তাৎক্ষনিক উপশমের জন্য অ্যাপের উল্লিখিত কৌশলগুলো অনুশীলন করতে পারেন`,
      );
      setModalReturnToHomepageExists(true);
      setModalButtonText('তাৎক্ষণিক উপশম');
      setModalNavigateTo('TatkhonikUposhom');
      setModalIcon(require('../assests/images/CryingIcon.jpeg'));
    } else {
      ToastAndroid.showWithGravity(
        emoji.toasterMessage,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const showModal = (sectionName) => {
    setModalIcon(null);
    setModalReturnToHomepageExists(false);
    if (sectionName === 'quickrelief') {
      setModalVisible(true);
      setModalTitle('তাৎক্ষনিক উপশম');
      setModalDescription(`তাৎক্ষণিক উপশমের কৌশলগুলো আপনি এই মুহূর্তেই নিজেকে একটু সুস্থির ও নিজের অনুভূতি বা চিন্তার উপর নিয়ন্ত্রণ নিয়ে আসার জন্য ব্যবহার করতে পারেন। মনে রাখবেন এই কৌশলগুলো আপনাকে একটি সাময়িক উপশম দিতে সক্ষম, তবে এটা কোন স্থায়ী সমাধান না। আপাতত একটু স্থির হয়ে আপনি ধীরে এই এপসে দেয়া অন্যান্য কৌশলগুলো নিয়ে কাজ করুন। তবে তাৎক্ষণিক উপশমের কৌশলগুলো, যেটা/যেগুলো ব্যবহার করে আপনি কিছুটা ভাল বা স্থির বোধ করবেন, সেগুলো খুব নিয়মিত ব্যাবহার করে গেলে আপনার সার্বিক মানসিক অবস্থার উপর অপেক্ষাকৃত স্থায়ী ইতিবাচক প্রভাব কাজ করবে।
 
খুব তীব্র কোন অনুভূতি (রাগ, বিরক্ত, হতাশা, অস্থিরতা, দুশ্চিন্তা ইত্যাদি) আপনাকে পেয়ে বসলে, তাৎক্ষণিক উপশমের জন্য যে কোন রিলাক্সেশন; ইমাজিনারি, ব্রিদিং বা মাসকিউলার (পেশী) রিলাক্সেশন প্র্যাকটিস করতে পারেন। তবে আপনি যদি খুব বিষণ্ণ বা দুঃখভারাক্রান্ত বোধ করেন, সেই ক্ষেত্রে রিলাক্সেশন না করে আপনি বরং মাইন্ডফুলনেস প্র্যাকটিস করুন।
 
মনে রাখা জরুরী, কোন কৌশল ব্যাবহার করতে গিয়ে যদি আপনার মনে হয়, এটা আপনাকে আরও খারাপ অনুভূতি দিচ্ছে, তাহলে জোর করে প্র্যাকটিস না করে আপনি কিছুক্ষণ প্র্যাকটিস বন্ধ রাখুন। রিলাক্সেশন খুব নিরাপদ এবং সাধারণত কারো অসুবিধা হয় না। তবে, বিষণ্ণ থাকলে রিলাক্সেশন আপনার শারীরিক/মানসিক জড়তা বাড়িয়ে দিতে পারে, তাই মাইন্ডফুলনেস প্র্যাকটিস করা শ্রেয়। তবে, মাইন্ডফুলনেস প্র্যাকটিসের ক্ষেত্রে কারো কারো অভ্যন্তরীণ গভীর খত খুব বেশি সক্রিয় হয়ে যেতে পারে, সেই ক্ষেত্রে আপনি বিরতি নিয়ে প্র্যাকটিস করুন অথবা চোখ খুলে প্র্যাকটিসটি চালিয়ে দেখতে পারেন।
 
কোন কৌশল ব্যবহারে নিজেকে অত্যধিক চাপ দেবার দরকার নাই, আবার যেমন নিজেকে অত্যধিক ছাড় দেবারও দরকার নাই। তীব্র নেতিবাচক অনুভূতি আচ্ছন্ন মন নিয়ে এই কৌশলগুলো প্রয়োগ করা কঠিন মনে হতে পারে, মন বারবার নানান চিন্তায় অন্য দিকে চলে যাবে, একটু ধৈর্য নিয়ে প্র্যাকটিস চালিয়ে যান, ধীরে ধীরে মনে স্থিরতা ফিরে আসবে।
 
ফিজিক্যাল এক্সারসাইজ বা ব্যায়াম কেবল শরীর নয়, মনের ফিটনেসেও খুবই ইতিবাচক ভূমিকা রাখে। তাৎক্ষণিক উপশম হিসেবেও আপনি ২০-৩০ মিনিট যে কোন ব্যায়াম করে নিজেকে সুস্থির করতে পারেন, নিরাপদ কোন রাস্তা বা মাঠে দ্রুত হাঁটাও একটি ভাল ব্যায়াম। এই ক্ষেত্রে মনোযোগটাকে বারবার বাইরের দিকে বা আশেপাশের শব্দ বা দৃশ্যে বা শরীরে পেশিতে বা স্বাসের দিকে রাখার চেষ্টা করবেন যাতে আপনার মন কোন চিন্তা বা বিচার বিশ্লেষণে খুব বেশি ডুবে যেতে না পারে।`);

      setModalNavigateTo('TatkhonikUposhom');
    }

    if (sectionName === 'CopyingCards') {
      setModalVisible(true);
      setModalTitle('অনুশীলন কার্ডস');
      setModalDescription(`কোপিং কার্ড সংকটপূর্ণ মুহূর্তগুলো সামাল দেবার জন্য খুব সহজ এবং খুব কার্যকরী একটা পদ্ধতি যেখানে একদম নিজস্ব কোপিং স্টেটমেন্টগুলো লিখা থাকে।

আপনি কাগজে আপনার কোপিং স্টেটমেন্টগুলো লিখে রাখুন। যেসব অবস্থা বা পরিস্থিতি সামাল দেয়া আপনার জন্য কঠিন হয়ে ওঠে, সেখানে আপনি কী কী করলে বা নিজেকে কী বললে অথবা কী মনে করিয়ে দিলে আপনার জন্য কাজে লাগবে, সেগুলো আগেই আপনি আপনার কার্ডে বা কাগজে লিখে ফেলুন। লিখার সময় একটু সময় নিয়ে চিন্তাভাবনা করে লিখুন, সেগুলো যেন আপনার জন্য কার্যকরী হয়। এই স্টেটমেন্টগুলো যথাসম্ভব ছোট ও সরল রাখার চেষ্টা করুন, যাতে সহজেই আপনি নিজেকে মনে করিয়ে দিতে পারেন। এবং কার্ডটা নিজের সাথে রাখুন এবং মাঝে মাঝে কার্ডটা দেখুন যাতে যথাসময়ে এটা মনে করতে আপনাকে বেগ পেতে না হয়।

স্পষ্ট ধারণার জন্য এখানে অনেকগুলো উদাহরণ দেয়া আছে।`);

      setModalNavigateTo('CopyingCards');
      setModalButtonText('অনুশীলন কার্ডস দেখুন');
    }
  };

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
    <View>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#479162',
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: 24,
            paddingTop: 16.5,
            marginBottom: 15,
            paddingLeft: 7,
            shadowColor: 'black',
            shadowOffset: 50,
            elevation: 2,
            paddingBottom: 25,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              padding: 10,
              paddingBottom: 6,
              paddingTop: 30,
              color: '#fffef4',
              fontFamily: 'playfair-bold',
              textAlign: 'center',
            }}
          >
            Hi {username}!
          </Text>
          <Text
            style={{
              fontSize: 20,
              padding: 12,
              paddingVertical: 2,
              letterSpacing: 0.4,
              textAlign: 'center',
              fontFamily: 'Roboto',
              marginBottom: 17,
              color: '#fffef4',
            }}
          >
            আপনি আজ কেমন আছেন?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {emoji.map((em) => (
              <TouchableOpacity
                key={em.label}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: em.weight,
                  marginRight: 8,
                  borderRadius: 10,
                  elevation: 10,
                  shadowOffset: 50,
                  shadowColor: 'black',
                  borderColor: '#483838',
                  paddingBottom: 3.5,
                }}
                onPress={() => handleEmojiPress(em)}
              >
                <Text
                  style={{
                    fontSize: 22,
                    paddingBottom: 1.2,
                    paddingTop: 6,
                  }}
                >
                  {em.icon}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 30,
                    marginBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#483838',
                      textAlign: 'center',

                      paddingHorizontal: 2,
                      fontWeight: 'bold',
                    }}
                  >
                    {em.banglaLabel}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginBottom: 8,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20.5,
                fontWeight: 'bold',
                color: '#3c7a53',
              }}
            >
              Got Some More Time?
            </Text>
            <Text
              style={{
                fontSize: 13,
                paddingTop: 4,
                color: '#816565',
                letterSpacing: 0.16,
              }}
            >
              Here are some longer acitivities you might like{' '}
            </Text>
          </View>
          <View style={styles.featureContainer}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('AssessmentList', {
                  goBack: screenName,
                })
              }
            >
              <View style={styles.eachFeatureContainer}>
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/assessment.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        মানসিক অবস্থা যাচাই
                      </Text>
                      <Text style={styles.featureSubheading}>
                        Self Assessment
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name="rightcircleo"
                      size={24}
                      color="#42855B"
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                setIsPressedOnPsychoEducation((prev) => !prev)
              }
            >
              <View
                style={[
                  styles.eachFeatureContainer,
                  !isPressedOnPsychoeducation
                    ? {}
                    : styles.eachFeatureContainerPress,
                ]}
              >
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/psychoeducation.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.featureHeading,
                          !isPressedOnPsychoeducation
                            ? {}
                            : styles.featureHeadingPressed,
                        ]}
                      >
                        মানসিক স্বাস্থ্য সম্পর্কিত তথ্য
                      </Text>
                      <Text
                        style={[
                          styles.featureSubheading,
                          isPressedOnPsychoeducation
                            ? { color: '#666' }
                            : {},
                        ]}
                      >
                        Psycho Education
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name={
                        isPressedOnPsychoeducation
                          ? 'downcircle'
                          : 'rightcircleo'
                      }
                      size={24}
                      color="#3c7a53"
                    />
                  </View>
                </View>
                {isPressedOnPsychoeducation && (
                  <View style={{ paddingTop: 10, paddingLeft: 0 }}>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'Myths and facts',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        মিথ এবং বাস্তবতা
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'What is mental health',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        মানসিক স্বাস্থ্য বলতে আমরা কি বুঝি?
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'What is psychotherapy',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        সাইকোথেরাপি কি?
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name ===
                              'Mental Health Counselling',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        মানসিক স্বাস্থ্য কাউন্সেলিং
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                setIsPressedOnReadingMaterials((prev) => !prev)
              }
            >
              <View
                style={[
                  styles.eachFeatureContainer,
                  !isPressedOnReadingMaterials
                    ? {}
                    : styles.eachFeatureContainerPress,
                ]}
              >
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/specificissues.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.featureHeading,
                          !isPressedOnReadingMaterials
                            ? {}
                            : styles.featureHeadingPressed,
                        ]}
                      >
                        নির্দিষ্ট কিছু বিষয়
                      </Text>
                      <Text
                        style={[
                          styles.featureSubheading,
                          isPressedOnReadingMaterials
                            ? { color: '#666' }
                            : {},
                        ]}
                      >
                        Specific Issues
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name={
                        isPressedOnReadingMaterials
                          ? 'downcircle'
                          : 'rightcircleo'
                      }
                      size={24}
                      color="#3c7a53"
                    />
                  </View>
                </View>
                {isPressedOnReadingMaterials && (
                  <View style={{ paddingTop: 10, paddingLeft: 0 }}>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) => issue.name === 'Relationship',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        প্রিয়জনের সাথে সম্পর্কের উন্নয়ন
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) => issue.name === 'Study skill',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        পড়াশোনা সম্পর্কিত দক্ষতা
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'Anger Management',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        রাগ ব্যবস্থাপনা
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) => issue.name === 'Sleep Hygine',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        ঘুম
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'Suicidal Tendency',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        আত্নহত্যা প্রবণতা প্রতিরোধ
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name ===
                              'Focusing on good moments',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        ভালোলাগার মুহূর্ত গুলোয় মন দেয়া
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) =>
                              issue.name === 'Learn to love yourself',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        নিজেকে ভালবাসতে জানা
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                setIsPressedOnSonkhiptoKoushol((prev) => !prev)
              }
            >
              <View
                style={[
                  styles.eachFeatureContainer,
                  !isPressedOnSonkhiptoKoushol
                    ? {}
                    : styles.eachFeatureContainerPress,
                ]}
              >
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/genericIntervention.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.featureHeading,
                          !isPressedOnSonkhiptoKoushol
                            ? {}
                            : styles.featureHeadingPressed,
                        ]}
                      >
                        সংক্ষিপ্ত কিছু কৌশল
                      </Text>
                      <Text
                        style={[
                          styles.featureSubheading,
                          isPressedOnSonkhiptoKoushol
                            ? { color: '#666' }
                            : {},
                        ]}
                      >
                        Some Brief Techniques
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name={
                        isPressedOnSonkhiptoKoushol
                          ? 'downcircle'
                          : 'rightcircleo'
                      }
                      size={24}
                      color="#3c7a53"
                    />
                  </View>
                </View>
                {isPressedOnSonkhiptoKoushol && (
                  <View style={{ paddingTop: 10, paddingLeft: 0 }}>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() => showModal('CopyingCards')}
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        অনুশীলন কার্ডস
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ReadingMaterials', {
                          data: readingMaterials.find(
                            (issue) => issue.name === 'Study skill',
                          ),
                          goBack: screenName,
                        })
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        স্টাডি স্কিলস
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate(
                          'TechniqueWithInputFields',
                          {
                            id: 'technique_of_paying_attention_to_good_moments',
                            banglaName:
                              'ভাল লাগার মুহুর্তগুলোয় মন দেয়া',
                            goBack: screenName,
                          },
                        )
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        ভাল লাগার মুহুর্তগুলোয় মন দেয়ার কৌশল
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate(
                          'TechniqueWithInputFields',
                          {
                            id: 'learn_how_to_love_yourself',
                            banglaName: 'নিজেকে ভালবাসতে জানার কৌশল',
                            goBack: screenName,
                          },
                        )
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        নিজেকে ভালবাসতে জানার কৌশল
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('ThoughtChallengeInit')
                      }
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        চিন্তার পরিবর্তন
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => showModal('quickrelief')}
            >
              <View style={styles.eachFeatureContainer}>
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/quickrelief.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        তাৎক্ষনিক উপশম
                      </Text>
                      <Text style={styles.featureSubheading}>
                        Quick Relief
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name="rightcircleo"
                      size={24}
                      color="#42855B"
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('HelpCenter', {
                  goBack: screenName,
                })
              }
            >
              <View style={styles.eachFeatureContainer}>
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/helpCenter.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        সাহায্য কেন্দ্র
                      </Text>
                      <Text style={styles.featureSubheading}>
                        Help Center
                      </Text>
                    </View>
                  </View>
                  <View style={styles.featureIconContainer}>
                    <AntDesign
                      name="rightcircleo"
                      size={24}
                      color="#42855B"
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ marginVertical: 8 }}>
          <AppButton
            title="লগ আউট করুন"
            onPress={logoutFromApp}
            style={{ backgroundColor: '#52a871' }}
            textStyle={{ fontSize: 18 }}
          />
        </View>
        <Toast />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                { marginTop: Constants.statusBarHeight },
              ]}
            >
              <ModalWithTitleDescription
                title={modalTitle}
                description={modalDescription}
                buttonText={
                  modalButtonText !== ''
                    ? modalButtonText
                    : 'পরবর্তী পেইজে যান'
                }
                closeModal={closeModal}
                navigateTo={modalNavigateTo}
                goBack={screenName}
                modalButtonText={modalButtonText}
                icon={modalIcon}
                returnToHomepageExists={modalReturnToHomepageExists}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  boxModelContainer: {
    display: 'flex',
    height: 100,
    width: 130,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 10,
    marginRight: 0,
    backgroundColor: '#F38181',
    shadowColor: 'black',
    shadowOffset: 50,
    elevation: 2,
    borderRadius: 15,
  },
  boxModelLastContainer: {
    marginRight: 10,
  },
  boxModel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Roboto',
    letterSpacing: 0.15,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  featureContainer: {},
  eachFeatureMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachFeatureContainer: {
    activeOpacity: 1,

    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,

    borderColor: '#a0d1b2',
    borderRadius: 5,
    borderWidth: 1,

    shadowColor: 'black',
    backgroundColor: 'white',

    borderLeftWidth: 6,
  },
  eachFeatureContainerPress: {
    borderColor: '#52a872',
    borderWidth: 2,
    backgroundColor: 'white',
    borderLeftWidth: 2,
  },
  featureIconContainer: {
    alignSelf: 'center',
    paddingRight: 7,
  },
  featureLeftImage: {
    height: 47,
    width: 47,
    marginRight: 8,
    borderRadius: 5,
  },
  featureHeading: {
    fontSize: 15.5,
    marginBottom: 2,
    paddingLeft: 4,
    paddingTop: 2.5,
    fontFamily: 'Roboto',
  },
  featureHeadingPressed: {
    fontWeight: 'bold',
    color: '#366f4b',
    fontSize: 18,
    paddingTop: 0,
  },
  featureSubheading: {
    fontSize: 12,
    color: '#777',
    paddingLeft: 4,
    paddingTop: 1,
    fontFamily: 'openSans',
  },
  subsectionContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 11,

    borderRadius: 5,
    elevation: 0.1,
  },
  subsectionContainerText: {
    paddingLeft: 5,
    fontSize: 15,
    color: '#333',
  },

  centeredView: {
    flex: 1,
    marginBottom: 0,
    height: '100%',
  },
  modalView: {
    margin: 10,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  scrollViewStyle: {
    height: '100%',
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, { logoutAction })(Homepage);
