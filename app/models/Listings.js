const mongoose = require('mongoose');
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
}, {
  timestamps: true,
  collection: 'Listings',
});


ListingsSchema.set('toObject', { virtuals: true });
ListingsSchema.set('toJSON', { virtuals: true });

ListingsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, ListingsSchema);
