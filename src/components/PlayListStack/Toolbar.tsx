import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ToolbarProps {
  title: string;
  subtitle: string;
}

const Toolbar: React.FC<ToolbarProps> = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <View style={styles.titleContainer}>
          <Text style={StyleSheet.flatten([styles.text, styles.title])}>
            {title}
          </Text>
        </View>

        <View>
          <Text style={StyleSheet.flatten([styles.text, styles.subtitle])}>
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 4,
  },
  text: {
    color: '#FFF',
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
  },
});

export default Toolbar;
