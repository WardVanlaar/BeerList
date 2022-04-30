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
  mutation addReaction($brewId: String!, $reactionBody: String!) {
    addReaction(brewId: $brewId, reactionBody: $reactionBody) {
      brewId
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

// export const ADD_FRIEND = gql`
//   mutation addFriend($id: ID!) {
//     addFriend(friendId: $id) {
//       _id
//       username
//       friendCount
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;

// export const REMOVE_FRIEND = gql`
//   mutation removeFriend($id: ID!) {
//     removeFriend(id: $id) {
//       _id
//       username
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;

export const ADD_BREWERY = gql`
    mutation addBrewery($input: brewInput!) {
        addBrewery(input: $input) {
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
            breweries {
              brewId
            }
        }
    }
`;
