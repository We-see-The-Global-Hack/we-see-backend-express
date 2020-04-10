const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'UserComments';

const UserCommentsSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
}, {
  timestamps: true,
  collection: 'UserComments',
});


UserCommentsSchema.set('toObject', { virtuals: true });
UserCommentsSchema.set('toJSON', { virtuals: true });

UserCommentsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, UserCommentsSchema);
