import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Dashboaard from './components/Dashboard'

const client = new ApolloClient({
  uri: `https://api.kittyhawk.io/graphql?token=${process.env.REACT_APP_API_KEY}`
});

const App = () => (
  <ApolloProvider client={client}>
    <Dashboaard />
  </ApolloProvider>
);

export default App;
