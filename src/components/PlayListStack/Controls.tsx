import React from 'react';
import Slider, {SliderProps} from '@react-native-community/slider';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const PlayIcon = require('../../../assets/icons/video-controls/play.png');
const PauseIcon = require('../../../assets/icons/video-controls/pause.png');
const PrevIcon = require('../../../assets/icons/video-controls/prev.png');
const NextIcon = require('../../../assets/icons/video-controls/next.png');

interface ControlsProps {
  sliderProps?: SliderProps;
  paused: boolean;
  onPlay: (play: boolean) => void;
  onNext?: (() => void) | undefined;
  onPrev?: (() => void) | undefined;
}

const COLOR = '#FFF';

const getMinutesFromSeconds = (time: number) => {
  const minutes = time >= 60 ? Math.floor(time / 60) : 0;
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
  }`;
};

const Controls: React.FC<ControlsProps> = ({
  sliderProps,
  paused,
  onPlay,
  onNext,
  onPrev,
}) => {
  return (
    <View>
      <View>
        <Slider
          style={styles.slider}
          minimumTrackTintColor={COLOR}
          maximumTrackTintColor={COLOR}
          thumbTintColor={COLOR}
          {...sliderProps}
        />
      </View>

      <View style={styles.timerContainer}>
        <View>
          <Text style={styles.text}>
            {getMinutesFromSeconds(sliderProps?.value || 0)}
          </Text>
        </View>

        <View>
          <Text style={styles.text}>
            {getMinutesFromSeconds(sliderProps?.maximumValue || 0)}
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.controlsInnerContainer}>
          <View>
            {!!onPrev && (
              <TouchableOpacity onPress={onPrev}>
                <Image source={PrevIcon} />
              </TouchableOpacity>
            )}
          </View>

          <View>
            <TouchableOpacity onPress={() => onPlay(paused)}>
              <Image
                source={paused ? PlayIcon : PauseIcon}
                style={styles.playIcon}
              />
            </TouchableOpacity>
          </View>

          <View>
            {!!onNext && (
              <TouchableOpacity onPress={onNext}>
                <Image source={NextIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
  },
  text: {
    color: 'white',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlsInnerContainer: {
    width: 165,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playIcon: {
    width: 21,
    height: 28,
  },
});

export default Controls;
