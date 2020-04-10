const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const model = 'DealsConfirmations';

const DealsConfirmationsSchema = new Schema({
  shortId: {
    type: String,
    required: true,
    default: customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6),
  },
  userThatOffer: {
    type: Schema.ObjectId,
    ref: 'Users',
  },
  userThatNeed: {
    type: Schema.ObjectId,
    ref: 'Users',
  },
  userThatOfferConfirmed: Boolean,
  userThatNeedConfirmed: Boolean,
}, {
  timestamps: true,
  collection: 'DealsConfirmations',
});


DealsConfirmationsSchema.set('toObject', { virtuals: true });
DealsConfirmationsSchema.set('toJSON', { virtuals: true });

DealsConfirmationsSchema.plugin(mongoosePaginate);


module.exports = mongoose.models[model] || mongoose.model(model, DealsConfirmationsSchema);
