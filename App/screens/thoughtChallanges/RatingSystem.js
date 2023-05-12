import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import convertEngNumToBangNum from '../../helpers/englishNumberToBangla';

const HEIGHT = 30;
const WIDTH = 300;

const RatingSystem = ({ rating, setRating }) => {
  const progressBarRef = useRef(null);

  const boundary = (val) => {
    if (val < 0) return 0;
    if (val > 100) return 100;
    return parseInt(val);
  };

  const getRatingFromXPosition = (x, width) => {
    const ratingValue = (x / width) * 100;
    return boundary(ratingValue);
  };

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Get the progress bar measurements
        progressBarRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            // Calculate the offset between the initial touch position and the left edge of the progress bar
            const touchX = gestureState.x0;
            const touchOffset = touchX - pageX;

            // Calculate the current rating based on the touch position and offset
            const currentRating = getRatingFromXPosition(
              gestureState.dx + touchOffset,
              width,
            );
            setRating(currentRating);
          },
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        // Get the progress bar's position on the screen
        progressBarRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            // Calculate rating based on slide position
            const ratingValue = getRatingFromXPosition(
              gestureState.moveX - pageX,
              width,
            );
            setRating(ratingValue);
          },
        );
      },

      onPanResponderRelease: () => {},
      onPanResponderTerminate: () => {},
    });
  }, []);

  const handlePanResponderRelease = () => {
    setRating(rating);
  };

  const ratingCircleStyle = {
    left: `${rating}%`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.rating}>
        {convertEngNumToBangNum(rating)}%
      </Text>
      <View
        style={styles.progressBar}
        ref={progressBarRef}
        {...panResponder.panHandlers}
        onResponderRelease={handlePanResponderRelease}
      >
        <View style={[styles.progress, { width: `${rating}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  progressBar: {
    height: HEIGHT,
    width: WIDTH, // Adjust this value to change the width of the progress bar
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F38181',
  },
  progress: {
    height: HEIGHT,
    backgroundColor: '#F38181',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    position: 'absolute',
    top: 2,
    zIndex: 1,
  },
});

export default RatingSystem;
