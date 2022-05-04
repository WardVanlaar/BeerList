const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    favBeer: String
    username: String
    email: String
    breweries: [Brewery]
  }

  type Brewery {
    brewId: String
    city: String
    name: String
    state: String
    type: String
    web: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input brewInput {
    brewId: String
    city: String
    name: String
    state: String
    type: String
    web: String
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
    addBrewery(input: brewInput): User
    removeBrewery(brewId: String!): User
    updateFavBeer(beer: String!): User  
  }
`;

module.exports = typeDefs;
