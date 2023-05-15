import React from 'react';
import { View, Text } from 'react-native';
import YouTube from '../components/Youtube';

const YtScreen = ({ route, ...props }) => {
  return (
    <View>
      <View>
        <YouTube videoId={route.params.videoId} />
      </View>
    </View>
  );
};

export default YtScreen;
