/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import Route from "./src/routes";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import Toast from "react-native-simple-toast";

import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import * as Sentry from "sentry-expo";
import * as RootNavigation from "./src/routes/RootNavigation";

import { signIn, signOut, getToken } from "./src/Util";

Sentry.init({
  dsn:
    "https://cbf4724b85a643118b9ace82020d39fe@o548370.ingest.sentry.io/5670991",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

const App = () => {
  const uri =
    "https://hunet-api-auto-deployment-uxefqj2t7q-uc.a.run.app/graphql";
  const httpLink = createHttpLink({
    uri: "https://hunet-api-auto-deployment-uxefqj2t7q-uc.a.run.app/graphql",
  });
  const authLink = setContext(async (req, { headers }) => {
    const token = await getToken();
    return {
      ...headers,
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        if (message == "Unauthorized") {
          try {
            Toast.showWithGravity(
              "Login Session Timeout!",
              Toast.SHORT,
              Toast.TOP
            );
            signOut().then(() => {
              client.resetStore();
              RootNavigation.reset("Splash");
            });
          } catch (e) {
            console.log(e);
          }
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    if (networkError) {
      if (networkError.statusCode === 401) {
        // signOut();
      }
      console.log(`[Network error]: ${networkError}`);
    }
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, createUploadLink({ uri })]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Route />
    </ApolloProvider>
  );
};

export default App;
