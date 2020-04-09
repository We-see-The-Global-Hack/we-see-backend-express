const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'Users';

const UsersSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
  firstName: String,
  lastName: String,
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: { type: String, lowercase: true },
  profileImage: String,
}, {
  timestamps: true,
  collection: 'Users',
});

UsersSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UsersSchema.set('toObject', { virtuals: true });
UsersSchema.set('toJSON', { virtuals: true });

UsersSchema.index({
  phoneNumber: 1,
}, {
  unique: true,
});


UsersSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, UsersSchema);
