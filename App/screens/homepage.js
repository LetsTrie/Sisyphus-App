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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import readingMaterials from './readingMaterials/data';
import { AppButton } from '../components/button';
import { logoutAction } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { getUserInformations } from '../services/user';
import { errorLog } from '../helpers/log';
import Toast from 'react-native-toast-message';

const screenName = 'Homepage';

const Homepage = ({ navigation, ...props }) => {
  const [username, setUsername] = useState('');
  const { logoutAction } = props;
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

  const [
    isPressedOnReadingMaterials,
    setIsPressedOnReadingMaterials,
  ] = useState(false);

  const [isPressedOnPsychoeducation, setIsPressedOnPsychoEducation] =
    useState(false);

  const logoutFromApp = async () => {
    await logoutAction();
    navigation.navigate('LoginSignup');
  };

  useEffect(() => {
    (async () => {
      try {
        const { googleFirstName, name, ...userInfo } =
          await getUserInformations(props.accessToken);
        const cap1stLetter = (string) => {
          if (!string) return string;
          return string.charAt(0).toUpperCase() + string.slice(1);
        };
        const nameOfUser = cap1stLetter(googleFirstName || name);
        setUsername(nameOfUser);
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
    ToastAndroid.showWithGravity(
      emoji.toasterMessage,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
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
                        source={require('../assests/images/assessment.png')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        মানসিক অবস্থা যাচাই
                      </Text>
                      <Text style={styles.featureSubheading}>
                        সেলফ এসেসমেন্ট
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
                        সাইকো-এডুকেশন
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
                        source={require('../assests/images/specificissues.png')}
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
                        নির্দিষ্ট কিছু বিষয়
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
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('CopyingCards', {
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
                        source={require('../assests/images/genericIntervention.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        সংক্ষিপ্ত কিছু কৌশল
                      </Text>
                      <Text style={styles.featureSubheading}>
                        Fast and Easy Exercise
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

            <TouchableWithoutFeedback>
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
                        Fast and Easy Exercise
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
  },
  eachFeatureContainerPress: {
    borderColor: '#52a872',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  featureIconContainer: {
    alignSelf: 'center',
    paddingRight: 7,
  },
  featureLeftImage: {
    backgroundColor: 'red',
    height: 47,
    width: 47,
    marginRight: 8,
    borderRadius: 5,
  },
  featureHeading: {
    fontSize: 15.5,
    marginBottom: 2,
    paddingLeft: 4,
    paddingTop: 1,
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
    borderWidth: 0,
    elevation: 0.1,
  },
  subsectionContainerText: {
    paddingLeft: 5,
    fontSize: 15,
    color: '#333',
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, { logoutAction })(Homepage);
