import React from 'react'
import gql from 'graphql-tag';
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactJson from 'react-json-view'

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

export class Rest extends React.Component {
  componentDidMount() {
    // Create a RestLink for the REST API
    // If you are using multiple link types, restLink should go before httpLink,
    // as httpLink will swallow any calls that should be routed through rest!
    const restLink = new RestLink({ uri });

    // Configure the ApolloClient with the default cache and RestLink
    const client = new ApolloClient({
      link: restLink,
      cache: new InMemoryCache(),
    });

    // Invoke the query and log the person's name
    client.query({ query })
    .then(response => {
      console.log(response.data);
      this.setState({data: response.data})
    }).catch(console.error);
  }

  render() {
    // return <h1>Hello, {this.props.name}</h1>;
    return <div>Data from <a href={uri}>{uri}</a>
      <h4>props:</h4>
      <ReactJson src={this.props} />
      <br />
      <h4>state:</h4>
      <ReactJson src={this.state} />
    </div>
  }
}