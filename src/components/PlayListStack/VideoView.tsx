import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Video, {
  LoadError,
  OnLoadData,
  OnProgressData,
  VideoProperties,
} from 'react-native-video';
import Controls from './Controls';
import Background from '../atoms/Background';

export interface VideoViewProps {
  source: VideoProperties['source'];
  isVisible: boolean;
  onNext?: (() => void) | undefined;
  onPrev?: (() => void) | undefined;
  children?: React.ReactNode;
}

const VideoView: React.FC<VideoViewProps> = ({
  children,
  source,
  isVisible,
  onNext,
  onPrev,
}): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<Video>(null);

  // Pause if is not Visible
  useEffect(() => {
    if (!isVisible) {
      setIsPlaying(false);
    }
  }, [isVisible]);

  const onError = (err: LoadError) => {
    console.log('Error loading video => ', err);
  };
  const onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
    console.log('is buffering', isBuffering);
  };
  const onLoad = (data: OnLoadData) => {
    console.log('on load => ', data.duration);
    setDuration(data.duration);
  };
  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };
  const onEnd = () => {
    console.log('done!');
    console.log('duration:', duration);
    console.log('currentTime:', currentTime);
  };
  const seek = (time: number) => {
    videoRef.current?.seek(time);
  };
  const onChange = (time: number) => {
    seek(time);
    setCurrentTime(time);
  };
  const onPause = () => {
    setIsPlaying(false);
  };
  const onSlideComplete = () => {
    setTimeout(() => {
      seek(currentTime);
      setIsPlaying(true);
    }, 0);
  };

  return (
    <Background>
      <Video
        ref={videoRef}
        source={source}
        resizeMode="cover"
        style={styles.videoContainer}
        onBuffer={onBuffer}
        onError={onError}
        paused={!isPlaying}
        onLoad={onLoad}
        onProgress={onProgress}
        onEnd={onEnd}
      />

      <Background.Content style={styles.container}>
        <View style={styles.innerContainer}>{children}</View>

        <View style={styles.controlsContainer}>
          <Controls
            paused={!isPlaying}
            onPlay={setIsPlaying}
            onNext={onNext}
            onPrev={onPrev}
            sliderProps={{
              value: currentTime,
              minimumValue: 0,
              maximumValue: Math.floor(duration),
              onValueChange: onChange,
              onSlidingStart: onPause,
              onSlidingComplete: onSlideComplete,
            }}
          />
        </View>
      </Background.Content>
    </Background>
  );
};

VideoView.defaultProps = {
  isVisible: false,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
  },

  innerContainer: {
    flex: 1,
  },

  controlsContainer: {
    paddingHorizontal: 30,
  },

  text: {
    color: 'white',
  },

  videoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});

export default VideoView;
