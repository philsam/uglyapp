import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const SPACEX_API_URL = "https://api.spacex.land/graphql/";

export const client = new ApolloClient({
    uri: SPACEX_API_URL,
    link: new HttpLink({ uri: "https://api.spacex.land/graphql/", fetch }),
    cache: new InMemoryCache()
});