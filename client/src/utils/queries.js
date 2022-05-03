import { gql } from '@apollo/client';

export const QUERY_BREWERIES = gql`
  query breweries($username: String) {
    breweries(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_BREWERY = gql`
  query brewery($id: ID!) {
    brewery(_id: $id) {
      _id
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      favBeer
      breweries {
        brewId
        city
        name
        state
        type
        web
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      favBeer
      breweries {
        brewId
        city
        name
        state
        type
        web
      }
     
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      favBeer
    }
  }
`;
