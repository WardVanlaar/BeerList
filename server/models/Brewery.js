const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const brewerySchema = new Schema(
  {
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

const Brewery = model('Brewery', brewerySchema);

module.exports = Brewery;
