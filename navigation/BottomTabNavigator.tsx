import * as React from 'react';
import { FontAwesome5, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import RepositoriesScreen from '../screens/BottomTabs/RepositoriesScreen';
import FollowingScreen from '../screens/BottomTabs/FollowingScreen';
import FollowersScreen from '../screens/BottomTabs/FollowersScreen';
import ProfileScreen from '../screens/BottomTabs/ProfileScreen';

import { BottomTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

type TabBarOptionProps = {
  color: string,
};

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Repositories"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Repositories"
        component={RepositoriesScreen}
        options={{
          tabBarIcon: ({ color }: TabBarOptionProps) => <MaterialCommunityIcons name="source-repository-multiple" size={30} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          tabBarIcon: ({ color }: TabBarOptionProps) => <SimpleLineIcons name="user-following" size={30} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Followers"
        component={FollowersScreen}
        options={{
          tabBarIcon: ({ color }: TabBarOptionProps) => <FontAwesome5 name="user-friends" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }: TabBarOptionProps) => <MaterialCommunityIcons name="face-profile" size={30} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
