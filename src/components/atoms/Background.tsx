import React from 'react';
import {SafeAreaView, ViewProps, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BackgroundProps {
  children: React.ReactNode;
}

interface BackgroundStaticProps {
  Content: React.FC<ViewProps>;
}
const Background: React.FC<BackgroundProps> & BackgroundStaticProps = ({
  children,
}) => {
  return (
    <>
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
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 4,
  },
});

export default Background;
