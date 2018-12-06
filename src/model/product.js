import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;

let productSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	ptype: {
		type: String,
		required: true
	},
	price: Number,

	img: String, 

	reviews: [{
	   type: Schema.Types.ObjectId,
	   ref: 'Review'
	}]


});

module.exports = mongoose.model('Product', productSchema);