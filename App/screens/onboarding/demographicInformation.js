import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as yup from 'yup';
import axios from 'axios';
import logger from '../../config/logger';
import colors from '../../config/colors';
import TextInput from '../../components/textInput';
import Picker from '../../components/picker';
import Modal from '../../components/modal';
import useFormFields from '../../components/handleForm';
import baseUrl from '../../config/baseUrl';
import { accountVerifiedAction } from '../../redux/actions/authActions';
import { errorLog } from '../../helpers/log';

import {
  googleAndroidClientId,
  expoWebClientId,
} from '../../config/config';
import { AppButton } from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import {
  getTokenFromAS,
  storeInStorage,
} from '../../helpers/asyncStorage';
import AS from '../../types/asyncStorage';
import { connect } from 'react-redux';

const genderLists = [
  { label: 'পুরুষ', value: 'male' },
  { label: 'মহিলা', value: 'female' },
  { label: 'অন্যান্য', value: 'others' },
];

const maritalStatusLists = [
  { label: 'বিবাহিত', value: 'married' },
  { label: 'অবিবাহিত', value: 'unmarried' },
];

const year = new Date().getUTCFullYear();
const yearList = Array(year - (year - 50))
  .fill('')
  .map((v, idx) => ({ label: year - idx, value: year - idx }));

const departmentList = [
  'Department of Accounting & Information Systems',
  'Department of Anthropology',
  'Department of Applied Chemistry & Chemical Engineering',
  'Department of Applied Mathematics',
  'Department of Arabic',
  'Department of Bangla',
  'Department of Banking and Insurance',
  'Department of Biochemistry and Molecular Biology',
  'Department of Biomedical Physics & Technology',
  'Department of Botany',
  'Department of Ceramic',
  'Department of Chemistry',
  'Department of Clinical Pharmacy and Pharmacology',
  'Department of Clinical Psychology',
  'Department of Communication Disorders',
  'Department of Computer Science and Engineering',
  'Department of Craft',
  'Department of Criminology',
  'Department of Dance',
  'Department of Development Studies',
  'Department of Disaster Science and Climate Resilience',
  'Department of Drawing and Painting',
  'Department of Economics',
  'Department of Educational and Counselling Psychology',
  'Department of Electrical and Electronic Engineering',
  'Department of English',
  'Department of Finance',
  'Department of Fisheries',
  'Department of Genetic Engineering and Biotechnology',
  'Department of Geography & Environment',
  'Department of Geology',
  'Department of Graphic Design',
  'Department of History',
  'Department of History of Art',
  'Department of Information Science and Library Management',
  'Department of International Business',
  'Department of International Relations',
  'Department of Islamic History & Culture',
  'Department of Islamic Studies',
  'Department of Japanese Studies',
  'Department of Law',
  'Department of Linguistics',
  'Department of Management',
  'Department of Management Information Systems (MIS)',
  'Department of Marketing',
  'Department of Mass Communication & Journalism',
  'Department of Mathematics',
  'Department of Meteorology',
  'Department of Microbiology',
  'Department of Music',
  'Department of Nuclear Engineering',
  'Department of Oceanography',
  'Department of Organization Strategy and Leadership',
  'Department of Oriental Art',
  'Department of Pali and Buddhist Studies',
  'Department of Peace and Conflict Studies',
  'Department of Persian Language and Literature',
  'Department of Pharmaceutical Chemistry',
  'Department of Pharmaceutical Technology',
  'Department of Pharmacy',
  'Department of Philosophy',
  'Department of Physics',
  'Department of Political Science',
  'Department of Population Sciences',
  'Department of Printing and Publication Studies',
  'Department of Printmaking',
  'Department of Psychology',
  'Department of Public Administration',
  'Department of Robotics and Mechatronics Engineering',
  'Department of Sanskrit',
  'Department of Sculpture',
  'Department of Sociology',
  'Department of Soil, Water & Environment',
  'Department of Statistics',
  'Department of Television, Film and Photography',
  'Department of Theatre and Performance Studies',
  'Department of Theoretical and Computational Chemistry',
  'Department of Theoretical Physics',
  'Department of Tourism and Hospitality Management',
  'Department of Urdu',
  'Department of Women and Gender Studies',
  'Department of World Religions and Culture',
  'Department of Zoology',
].map((dept) => ({ label: dept, value: dept }));

const residentialStatusList = [
  { label: 'আবাসিক', value: 'resident' },
  { label: 'অনাবাসিক', value: 'non-resident' },
];

const yesNo = [
  { label: 'হ্যাঁ', value: 'yes' },
  { label: 'না', value: 'no' },
];

const treatmentLists = [
  { label: 'মনোরোগ বিশেষজ্ঞ', value: 'psychiatric' },
  { label: 'সাইকোলজিষ্ট', value: 'counseling' },
  { label: 'সাধারন চিকিৎসা', value: 'traditional healing' },
];

const DemographicInformation = ({ navigation, route, ...props }) => {
  const {
    isAuthenticated,
    isAccountVerified,
    accessToken,
    refreshToken,
    accountVerifiedAction,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [eduYear, setEduYear] = useState('');
  const [dept, setDept] = useState('');
  const [residentialStatus, setResidentialStatus] = useState('');
  const [mentalHealthProblemHistory, setMentalHealthProblemHistory] =
    useState('');
  const [
    physicalHealthProblemHistory,
    setPhysicalHealthProblemHistory,
  ] = useState('');
  const [
    previousMentalHealthTreatment,
    setPreviousMentalHealthTreatment,
  ] = useState('');
  const [showMentalHealthTreatment, setShowMentalHealthTreatment] =
    useState(false);
  const [
    showPhysicalHealthTreatment,
    setShowPhysicalHealthTreatment,
  ] = useState(false);

  const initialState = {
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    educationalQualification: '',
    department: '',
    year: '',
    residentialStatus: '',
    mentalHealthProblemHistory: '',
    previousMentalHealthTreatment: '',
    physicalHealthProblemHistory: '',
    previousPhysicalHealthTreatment: '',
  };

  const { formFields, createChangeHandler } =
    useFormFields(initialState);

  useEffect(() => {
    if (mentalHealthProblemHistory.value === 'yes') {
      setShowMentalHealthTreatment(true);
    } else {
      setShowMentalHealthTreatment(false);
    }
  }, [mentalHealthProblemHistory]);

  useEffect(() => {
    if (physicalHealthProblemHistory.value === 'yes') {
      setShowPhysicalHealthTreatment(true);
    } else {
      setShowPhysicalHealthTreatment(false);
    }
  }, [physicalHealthProblemHistory]);

  // const headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${props.jwtToken}`,
  // };

  const validatePayload = async (body) => {
    let validationSchema = yup.object().shape({
      name: yup.string().min(1, 'নাম পূরণ করুন').required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer()
        .typeError('বয়স পূরণ করুন'),
      gender: yup
        .mixed()
        .oneOf(
          genderLists.map((el) => el.value),
          'লিঙ্গ বাছাই করুন',
        )
        .required(),
      maritalStatus: yup.mixed().oneOf(
        maritalStatusLists.map((el) => el.value),
        'বৈবাহিক অবস্থা বাছাই করুন',
      ),
      educationalQualification: yup.string(),
      department: yup
        .mixed()
        .oneOf(['', ...departmentList.map((el) => el.value)]),
      year: yup
        .mixed()
        .oneOf(['', ...yearList.map((el) => el.value)]),
      residentialStatus: yup
        .mixed()
        .oneOf(['', ...residentialStatusList.map((el) => el.value)]),
      mentalHealthProblemHistory: yup
        .mixed()
        .oneOf(['', ...yesNo.map((el) => el.value)]),
      previousMentalHealthTreatment: yup
        .mixed()
        .oneOf(['', ...treatmentLists.map((el) => el.value)]),
      physicalHealthProblemHistory: yup
        .mixed()
        .oneOf(['', ...yesNo.map((el) => el.value)])
        .nullable(true),
      previousPhysicalHealthTreatment: yup.string(),
    });

    try {
      const result = await validationSchema.validate(body);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.errors[0] };
    }
  };

  const showModal = async () => {
    const validate = await validatePayload(formFields);
    if (!validate.success) {
      errorLog(validate.error);
      return;
    }
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      setIsLoading(true);
      await axios.post(
        `${baseUrl}/accounts/add-demographic-info`,
        formFields,
        { headers },
      );
      navigation.navigate('Homepage');
      await accountVerifiedAction();
    } catch (error) {
      errorLog(error?.response?.data?.errors[0]?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <ImageBackground
        source={require('../../assests/images/loginSignup.jpg')}
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={['#525252', '#757575']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.linearGradient}
        ></LinearGradient>
        <ScrollView>
          <View>
            <View
              style={{
                textAlign: 'center',
                paddingTop: 30,
                paddingBottom: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                }}
              >
                ব্যাক্তিগত তথ্যাবলী
              </Text>
            </View>
            <View style={styles.inputBlockContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="নাম"
                onChangeText={(text) =>
                  createChangeHandler(text, 'name')
                }
                textContentType="name"
                width="100%"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="age"
                placeholder="বয়স"
                onChangeText={(text) =>
                  createChangeHandler(text, 'age')
                }
                textContentType="none"
                style={{ borderRadius: 10 }}
                width="50%"
              />
              <Picker
                width="48%"
                icon="gender-male-female-variant"
                placeholder="লিঙ্গ"
                selectedItem={gender}
                onSelectItem={(g) => setGender(g)}
                items={genderLists}
                onChange={(text) =>
                  createChangeHandler(text, 'gender')
                }
                name="gender"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <Picker
                width="100%"
                icon="card-account-details-star"
                placeholder="বৈবাহিক অবস্থা"
                selectedItem={maritalStatus}
                onSelectItem={(g) => setMaritalStatus(g)}
                items={maritalStatusLists}
                onChange={(text) =>
                  createChangeHandler(text, 'maritalStatus')
                }
                name="maritalStatus"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="educationalQualification"
                placeholder="শিক্ষাগত যোগ্যতা"
                onChangeText={(text) =>
                  createChangeHandler(
                    text,
                    'educationalQualification',
                  )
                }
                textContentType="none"
                style={{ borderRadius: 10 }}
                width="50%"
              />
              <Picker
                width="48%"
                icon="gender-male-female-variant"
                placeholder="শিক্ষাবর্ষ"
                selectedItem={eduYear}
                onSelectItem={(g) => setEduYear(g)}
                items={yearList}
                onChange={(text) => createChangeHandler(text, 'year')}
                name="year"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <Picker
                width="100%"
                icon="gender-male-female-variant"
                placeholder="ডিপার্টমেন্ট"
                selectedItem={dept}
                onSelectItem={(g) => setDept(g)}
                items={departmentList}
                onChange={(text) =>
                  createChangeHandler(text, 'department')
                }
                name="department"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <Picker
                width="100%"
                icon="gender-male-female-variant"
                placeholder="বসবাসের ধরন"
                selectedItem={residentialStatus}
                onSelectItem={(g) => setResidentialStatus(g)}
                items={residentialStatusList}
                onChange={(text) =>
                  createChangeHandler(text, 'residentialStatus')
                }
                name="residentialStatus"
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.inputBlockContainer}>
              <Picker
                width="100%"
                icon="gender-male-female-variant"
                placeholder="পুর্বে কোন মানসিক স্বাস্থ্য সমস্যায় ভুগেছেন?"
                selectedItem={mentalHealthProblemHistory}
                onSelectItem={(g) => setMentalHealthProblemHistory(g)}
                items={yesNo}
                onChange={(text) =>
                  createChangeHandler(
                    text,
                    'mentalHealthProblemHistory',
                  )
                }
                name="mentalHealthProblemHistory"
                style={{ borderRadius: 10 }}
              />
            </View>
            {showMentalHealthTreatment && (
              <View style={styles.inputBlockContainer}>
                <Picker
                  width="100%"
                  icon="gender-male-female-variant"
                  placeholder="কি ধরনের চিকিৎসা  নিয়েছিলেন?"
                  selectedItem={previousMentalHealthTreatment}
                  onSelectItem={(g) =>
                    setPreviousMentalHealthTreatment(g)
                  }
                  items={treatmentLists}
                  onChange={(text) =>
                    createChangeHandler(
                      text,
                      'previousMentalHealthTreatment',
                    )
                  }
                  name="previousMentalHealthTreatment"
                  style={{ borderRadius: 10 }}
                />
              </View>
            )}

            <View style={styles.inputBlockContainer}>
              <Picker
                width="100%"
                icon="gender-male-female-variant"
                placeholder="পুর্বে কোন শারীরিক সমস্যায় ভুগেছেন?"
                selectedItem={physicalHealthProblemHistory}
                onSelectItem={(g) => {
                  setPhysicalHealthProblemHistory(g);
                }}
                items={yesNo}
                onChange={(text) =>
                  createChangeHandler(
                    text,
                    'physicalHealthProblemHistory',
                  )
                }
                name="physicalHealthProblemHistory"
                style={{ borderRadius: 10 }}
              />
            </View>
            {showPhysicalHealthTreatment && (
              <View style={styles.inputBlockContainer}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="account"
                  name="previousPhysicalHealthTreatment"
                  placeholder="কি ধরনের চিকিৎসা নিয়েছিলেন"
                  onChangeText={(text) =>
                    createChangeHandler(
                      text,
                      'previousPhysicalHealthTreatment',
                    )
                  }
                  textContentType="none"
                  style={{ borderRadius: 10 }}
                  width="100%"
                />
              </View>
            )}
            <View style={styles.registerButtonContainer}>
              <AppButton
                title="একাউন্ট তৈরি করুন"
                textStyle={styles.buttonText}
                style={{
                  borderRadius: 10,
                  width: '94%',
                  marginTop: 3,
                  backgroundColor: '#5caf7a',
                }}
                onPress={showModal}
              />
            </View>
          </View>
        </ScrollView>

        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          isLoading={isLoading}
          title={'সিসিফাস'}
          description={
            'ব্যাতিক্রমধর্মী কাজগুলো বাংলাদেশে কিছুটা নতুন। এই মোবাইল এপ্লিকেশনটি এমনি একটা ব্যাতিক্রমধর্মী কাজ যাতে আপনার মানসিক স্বাস্থ্যের অবস্থা যাচাই ও উন্নয়নের কিছু সহজ পদ্ধতি প্রদান করা হবে। আপনি যেই তথ্যগুলো প্রদান করবেন তা আমাদের কাছে খুবই গুরুত্বপূর্ণ এবং অত্যন্ত সতর্কতার সাথে তথ্যগুলোর গোপনীয়তা বজায় রাখা হবে। পরিচয় সম্পূর্ণ গোপন রেখে এই এপ্লিকেশনটির ব্যবহারকারীদের তথ্যগুলো একটি গবেষনা কাজে ব্যবহৃত হবে। এই তথ্য গুলো বিশ্লেষণ করার জন্য কেবলমাত্র তিন জন গবেষক ব্যতিত অন্যকেউ দেখতে পাবে না। অনুগ্রহ করে প্রশ্নের উত্তর ও রেটিং গুলো মনোযোগ সহকারে প্রদান করুন।'
          }
          onPress={handleSubmit}
          navigateTo={'Homepage'}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  inputBlockContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
  },
  registerButtonContainer: {
    paddingTop: 8,
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAccountVerified: state.auth.isAccountVerified,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, {
  accountVerifiedAction,
})(DemographicInformation);
