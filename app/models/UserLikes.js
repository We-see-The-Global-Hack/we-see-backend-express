const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'UserLikes';

const UserLikesSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
}, {
  timestamps: true,
  collection: 'UserLikes',
});


UserLikesSchema.set('toObject', { virtuals: true });
UserLikesSchema.set('toJSON', { virtuals: true });

UserLikesSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, UserLikesSchema);
