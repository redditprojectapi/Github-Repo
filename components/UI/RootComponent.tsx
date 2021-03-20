import React from 'react';
import { View } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

type RootComponentProps = {
  top?: boolean
  bottom?: boolean
  children: React.ReactNode
};

const RootComponent = ({ top, bottom, children }: RootComponentProps) => {
  const edges: Edge[] = [];

  if (top) {
    edges.push('top');
  }

  if (bottom) {
    edges.push('bottom');
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

RootComponent.defaultProps = {
  top: false,
  bottom: false,
};

export default RootComponent;
