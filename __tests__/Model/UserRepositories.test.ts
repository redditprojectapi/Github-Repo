import AppConstants from '../../constants/AppConstants';
import UserRepositories from '../../Model/UserRepositories';

const repositoriesJson = `{
  "data": {
    "viewer": {
      "repositories": {
        "nodes": [
          {
            "createdAt": "2020-03-13T05:32:28Z",
            "description": null,
            "id": "MDEwOlJlcG9zaXRvcnkyNDY5OTU0MTM=",
            "name": "react-native-autocomplete-location",
            "owner": {
              "id": "MDQ6VXNlcjYyMTI5NDg2",
              "login": "Vicky-SilverSky"
            }
          },
          {
            "createdAt": "2020-05-13T09:10:10Z",
            "description": "Swiper/carousel component for React Native featuring previews, multiple layouts, parallax images, performant handling of huge numbers of items, and more. Compatible with Android & iOS.",
            "id": "MDEwOlJlcG9zaXRvcnkyNjM1ODAyNTQ=",
            "name": "react-native-snap-carousel",
            "owner":  {
              "id": "MDQ6VXNlcjYyMTI5NDg2",
              "login": "Vicky-SilverSky"
            }
          },
          {
            "createdAt": "2020-09-26T07:18:30Z",
            "description": "Facebook Audience SDK integration for React Native",
            "id": "MDEwOlJlcG9zaXRvcnkyOTg3NTk4NjI=",
            "name": "react-native-fbads",
            "owner":  {
              "id": "MDQ6VXNlcjYyMTI5NDg2",
              "login": "Vicky-SilverSky"
            }
          },
          {
            "createdAt": "2020-10-05T10:17:42Z",
            "description": "iOS/Android image picker with support for camera, video, configurable compression, multiple images and cropping",
            "id": "MDEwOlJlcG9zaXRvcnkzMDEzNjg1MDg=",
            "name": "react-native-image-crop-picker",
            "owner":  {
              "id": "MDQ6VXNlcjYyMTI5NDg2",
              "login": "Vicky-SilverSky"
            }
          },
          {
            "createdAt": "2020-10-17T15:18:20Z",
            "description": "Native Video editing/trimming/compressing  :movie_camera: library for React-Native",
            "id": "MDEwOlJlcG9zaXRvcnkzMDQ5MDY0NDA=",
            "name": "react-native-video-processing",
            "owner":  {
              "id": "MDQ6VXNlcjYyMTI5NDg2",
              "login": "Vicky-SilverSky"
            }
          }
        ],
        "pageInfo":  {
          "endCursor": "Y3Vyc29yOnYyOpHOEiyAyA=="
        }
      }
    }
  }
}`;

let endReachedStatus = true;

test('to check OAuth token not null or undefined or blank', () => {
  expect(AppConstants.GitHubOAuthToken).toBeTruthy();
});

test('to parse public repositories using model class', () => {
  endReachedStatus = false;
  const userReposiroties = new UserRepositories(JSON.parse(repositoriesJson));
  expect(userReposiroties).toBeTruthy();
  expect(userReposiroties.processedData.length).toBeGreaterThan(1);
  if (userReposiroties.processedData.length < AppConstants.GRAPHQL_PAGE_LIMIT) {
    endReachedStatus = true;
  }
});

test('parse public repositories using model class in pagination', () => {
  expect(AppConstants.GitHubOAuthToken).toBeTruthy();
  expect(endReachedStatus).toBeFalsy();
  const userReposiroties = new UserRepositories(JSON.parse(repositoriesJson));
  expect(userReposiroties).toBeTruthy();
  if (userReposiroties.processedData.length < AppConstants.GRAPHQL_PAGE_LIMIT) {
    endReachedStatus = true;
  } else {
    expect(userReposiroties).toHaveProperty(['lastPageCursor']);
  }
});
