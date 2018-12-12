var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactUser = new Schema({
  fullName:{
  	type:String,
  	required:true,
  },
  email:{
  	type:String,
  	required:true
  },
  subject:{
  	type:String,
  },
  message:String,
},{
	timestamps:true,
});

module.exports = mongoose.model('contact',contactUser)