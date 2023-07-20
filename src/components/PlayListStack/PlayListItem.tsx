import React, {PropsWithChildren, useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import VideoView, {VideoViewProps, VideoViewRenderProps} from './VideoView';
import Toolbar from './Toolbar';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';

export type Item = {
  id: string;
  source: VideoViewProps['source'];
  title: string;
  shortDescription?: string;
  longDescription?: string;
};

interface PlayListItemProps {
  item: Item;
  caption?: string;
  isVisible: boolean;
  onNext?: (() => void) | undefined;
  onPrev?: (() => void) | undefined;
  isLastTrack: boolean;
}

const PlayListItem = ({
  item,
  caption,
  isVisible,
  onNext,
  onPrev,
  isLastTrack,
}: PropsWithChildren<PlayListItemProps>) => {
  const [showLongDescription, setShowLongDescription] = useState(false);
  const [showFinishUp, setShowFinishUp] = useState(false);
  const lastPlayState = useRef(false);

  return (
    <VideoView
      source={item.source}
      isVisible={isVisible}
      onNext={onNext}
      onPrev={onPrev}
      onPlay={play => {
        setShowLongDescription(!play);
      }}
      onEnd={() => {
        setShowFinishUp(isLastTrack);
      }}
      overlay={showLongDescription}>
      {({play, isPlaying}: VideoViewRenderProps) => {
        console.log('here!!', isPlaying);
        return (
          <View style={styles.container}>
            <View>
              <Toolbar title={item.title} subtitle={caption} />
            </View>

            <View style={styles.content}>
              {item.shortDescription && !showLongDescription ? (
                <>
                  <Typography spacing={4}>{item.shortDescription}</Typography>
                  <Typography
                    onPress={() => {
                      lastPlayState.current = isPlaying;
                      setShowLongDescription(true);
                      play(false);
                    }}>
                    Read More ...
                  </Typography>
                </>
              ) : null}

              {showLongDescription && (
                <>
                  {item.longDescription
                    ?.split('.\n')
                    .filter(each => each.length > 0)
                    .map((text, index) => (
                      <Typography
                        key={`description-block-${index}`}
                        spacing={4}>
                        {text.trim()}
                      </Typography>
                    ))}
                  <Typography
                    onPress={() => {
                      play(lastPlayState.current);
                      setShowLongDescription(false);
                    }}>
                    Read Less ...
                  </Typography>
                </>
              )}

              {showFinishUp && (
                <View style={StyleSheet.flatten([styles.finishUpContainer])}>
                  <Button>Finish Up</Button>
                </View>
              )}
            </View>
          </View>
        );
      }}
    </VideoView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },
  finishUpContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  text: {
    marginBottom: 4,
  },
});

export default PlayListItem;
