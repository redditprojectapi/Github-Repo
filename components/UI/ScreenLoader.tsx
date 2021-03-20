import React from 'react';
import {
  View,
  ActivityIndicator,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';

type ScreenLoaderProps = {
  style?: ViewStyle
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ScreenLoader = ({ style }: ScreenLoaderProps) => (
  <View style={{ ...styles.container, ...style }}>
    <ActivityIndicator size="large" color={Colors.dark.background} />
  </View>
);

ScreenLoader.defaultProps = {
  style: {
    flex: 1,
  },
};

export default ScreenLoader;
