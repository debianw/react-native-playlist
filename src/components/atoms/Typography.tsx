import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

interface TypographyProps extends TextProps {
  spacing?: number;
}

const Typography = ({
  children,
  spacing,
  style,
  ...props
}: PropsWithChildren<TypographyProps>) => {
  const textStyles = StyleSheet.flatten([
    styles.text,
    {
      marginBottom: (spacing || 0) * 8,
    },
    style,
  ]);
  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
});

export default Typography;
