/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Text, TextProps } from 'react-native';

interface MonoTextProps extends TextProps {
  children: any
}

export function MonoText(props: MonoTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export default (props: MonoTextProps) => <Text {...props} style={props.style} />;
