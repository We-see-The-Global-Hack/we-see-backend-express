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
  entity: {
    type: String,
    required: true,
    default: 'userProfile',
  },
  city: String,
  county: String,
  gender: {
    type: String,
    enum: ['F', 'M', 'Another'],
  },
  dob: Date,
  firstName: String,
  lastName: String,
  phoneNumber: {
    type: String,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
  profileImage: String,
  aboutMe: String,
  causes: [String],
  targetAudience: [String],
  values: String,
  isActive: {
    type: Boolean,
    default: false,
  },
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
