var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
 
 productName:{
 	type:String,
 	required:true,
 },
 productImages:String,
 productPrice:Number,
 productDetails:String,
 productColor:String,
 status: {
		type: String,
		default: 'available',
	},

},{
	timestamps:true
});

module.exports = mongoose.model('product',productSchema);