const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'Listings';

const ListingsSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
  entity: {
    type: String,
    required: true,
    default: 'listing',
  },
  categoryName: String,
  categoryDescription: String,
  additionalInfo: String,
  parentCategory: ObjectId,
  isActive: Boolean,
}, {
  timestamps: true,
  collection: 'Listings',
});

ListingsSchema.add({
  subcategories: [ListingsSchema],
});

ListingsSchema.set('toObject', { virtuals: true });
ListingsSchema.set('toJSON', { virtuals: true });

ListingsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, ListingsSchema);
