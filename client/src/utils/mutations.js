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


export const ADD_BREWERY = gql`
    mutation addBrewery($input: brewInput!) {
        addBrewery(input: $input) {
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

// mutation to remove breweries
export const REMOVE_BREWERY = gql`
    mutation removeBrewery($brewId: String!) {
        removeBrewery(brewId: $brewId) {
            _id
            username
            email
            favBeer
            breweries {
              brewId
            }
        }
    }
`;

export const UPDATE_FAVBEER = gql`
    mutation updateFavBeer($beer: String!) {
      updateFavBeer(beer: $beer) {
        _id
        username
        favBeer
        email
      }
    }
`;