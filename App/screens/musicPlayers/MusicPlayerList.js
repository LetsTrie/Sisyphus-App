import React, { useEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import {
  View,
  BackHandler,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { errorLog } from '../../helpers/log';

const sectionsAllCards = [
  {
    id: 'audio-03',
    name: 'Imaginary relaxation (quick intervention)',
    link: '5minImaginaryRelaxation.m4a',
  },
  {
    id: 'audio-04',
    name: 'Quick intervention: 3 Minutes Breathing Space (mindfulness)',
    link: 'QuickIntervention.m4a',
  },
  {
    id: 'audio-01',
    name: 'Body scan: Generic under mindfulness',
    link: 'Bodyscan.m4a',
  },
  {
    id: 'audio-02',
    name: 'Sitting with breath (generic, mindfulness)',
    link: 'Sittingwithbreath.m4a',
  },
];

const MusicPlayerList = ({ navigation, route, ...props }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  const [soundObject, setSoundObject] = useState(null);

  const audioSources = [
    require('../../assests/musics/Bodyscan.m4a'),
    require('../../assests/musics/Sittingwithbreath.m4a'),
    require('../../assests/musics/5minImaginaryRelaxation.m4a'),
    require('../../assests/musics/QuickIntervention.m4a'),
  ];

  const togglePlayback = async () => {
    if (isPlaying) await soundObject.pauseAsync();
    else await soundObject.playAsync();

    setIsPlaying(!isPlaying);
  };

  const onPlaybackStatusUpdate = (status) => {
    setProgress(status.positionMillis / status.durationMillis);
  };

  async function handleBackButtonClick() {
    if (soundObject !== null) {
      await soundObject.stopAsync();
    }
    navigation.navigate('LoginSignup');
    return true;
  }

  useEffect(() => {
    const loadAudio = async () => {
      const source = audioSources[audioIndex];
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(source);
        setSoundObject(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (error) {
        errorLog(error);
      }
      return sound;
    };

    (async () => {
      await loadAudio();
    })();
  }, [audioIndex]);

  useEffect(() => {
    if (soundObject) {
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
    }
  }, [soundObject]);

  const handleOnPress = async (index) => {
    if (index === audioIndex) togglePlayback();
    else {
      setIsPlaying(false);
      setProgress(0);
      await soundObject.stopAsync();
      setSoundObject(null);
      setAudioIndex(index);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'তাৎক্ষনিক উপশম',
      headerShown: true,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={handleBackButtonClick}
        />
      ),
    });
  });

  return (
    <View style={{ backgroundColor: '#efefef', flex: 1 }}>
      {sectionsAllCards.map((card, index) => (
        <TouchableWithoutFeedback
          key={card.id}
          onPress={() => handleOnPress(index)}
        >
          <View style={styles.boxContainer}>
            <Text style={styles.audioText}>{card.name}</Text>
            <View style={styles.audioIconContainer}>
              {progress >= 0 && progress <= 1 && (
                <View>
                  <Progress.Circle
                    style={styles.progress}
                    progress={audioIndex === index ? progress : 0}
                    indeterminate={false}
                    showsText={false}
                    size={60}
                    borderWidth={2}
                    color={'#479162'}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 11,
                      top: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={
                        isPlaying && audioIndex === index
                          ? 'pause'
                          : 'play'
                      }
                      size={38}
                      style={{ color: '#479162' }}
                    />
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 15,
    marginBottom: 0,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#a0d1b2',
    elevation: 4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',

    borderLeftWidth: 6,
  },
  audioText: {
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    width: '72%',
    color: '#333',
  },
});

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, {})(MusicPlayerList);
