var express = require('express');
var router = express.Router();

var userModels = require('./../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');


function createToken(data,config)
{
	var token = jwt.sign(data,config.app.jwtSecret,{
		expiresIn:'24hr',
	});
	return token;
}
// function map in upadate and post

function map_user_req(user,userDetails){
	if(userDetails.firstName)
		user.firstName = userDetails.firstName;
	if(userDetails.middleName)
		user.middleName = userDetails.middleName;
	if(userDetails.lastName)
		user.lastName = userDetails.lastName;
	if(userDetails.userName)
		user.userName = userDetails.userName;
	if(userDetails.password)
		user.password = passwordHash.generate(userDetails.password);
	if(userDetails.email)
		user.email = userDetails.email;
	if(userDetails.phone)
		user.phone = userDetails.phone;
	if(userDetails.role)
		user.role = userDetails.role;
	if(userDetails.parment_address && userDetails.tempoary_address){
		user.address = {
			parment_address:userDetails.parment_address,
		    tempoary_address:userDetails.tempoary_address,
		} 
	}

	return user;

}
/* GET home page. */

module.exports = function(config){

router.get('/allusers',function(req,res,next){
	userModels.find().exec(function(err,done){
		if(err){
			return next(err);
		}
		res.json(done);
	})
});

router.get('/:id',function(req,res,next){
	var id = req.params.id;
	userModels.findById({_id:id}).exec(function(err,done){
		if(err){
			return next(err);
		}else{
			res.json(done);
		}
	})
});
	

router.post('/login',function(req,res,next){
  userModels.findOne({
  	userName: req.body.userName
  }).exec(function(err,done){
  	if(err){
  		return next(err);
  	}
  	if(done){
  		var passwordMatch = passwordHash.verify(req.body.password, done.password);
  		if(passwordMatch){
  			var token = createToken({
                    	name : done.username,
                    	id   : done._id,
                    	role : done.role
                    },config);
  			res.json({
  				done:done,
  				token:token,
  			})
  		}else{
  			next({
  				message:'Invalid Password',
  			})
  		}
  	}else
  	{
  		next({
  			message: 'Invalid Username',
  		})
  	}
  })
});

router.post('/signup',function(req,res,next){
 
 var newUser = new userModels();
 var newMapedUser = map_user_req(newUser,req.body);
 newMapedUser.save(function(error,done){
 	if(error){
 		return next(error)
 	}
 	//console.log(req.body);
 	res.json(done);
 })
});

router.put('/:id',function(req,res,next){
	var id = req.params.id;
       userModels.findById(id,function(err,update){
       	if(err){
       		return next(err);
       	}
       	if(update){
       		var updateMapUser = map_user_req(update,req.body)
       		updateMapUser.save(function(err,save){
			if(err)
			{
               return next(err);
			}
			res.json(save);
			})
       	}else
       	{
       		message:'User not found';
       	}
       })
});

router.delete('/:id',function(req,res,next){
	var id = req.params.id;
	userModels.findByIdAndRemove(id,function(err, done){
		if(err){
			return next(err);
		}else
		{
			res.json(done);
		}
	})
});

return router;
}


