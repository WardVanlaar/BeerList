import { gql } from '@apollo/client';

export const QUERY_BREWERIES = gql`
  query breweries($username: String) {
    breweries(username: $username) {
      _id
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_BREWERY = gql`
  query brewery($id: ID!) {
    brewery(_id: $id) {
      _id
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
     
      breweries {
        brewId
        city
        name
        state
        type
        web
        reactionCount
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
      
      breweries {
        brewId
        city
        name
        state
        type
        web
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
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
    
    }
  }
`;

export const QUERY_REACTION = gql`
  query reaction($id: ID!) {
    reaction(_id: $id) {
      _id
      reactionBody
      createdAt
      brewId
    }
  }
`;
