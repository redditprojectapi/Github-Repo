import AppConstants from '../../constants/AppConstants';
import { UserProfile } from '../../Model/UserProfile';

// static user get profile respose
const userProfileResponse = `{
  "data": {
    "viewer": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/80914595?v=4",
      "name": null,
      "login": "redditprojectapi",
      "bio": null,
      "websiteUrl": null,
      "email": "",
      "repositories": {
        "totalCount": 5
      },
      "followers": {
        "totalCount": 0
      },
      "following": {
        "totalCount": 0
      },
      "createdAt": "2021-03-18T17:10:59Z"
    }
  }
}`;

test('to check OAuth token not null or undefined or blank', () => {
  expect(AppConstants.GitHubOAuthToken).toBeTruthy();
});

test('to parse user profile using model class', () => {
  const userProfile = new UserProfile(JSON.parse(userProfileResponse));
  expect(userProfile).toBeTruthy(); // always true as of static data provided for test case.
});
