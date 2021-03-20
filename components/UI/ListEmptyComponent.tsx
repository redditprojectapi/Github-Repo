import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { MonoText } from '../StyledText';

type ListEmptyComponentProps = {
  style?: ViewStyle
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ListEmptyComponent = ({ style }: ListEmptyComponentProps) => (
  <View style={{ ...styles.container, ...style }}>
    <MonoText style={{ fontSize: 16 }}>No Data Available</MonoText>
  </View>
);

ListEmptyComponent.defaultProps = {
  style: {
    flex: 1,
  },
};

export default ListEmptyComponent;
