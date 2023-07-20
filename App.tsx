import React from 'react';
import PlayListStack from './src/components/PlayListStack/PlayListStack';
import {Item as VideoItem} from './src/components/PlayListStack/PlayListItem';
import {StatusBar} from 'react-native';

const lessonsPlayList: VideoItem[] = [
  {
    id: '1',
    source: require('./assets/lessons/step1.mp4'),
    title: 'Handling',
  },
  {
    id: '2',
    source: require('./assets/lessons/step2.mp4'),
    title: 'Handling',
  },
  {
    id: '3',
    source: require('./assets/lessons/step3.mp4'),
    title: 'Handling',
  },
  {
    id: '4',
    source: require('./assets/lessons/step4.mp4'),
    title: 'Handling',
    shortDescription:
      'If you want to master a habit, the key is to start with repetition, not perfection.',
    longDescription: `If you want to master a habit, the key is to start with repetition, not perfection.
      More detailed text could be here if needed. The video would stop when this comes up and when closed would resume if video was playing.
      The idea is the text expands up and could reach the top of the screen, and the video becomes translucent to black. Pressing play would also close this text as would swiping down.`,
  },
];

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} />

      {/* PlayList of Lessons */}
      <PlayListStack items={lessonsPlayList} />
    </>
  );
}

export default App;
