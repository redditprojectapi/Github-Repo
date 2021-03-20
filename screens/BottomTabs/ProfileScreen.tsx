import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import RootComponent from '../../components/UI/RootComponent';
import ProfileElementComponent from '../../components/ProfileElementComponent';

import { ProfileConstructorParams, UserProfile } from '../../Model/UserProfile';
import Log from '../../utils/LogUtils';
import ScreenLoader from '../../components/UI/ScreenLoader';
import AppConstants from '../../constants/AppConstants';
import Toast from '../../utils/Toast';

const TAG = 'Profile Screen';
const defaultImage = require('../../assets/images/adaptive-icon.png');

type ProfileData = {
  avatarUrl: string
  name: string
  username: string
  bio: string
  websiteUrl: string | null
  email: string
  publicRepositoriesCount: number
  followersCount: number
  followingCount: number
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 60,
    marginVertical: 20,
    borderWidth: 2,
  },
});

const ProfileScreen = (props: any) => {
  let userProfile: UserProfile;

  const [data, setData] = useState<ProfileData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // getting user profile data..
  const getUserProfileHandler = async () => {
    try {
      /**
       * 
       * refer test case : to check OAuth token not null or undefined or blank
       * 
       */
      if (!AppConstants.GitHubOAuthToken) {
        Toast("Please provide a valid OAuth Token");
        return;
      }

      // showing screen loader..
      setIsLoading(true);

      // fetching user data..
      const resp = await fetch(
        'https://api.github.com/graphql',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AppConstants.GitHubOAuthToken}`,
          },
          body: JSON.stringify({
            query: `
                query {
                    viewer {
                      avatarUrl,
                      name,
                      login,
                      bio,
                      websiteUrl,
                      email,
                      repositories(privacy:PUBLIC){
                        totalCount,
                      },
                      followers{
                        totalCount
                      },
                      following{
                        totalCount
                      },
                      createdAt
                    }
                }`,
          }),
        },
      );

      // converting userData reponse to json format..
      const response: ProfileConstructorParams = await resp.json();

      /**
       * 
       * refer test case : to parse user profile using model class
       * 
       */
      userProfile = new UserProfile(response); // converting jsonData reponse to model class..

      // check whether user data fetched or not if yes then show user profile details..
      if (userProfile) {
        setData(userProfile); // saving user data and updating UI..
      }
    } catch (err) {
      Toast('Something went wrong please try again'); // shows toast message if error occues any..
      Log(`${TAG} [getUserProfileHandler] `, err.message);
    } finally {
      // hiding screen loader..
      setIsLoading(false);
    }
  };

  // get user profile for the first time..
  useEffect(() => {
    getUserProfileHandler();
  }, []);

  // handling followers click event
  const followersPressHandler = () => {
    props.navigation.jumpTo('Followers');
  };

  // handling followings click event
  const followingPressHandler = () => {
    props.navigation.jumpTo('Following');
  };

  return (
    <RootComponent top>
      {
        isLoading
          ? <ScreenLoader />
          : (
            <ScrollView>
              <View style={{ flex: 1, paddingHorizontal: 25 }}>
                <Image
                  source={{ uri: data?.avatarUrl }}
                  style={styles.imageStyle}
                  resizeMode="cover"
                  defaultSource={defaultImage}
                />

                <ProfileElementComponent
                  title="Username"
                  data={data?.username}
                />

                <ProfileElementComponent
                  title="Profile Name"
                  data={data?.name}
                />

                <ProfileElementComponent
                  title="Email"
                  data={data?.email}
                />

                <ProfileElementComponent
                  title="Bio"
                  data={data?.bio}
                />

                <ProfileElementComponent
                  title="Website"
                  data={data?.websiteUrl}
                />

                <ProfileElementComponent
                  title="Public Repositories"
                  data={data?.publicRepositoriesCount}
                />

                <ProfileElementComponent
                  title="Followers Count"
                  data={data?.followersCount}
                  onPress={followersPressHandler}
                />

                <ProfileElementComponent
                  title="Following Count"
                  data={data?.followingCount}
                  onPress={followingPressHandler}
                />
              </View>
            </ScrollView>
          )
      }
    </RootComponent>
  );
};

export default ProfileScreen;
