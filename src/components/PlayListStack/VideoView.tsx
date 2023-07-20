import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
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
  onPlay?: ((play: boolean) => void) | undefined;
  onEnd?: (() => void) | undefined;
  children: React.FC<any>;
  overlay?: boolean;
}

export interface VideoViewRenderProps {
  play: (play: boolean) => void;
  isPlaying: boolean;
}

const VideoView: React.FC<VideoViewProps> = ({
  children,
  source,
  isVisible,
  onNext,
  onPrev,
  onPlay: onPlayProp,
  onEnd: onEndProp,
  overlay,
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
    if (onEndProp) {
      onEndProp();
    }
  };
  const seek = (time: number) => {
    videoRef.current?.seek(time);
  };
  const onChange = (time: number) => {
    seek(time);
  };
  const onPause = () => {
    setIsPlaying(false);
  };
  const onSlideComplete = (time: number) => {
    setTimeout(() => {
      seek(currentTime);
      setIsPlaying(true);
      setCurrentTime(time);
    }, 0);
  };
  const onPlay = (play: boolean) => {
    setIsPlaying(play);
    if (onPlayProp && play) {
      onPlayProp(true);
    }
  };

  const renderProps: VideoViewRenderProps = {
    play: onPlay,
    isPlaying,
  };

  return (
    <Video
      ref={videoRef}
      source={source}
      // repeat
      resizeMode="cover"
      style={styles.videoContainer}
      onBuffer={onBuffer}
      onError={onError}
      paused={!isPlaying}
      onLoad={onLoad}
      onProgress={onProgress}
      onEnd={onEnd}>
      <Background overlay={overlay}>
        <Background.Content style={styles.container}>
          <View style={styles.innerContainer}>{children(renderProps)}</View>

          <View style={styles.controlsContainer}>
            <Controls
              paused={!isPlaying}
              onPlay={onPlay}
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
    </Video>
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
    width: Dimensions.get('window').width,
    // height: 200,
    height: Dimensions.get('window').height,
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    // zIndex: 1,
  },
});

export default VideoView;
