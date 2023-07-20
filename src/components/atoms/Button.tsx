import React, {PropsWithChildren} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import Typography from './Typography';

interface Button extends TouchableOpacityProps {}

const Button = ({children, style, ...props}: PropsWithChildren<Button>) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={StyleSheet.flatten([styles.button, styles.primary, style])}
        {...props}>
        <Typography style={styles.buttonText}>{children}</Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: '#E2EAFF',
  },
  buttonText: {
    color: '#4C5980',
    fontWeight: 'bold',
  },
});

export default Button;
