import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import ProfileElementComponent from './ProfileElementComponent';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    shadowColor: Colors.dark.background,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
  },
});

type UserRepositoryItemProps = {
  repoName: string,
  ownerName: string,
  description: string
};

const UserRepositoryItem = ({ repoName, ownerName, description }: UserRepositoryItemProps) => (
  <View style={styles.container}>
    <ProfileElementComponent
      title="Repository Name"
      data={repoName}
    />
    <ProfileElementComponent
      title="Owner Name"
      data={ownerName}
    />
    <ProfileElementComponent
      title="Description"
      data={description || 'Not Available'}
    />
  </View>
);

export default UserRepositoryItem;
