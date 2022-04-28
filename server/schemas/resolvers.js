const { AuthenticationError } = require('apollo-server-express');
const { User, brewerySchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('breweries')
          .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('breweries')
        .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('breweries');
    },
    breweries: async (parent, { username }) => {
      const params = username ? { username } : {};
      return brewerySchema.find(params).sort({ createdAt: -1 });
    },
    brewery: async (parent, { _id }) => {
      return brewerySchema.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addBrewery: async (parent, args, context) => {
      if (context.user) {
        console.log('arguments below')
        console.log(...args);
        const brewery = await brewerySchema.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { breweries: brewery._id } },
          { new: true }
        );

        return brewerySchema;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addReaction: async (parent, { breweryId, reactionBody }, context) => {
      if (context.user) {
        const updatedBrewery = await brewerySchema.findOneAndUpdate(
          { _id: BreweryId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedBrewery;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
