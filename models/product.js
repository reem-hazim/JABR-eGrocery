const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	image: String,
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	defWeight: {
		type: String,
		required: true,
	},
	qtyAvailable : {
		type: Number,
		min: 0,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	}
});

productSchema.virtual('inStock').get(function(){
	return this.qtyAvailable > 0;
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;