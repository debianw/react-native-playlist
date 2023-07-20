import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Dimensions,
  ViewToken,
} from 'react-native';
import PlayListItem, {Item} from './PlayListItem';

interface PlayListStackProps {
  items: Item[];
}

const PlayListStack: React.FC<PlayListStackProps> = ({items}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef<FlatList<Item>>(null);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onNext = () => {
    scrollRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex + 1,
    });
  };

  const onPrev = () => {
    scrollRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex - 1,
    });
  };

  const renderItem = ({item, index}: ListRenderItemInfo<Item>) => {
    return (
      <View style={styles.page}>
        <PlayListItem
          item={item}
          caption={`Step ${currentIndex + 1} of ${items.length}`}
          isVisible={currentIndex === index}
          onNext={currentIndex < items.length - 1 ? onNext : undefined}
          onPrev={currentIndex > 0 ? onPrev : undefined}
          isLastTrack={currentIndex >= items.length - 1}
        />
      </View>
    );
  };

  const onViewChange = useRef(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      const [visibleItem] = info.viewableItems;
      if (visibleItem.isViewable) {
        setCurrentIndex(visibleItem.index || 0);
      }
    },
  );

  return (
    <FlatList
      ref={scrollRef}
      style={styles.container}
      data={items}
      horizontal
      renderItem={renderItem}
      pagingEnabled
      keyExtractor={item => item.id}
      onViewableItemsChanged={onViewChange.current}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
});

export default PlayListStack;
