import mongoose from 'mongoose';
import Product from './product';

let Schema = mongoose.Schema;

let reviewSchema = new Schema ({
    title: {
    	type: String,
    	required: true
    },
    text: String,
    product: {
    	type: Schema.Types.ObjectId,
    	ref: 'Product',
    	required: true

    }
}); 

module.exports = mongoose.model('Review', reviewSchema);