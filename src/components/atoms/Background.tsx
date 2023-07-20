import React, {PropsWithChildren} from 'react';
import {View, SafeAreaView, ViewProps, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BackgroundProps {
  children: React.ReactNode;
  overlay?: boolean;
}

const Background = ({
  children,
  overlay,
}: PropsWithChildren<BackgroundProps>) => {
  return (
    <>
      {overlay && <View style={styles.overlayMask} />}

      <LinearGradient
        style={styles.mask}
        colors={[
          'rgba(0, 20, 68, 0.5)',
          'rgba(0, 20, 68, 0.5)',
          'rgba(0, 20, 68, 0.5)',
          'rgba(37, 46, 72, 1)',
        ]}
      />

      {children}
    </>
  );
};

const Content: React.FC<ViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={StyleSheet.flatten([styles.content, style])}>
      {children}
    </SafeAreaView>
  );
};

Background.Content = Content;

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  overlayMask: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 20, 68, 0.55)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 4,
  },
});

export default Background;
