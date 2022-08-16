import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const SPACEX_API_URL = "https://api.spacex.land/graphql/";

export const client = new ApolloClient({
    link: new HttpLink({ uri: SPACEX_API_URL, fetch }),
    cache: new InMemoryCache()
});