var express = require('express');
var router = express.Router();

var contactModels = require('./../models/contact');

function map_contact_req(contact,contactDetail) {

	if(contactDetail.fullName)
		contact.fullName = contactDetail.fullName;
	if(contactDetail.email)
		contact.email = contactDetail.email;
	if(contactDetail.subject)
		contact.subject = contactDetail.subject;
	if(contactDetail.message)
		contact.message  = contactDetail.message;

	return contact;
}

module.exports = function(config){

	router.get('/allcontact',function(req,res,next){
    contactModels.find().exec(function(err,done){
    	if(err){
    		return next(err);
    	}
    	res.json(done);
    })
});

router.post('/addcontact',function(req,res,next){
 var newContact = new contactModels();
 var newMapContact = map_contact_req(newContact,req.body);
 newMapContact.save(function(done,error){
 	if(error){
 		return next(error)
 	}
 	if(done){
        res.json(done);
 	}
 	
 	
 })
});



router.delete('/:id',function(req,res,next){
  var id = req.params.id;
  contactModels.findByIdAndRemove(id,function(err,done){
  	if(err){
  		return next(err);
  	}else{
  		res.json(done);
  	}
  })
});


	return router;
}
