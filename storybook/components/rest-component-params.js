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

const queryWithParam = gql`
  query person($personId: Int!) {
    person(pId: $personId)
      @rest(type: "Person", path: "people/:pId/") {
      name,
      height
      homeworld @export(as: "homeworldUrl")
    }
  }
`

const queryWithMultipleParam = gql`
  query person($personId: Int!) {
    person(pId: $personId)
      @rest(type: "Person", path: "people/:pId/") {
      homeworld @export(as: "showId")
      name,
      height
      planet @rest(type: "Planet", path: "planets/1/") {
        name
        climate
        terrain
      }
    }
  }
`;

// for more info https://codesandbox.io/s/github/apollographql/apollo-link-rest/tree/master/examples/advanced

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

const Enhanced = graphql(queryWithMultipleParam, { //queryWithMultipleParam
  options: (params) => ({variables: params})
}) (DebugWithButton);


export default ({personId}) => <ApolloProvider client={client}>
  <Enhanced personId={personId || 3} />
</ApolloProvider>