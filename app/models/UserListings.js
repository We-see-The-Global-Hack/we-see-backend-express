const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'UserListings';

const UserListingsSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
}, {
  timestamps: true,
  collection: 'UserListings',
});


UserListingsSchema.set('toObject', { virtuals: true });
UserListingsSchema.set('toJSON', { virtuals: true });

UserListingsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, UserListingsSchema);
