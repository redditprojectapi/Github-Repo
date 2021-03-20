import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          RepositoriesScreem: 'Repositories',
          FollowersScreem: 'Followers',
          FollowingScreem: 'Following',
          ProfileScreem: 'Profile',
          // Following: {
          //   screens: {
          //     SubScreen: 'sub',
          //   },
          // },
        },
      },
      NotFound: '*',
    },
  },
};
