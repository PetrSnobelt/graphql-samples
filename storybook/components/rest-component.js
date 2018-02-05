import React from 'react'
import gql from 'graphql-tag';
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, graphql } from 'react-apollo';
import ReactJson from 'react-json-view'

// Allow server-side
global.Headers = global.Headers || require("fetch-headers");

const uri = 'https://swapi.co/api/'

// A simple query to retrieve data about the first person
const query = gql`
  query luke {
    person @rest(type: "Person", path: "people/1/") {
      name,
      height
    }
  }
`;

const restLink = new RestLink({ uri });

// Configure the ApolloClient with the default cache and RestLink
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const DebugWithButton = ({data}) => <div>
  {data && <ReactJson src={data} />}
  <br />
  <button onClick={() => data.refetch()}>Refresh</button>
</div>

const Enhanced = graphql(query)(DebugWithButton);

export default () => <ApolloProvider client={client}>
  <Enhanced />
</ApolloProvider>