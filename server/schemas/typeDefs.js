const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    breweries: [Brewery]
    friends: [User]
  }

  type Brewery {
    _id: ID
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    breweries(username: String): [Brewery]
    brewery(_id: ID!): Brewery
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBrewery(id: String, name: String, type: String, city: String, state: String, web: String ): User
    addReaction(breweryId: ID!, reactionBody: String!): Brewery
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
