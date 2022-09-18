import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import scale from '../../data/scales';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import Box from '../../components/Scale/Box';
import { connect } from 'react-redux';
import { errorLog } from '../../helpers/log';

import { latestScaleUpdate } from '../../services/scale';

const AssessmentList = ({ navigation, route, ...props }) => {
  const [progress, setProgress] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const data = await latestScaleUpdate(props.accessToken);
        setProgress(data.progress);
      } catch (error) {
        errorLog(error);
      }
    })();
  }, []);

  const boxes = [
    {
      photoUrl: require('../../assests/images/doctorUsingPhone.jpeg'),
      title: 'Depression',
      scaleId: 'DS-1',
      scaleName: 'SCALE: Depression Scale',
    },
    {
      photoUrl: require('../../assests/images/doctorUsingPhone.jpeg'),
      title: 'Anxiety',
      scaleId: 'ANX-1',
      scaleName: 'SCALE: Anxiety',
    },
    {
      photoUrl: require('../../assests/images/doctorUsingPhone.jpeg'),
      title: 'WHO-5 wellbeing index',
      scaleId: 'WHO-1',
      scaleName: 'WHO-5 Well-Being Index',
    },
    {
      photoUrl: require('../../assests/images/doctorUsingPhone.jpeg'),
      title: 'Perceived Stress Scale',
      scaleId: 'PSS-1',
      scaleName: 'Perceived Stress Scale 10 Item',
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        {boxes.map(({ photoUrl, title, scaleId, scaleName }) => (
          <Box
            source={photoUrl}
            name={title}
            lastScore={
              progress[scaleId] ? progress[scaleId].score : undefined
            }
            lastDate={
              progress[scaleId]
                ? progress[scaleId].createdAt
                : undefined
            }
            onPress={() =>
              navigation.navigate('ScaleDescriptionPage', {
                scaleName,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, {})(AssessmentList);
