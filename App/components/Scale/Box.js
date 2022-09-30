import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Text from '../text';

const monthShortName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date) => {
  if (!date) return;
  const sp = date.split('/').map((s) => parseInt(s));
  return `${monthShortName[sp[0] - 1]} ${sp[1]}, 20${sp[2]}`;
};

const Box = ({
  source,
  name,
  lastScore,
  lastDate,
  onPress,
  boxStyle = {},
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{ backgroundColor: 'white' }}
    >
      <View style={[styles.box, boxStyle]}>
        {/* <ImageBackground
          source={source}
          style={styles.backgroundImageStyle}
        > */}
        {/* <LinearGradient
            colors={['#75757598', '#2b2b2b98']}
            start={[1, 1]}
            end={[0, 0]}
            style={styles.linearGradientStyle}
          ></LinearGradient> */}
        <Text style={styles.testName}>{name}</Text>
        {lastDate && (
          <View style={styles.history}>
            <Text style={styles.lastScore}>
              সর্বশেষ স্কোর{': '}
              <Text style={styles.lastScoreValue}>{lastScore}</Text>
            </Text>
            <Text style={styles.lastDateContainer}>
              <MaterialCommunityIcons
                name="calendar-account"
                size={18}
              />{' '}
              <Text style={styles.lastDate}>
                {formatDate(
                  new Date(lastDate).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                )}
              </Text>
            </Text>
          </View>
        )}
        {/* </ImageBackground> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '92%',
    minHeight: 65,
    margin: 10,
    marginLeft: 14,
    marginBottom: 3,
    padding: 10,
    elevation: 4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  backgroundImageStyle: {
    // height: 250,
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  testName: {
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 0,
    color: '#52a871',
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  lastScore: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#555',
  },
  lastScoreValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  lastDateContainer: {
    paddingRight: 15,
    paddingVertical: 5,
    color: '#555',
  },
  lastDate: {
    fontSize: 15,
    textAlign: 'right',
    color: '#555',
  },
  linearGradientStyle: {
    opacity: 0.55,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default Box;
