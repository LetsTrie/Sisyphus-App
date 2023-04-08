import React, { useState, useCallback, useRef } from 'react';
import { Button, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function App(props) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') setPlaying(false);
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <YoutubePlayer
        height={500}
        play={playing}
        videoId={props.videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
