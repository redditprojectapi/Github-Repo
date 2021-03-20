import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MonoText } from './StyledText';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  titleStyle: { fontSize: 14, textDecorationLine: 'underline' },
  descriptionStyle: { fontSize: 18 },
});

type ProfileElementComponentProps = {
  title: string,
  data: string | undefined | number | null,
  onPress?: () => void,
};

const ProfileElementComponent = (props: ProfileElementComponentProps) => {
  const {
    data,
    title,
    onPress,
  } = props;
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <MonoText style={{ ...styles.titleStyle }}>{title}</MonoText>
      <MonoText style={{ ...styles.descriptionStyle }}>{data || 'Not Available'}</MonoText>
    </Pressable>
  );
};

ProfileElementComponent.defaultProps = {
  onPress: false,
};

export default ProfileElementComponent;
