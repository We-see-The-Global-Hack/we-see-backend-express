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
  entity: {
    type: String,
    required: true,
    default: 'userListing',
  },
  generalType: {
    type: String,
    enum: ['material', 'time'],
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
    default: 'Listings',
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'Users',
  },
  title: String,
  description: String,
  state: String,
  kind: {
    type: String,
    enum: ['offer', 'need'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imageUrl: String,
  estimatedQuantity: {
    value: Number,
    measurements: String,
  },
  dataForMaterialType: {
    city: String,
    withTransport: Boolean,
    quality: {
      type: String,
      enum: ['good', 'average', 'bad'],
    },
  },
  dataForTimeType: {
    language: String,
  },
  expirationDate: Date,
}, {
  timestamps: true,
  collection: 'UserListings',
});


UserListingsSchema.set('toObject', { virtuals: true });
UserListingsSchema.set('toJSON', { virtuals: true });

UserListingsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, UserListingsSchema);
