var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName:{
  	unique:true,
  	type:String,
  	required:true
  },
  password:{
  	type:String,
  	required:true
  },
  firstName:{
  	type:String,
  	required:true
  },
  middleName:String,
  lastName:{
  	type:String,
  	required: true,
  },
  email:{
  	type:String,
  	required:true,
  	unique:true
  },
  address:{
  	parment_address:String,
	tempoary_address:String,
  },
  phone:Number,
  role:{
  	type:Number,
  	default:0,
  }
},{
	timestamps:true
});

module.exports = mongoose.model('user',userSchema);

