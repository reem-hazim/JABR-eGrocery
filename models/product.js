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
	},
	qtyAvailable : {
		type: Number,
		min: 0,
		default: 50,
		required: true,
	},
	brand: {
		type: String,
		required: true,
		default: 'UAE',
	},
	department: {
		type: String,
		required: true,
		default: 'Produce',
	},
	category: {
		type: String,
		required: true,
		default: 'Vegetables',
	},
	featured: {
		type: Boolean,
		required: true,
		default: true,
	},
	added: {
		type: Date,
		default: Date.now,
	}
});

productSchema.virtual('inStock').get(function(){
	return this.qtyAvailable > 0;
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
