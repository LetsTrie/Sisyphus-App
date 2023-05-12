import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  BackHandler,
} from 'react-native';
import Box from '../../components/Scale/Box';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import { getLatestProgress } from '../../redux/actions/scaleActions';
import { ScaleDescriptionPage } from './ScaleDescriptionPage';
import { engToBanNumConversion } from '../../helpers/utils';

import Constants from 'expo-constants';

const AssessmentList = ({ navigation, route, ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScale, setSelectedScale] = useState({});
  const headerHeight = useHeaderHeight();

  const { progress, getLatestProgress } = props;
  useEffect(() => {
    getLatestProgress(props.accessToken);
  }, []);

  const boxes = [
    {
      title: 'Depression',
      banglaTitle: 'বিষন্নতা নির্ণয়',
      scaleId: 'DS-1',
      scaleName: 'SCALE: Depression Scale',
      description: `এখানে ৩৬ টি প্রশ্নবিশিষ্ট স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার দুশ্চিন্তা পরিমাপ করতে পারেন।\n\nএই স্কেলটি ডেভেলপ করেছেন জহির উদ্দীন ও ড. মাহমুদুর রহমান`,
    },
    {
      title: 'Anxiety',
      banglaTitle: 'দুশ্চিন্তা নির্ণয়',
      scaleId: 'ANX-1',
      scaleName: 'SCALE: Anxiety',
      description: `এখানে ৩৬ টি প্রশ্নবিশিষ্ট স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার দুশ্চিন্তা পরিমাপ করতে পারেন।\n\nএই স্কেলটি ডেভেলপ করেছেন ড. ফারাহ দিবা`,
    },
    {
      title: 'WHO-5 wellbeing index',
      banglaTitle: 'ওয়েলবিং নির্ণয়',
      scaleId: 'WHO-1',
      scaleName: 'WHO-5 Well-Being Index',
      description: `এখানে ৫ টি প্রশ্নবিশিষ্ট স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার ওয়েলবিং পরিমাপ করতে পারেন।\n\nএই স্কেলটি বাংলা অনুবাদ করেছেন ওমর ফারুক ও কামাল উদ্দিন আহমেদ চৌধুরী`,
    },
    {
      title: 'Perceived Stress Scale',
      banglaTitle: 'মানসিক চাপ নির্ণয়',
      scaleId: 'PSS-1',
      scaleName: 'Perceived Stress Scale 10 Item',
      description: `এখানে ১০ টি প্রশ্নবিশিষ্ট একটি স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার মানসিক চাপ পরিমাপ করতে পারেন।\n\nএই স্কেলটি বাংলা অনুবাদ করেছেন মোঃ জিয়াউল ইসলাম`,
    },
  ];

  function handleBackButtonClick() {
    navigation.navigate(route.params.goBack);
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

  const handlePress = (box) => {
    setModalVisible(true);
    setSelectedScale(box);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedScale({});
  };

  return (
    <ScrollView style={{ backgroundColor: '#efefef' }}>
      <View>
        {boxes.map((box) => (
          <View key={box.scaleId}>
            <Box
              name={box.banglaTitle}
              lastScore={
                progress[box.scaleId]
                  ? engToBanNumConversion(progress[box.scaleId].score)
                  : undefined
              }
              lastDate={
                progress[box.scaleId]
                  ? progress[box.scaleId].createdAt
                  : undefined
              }
              onPress={() => handlePress(box)}
            />
          </View>
        ))}
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
              <ScaleDescriptionPage
                scale={selectedScale}
                closeModal={closeModal}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  accessToken: state.auth.accessToken,
  progress: state.scale.progress,
});

export default connect(mapStateToProps, {
  getLatestProgress,
})(AssessmentList);
