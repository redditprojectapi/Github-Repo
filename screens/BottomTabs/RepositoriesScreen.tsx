/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RootComponent from '../../components/UI/RootComponent';
import ScreenLoader from '../../components/UI/ScreenLoader';
import ListEmptyComponent from '../../components/UI/ListEmptyComponent';
import AppConstants from '../../constants/AppConstants';
import UserRepositories from '../../Model/UserRepositories';
import UserRepo from '../../Model/UserRepo';
import Log from '../../utils/LogUtils';
import Colors from '../../constants/Colors';
import Toast from '../../utils/Toast';
import UserRepositoryItem from '../../components/UserRepositoryItem';

const TAG = 'RepositoryScreen';
let lastCursor: string | null = null;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListStyle: { flex: 1 },
  itemContainer: {
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

type RepoItemProps = {
  item: {
    id: string,
    repoName: string,
    ownerName: string,
    description: string,
    createdAt: string,
  }
};

const RepositoriesScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserRepo[]>([]);
  const [endReached, setEndReached] = useState<boolean>(true);

  // getting repositories
  const getPublicRepositoriesHandler = async () => {
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

      lastCursor = null; // initially lastCursor setting up to null to get initial data..
      setEndReached(false); // initially list doesn't on end until no data available
      setIsLoading(true); // managing screen loader..

      // calling graphql query..
      const res = await fetch(
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
                          repositories(privacy: PUBLIC, first:${AppConstants.GRAPHQL_PAGE_LIMIT}, after:${lastCursor}){
                              pageInfo {
                                endCursor
                              }
                              nodes {
                                  name,
                                  id,
                                  createdAt,
                                  owner {
                                      id,
                                      login
                                  },
                                  description
                              }
                          }
                      }
                  }`,
          }),
        },
      );

      // processing response to json data..
      const jsonData = await res.json();

      /**
       * 
       * refer test case : to parse public repositories using model class
       * 
       */
      const processedData = new UserRepositories(jsonData); // processing json object using model class

      // processed data must not be null or undefined or blank
      if (processedData) {
        // updating lastCursor of data to manage pagination..
        if (processedData.lastPageCursor) {
          lastCursor = processedData.lastPageCursor;
        }

        if (processedData.processedData.length < AppConstants.GRAPHQL_PAGE_LIMIT) {
          setEndReached(true);
        }

        // updating state with processed data..
        if (processedData.processedData.length) {
          setData(processedData.processedData);
        }
      }
    } catch (err) {
      Toast('Something went wrong please try again');
      setEndReached(true);
      Log(`${TAG} [getPublicRepositoriesHandler] `, err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // getting repositories for first time
  useEffect(() => {
    getPublicRepositoriesHandler();
  }, []);

  // rendering items
  const renderRepositoriesHandler = (item: RepoItemProps) => (
    <UserRepositoryItem
      ownerName={item.item.ownerName}
      repoName={item.item.repoName}
      description={item.item.description}
    />
  );

  // pagination functionality
  const paginationHandler = async () => {
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

      // check whether all items has been fetched or not
      if (endReached) {
        return;
      }

      // getting new list from graphql
      const res = await fetch(
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
                      repositories(privacy: PUBLIC, first:${AppConstants.GRAPHQL_PAGE_LIMIT}, after:\"${lastCursor}\"){
                          pageInfo {
                              endCursor
                          }
                          nodes {
                              name,
                              id,
                              createdAt,
                              owner {
                                  id,
                                  login
                              },
                              description
                          }
                      }
                  }
              }`,
          }),
        },
      );

      // getting json data from graphql Data
      const jsonData = await res.json();

      /**
       * 
       * refer test case : parse public repositories using model class in pagination
       * 
       */
      const processedData = new UserRepositories(jsonData); // Processing jsonData through model class

      // processed data must not be null or undefined or blank
      if (processedData) {
        // saving last query cursor
        if (processedData.lastPageCursor) {
          lastCursor = processedData.lastPageCursor;
        }

        // checking whether all data fetched or not
        if (processedData.processedData.length < AppConstants.GRAPHQL_PAGE_LIMIT) {
          setEndReached(true);
        }
        // checking whether data got or data from query if available then append new data
        if (processedData.processedData.length > 0) {
          setData((prevData) => [...prevData, ...processedData.processedData]);
        }
      }
    } catch (err) {
      Toast('Something went wrong please try again.');
      Log(`${TAG} [paginationHandler] `, err.message);
    }
  };

  // list footer to show loader for pagination
  const CustomListFooterComponent = endReached
    ? null
    : <ScreenLoader style={{ marginVertical: 15 }} />;

  return (
    <RootComponent top>
      {
        isLoading
          ? <ScreenLoader />
          : (
            <View style={styles.container}>
              <FlatList
                data={data}
                style={styles.flatListStyle}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRepositoriesHandler}
                onEndReachedThreshold={0.01}
                onEndReached={paginationHandler}
                ListFooterComponent={CustomListFooterComponent}
                ListEmptyComponent={<ListEmptyComponent />}
                refreshing={isLoading}
                onRefresh={getPublicRepositoriesHandler}
              />
            </View>
          )
      }
    </RootComponent>
  );
};

export default RepositoriesScreen;
