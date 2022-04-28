const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const brewerySchema = new Schema(
  {
    brewId: {
      type: String,
      required: true,
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    web: {
      type: String
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

brewerySchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = brewerySchema;