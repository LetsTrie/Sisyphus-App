import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import SpecialIssuesData from './specificIssues/data';
import { AppButton } from '../components/button';
import { clearStorage } from '../helpers/asyncStorage';
import { logoutAction } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const Homepage = ({ navigation, ...props }) => {
  const { logoutAction } = props;
  const windowHeight = Dimensions.get('window').height;
  const emoji = [
    { icon: '😍', label: 'Great' },
    { icon: '😇', label: 'Good' },
    { icon: '😊', label: 'Ok' },
    { icon: '😞', label: 'Bad' },
    { icon: '😣', label: 'Awful' },
  ];

  const [isPressedOnSpecificIssues, setIsPressedOnSpecificIssues] =
    useState(false);
  const [isPressedOnPsychoeducation, setIsPressedOnPsychoEducation] =
    useState(false);

  const logoutFromApp = async () => {
    await logoutAction();
    navigation.navigate('LoginSignup');
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            height: (windowHeight / 2) * (3.8 / 5),
            backgroundColor: '#479162',
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: 24,
            paddingTop: 20,
            marginBottom: 15,
            paddingLeft: 7,
            shadowColor: 'black',
            shadowOffset: 50,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 45,
              padding: 10,
              paddingBottom: 6,
              // fontWeight: 'bold',
              color: '#fffef4',
              fontFamily: 'playfair-bold',
              textAlign: 'center',
            }}
          >
            Hi Sakib!
          </Text>
          <Text
            style={{
              fontSize: 19,
              padding: 12,
              paddingVertical: 2,
              letterSpacing: 0.4,
              textAlign: 'center',
              fontFamily: 'Roboto',
              marginBottom: 20,
              color: '#fffef4',
            }}
          >
            How are you feeling today?
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
                  height: 61,
                  width: 57,
                  marginRight: 8,
                  borderRadius: 10,
                  elevation: 10,
                  shadowOffset: 50,
                  shadowColor: 'black',
                  borderColor: '#483838',
                }}
              >
                <Text style={{ fontSize: 22, paddingBottom: 3 }}>
                  {em.icon}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#483838',
                  }}
                >
                  {em.label}
                </Text>
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
              onPress={() => navigation.navigate('AssessmentList')}
            >
              <View style={styles.eachFeatureContainer}>
                <View style={styles.eachFeatureMainContainer}>
                  <View
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <View style={styles.featureLeftImage}>
                      <ImageBackground
                        source={require('../assests/images/assessment.webp')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        Assessments
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
                        Psychoeducation
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
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        Mental Health
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                setIsPressedOnSpecificIssues((prev) => !prev)
              }
            >
              <View
                style={[
                  styles.eachFeatureContainer,
                  !isPressedOnSpecificIssues
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
                        source={require('../assests/images/specificIssues.png')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.featureHeading,
                          !isPressedOnSpecificIssues
                            ? {}
                            : styles.featureHeadingPressed,
                        ]}
                      >
                        Specific Issues
                      </Text>
                      <Text
                        style={[
                          styles.featureSubheading,
                          isPressedOnSpecificIssues
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
                        isPressedOnSpecificIssues
                          ? 'downcircle'
                          : 'rightcircleo'
                      }
                      size={24}
                      color="#3c7a53"
                    />
                  </View>
                </View>
                {isPressedOnSpecificIssues && (
                  <View style={{ paddingTop: 10, paddingLeft: 0 }}>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                      onPress={() =>
                        navigation.navigate('SpecificIssues', {
                          data: SpecialIssuesData.find(
                            (issue) => issue.name === 'Relationship',
                          ),
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
                        Relationship
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        Education
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        Anger
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        Stress
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.subsectionContainer}
                    >
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color="black"
                        style={{ paddingTop: 4 }}
                      />
                      <Text style={styles.subsectionContainerText}>
                        Suicidal Ideation
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                        source={require('../assests/images/genericIntervention.jpeg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        Generic Intervention
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
                        source={require('../assests/images/quickRelief.jpg')}
                        style={styles.imageBackground}
                      ></ImageBackground>
                    </View>
                    <View>
                      <Text style={styles.featureHeading}>
                        Quick Relief
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

    shadowColor: '#3c7a53',
    borderColor: '#3c7a53',
    borderRadius: 5,
    borderWidth: 0,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  eachFeatureContainerPress: {
    borderColor: '#52a872',
    borderWidth: 2,
    backgroundColor: '#eee',
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
    fontSize: 16.5,
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

    borderRadius: 5,
    borderWidth: 0,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    shadowOffset: 20,
  },
  subsectionContainerText: {
    paddingLeft: 5,
    fontSize: 15,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, { logoutAction })(Homepage);
