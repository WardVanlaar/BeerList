import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const SAVE_BREWERY = gql`
    mutation saveBrewery($input: brewInput!) {
        saveBrewery(input: $input) {
            _id
            username
            email
            savedBreweries {
                id
                name
                type
                city
                state
                web
            }
        }
    }
`;

// mutation to remove breweries
export const REMOVE_BREWERY = gql`
    mutation removeBrewery($breweryId: String!) {
        removeBrewery(breweryId: $breweryId) {
            _id
            username
            email
            savedBreweries {
              id
              name
              type
              city
              state
              web
            }
        }
    }
`;
