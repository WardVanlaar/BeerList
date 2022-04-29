const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const brewerySchema = new Schema(
  {
    brewId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
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