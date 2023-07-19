import React from 'react';
import PlayListStack, {
  Item as VideoItem,
} from './src/components/PlayListStack/PlayListStack';
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
