var jwt       = require('jsonwebtoken');
var config    = require('./../config');
var userModel = require('./../models/user');

module.exports = function(req,res,next){
   var token;
   if(req.headers['x-access-token']){
    token = req.headers['x-access-token'];
    // console.log(token);
   }
   if(token){
      jwt.verify(token,config.app.jwtSecret,function(err,done){
      if(err){
          console.log('token error ');
          return next(err);
      }else{
        if(done)
        {

        	userModel.findOne({
        		_id:done.id
        	},function(err,user){
        		if(err)
        		{
        			return next(err);
        		}
        		if(user){
              req.logInUser = user;
        			 return next();
        			}else{
        				next({
        					message:'user is not found',
        				})
        			}
        	})
         
         }else
         {
         return next({
            message:"Invalid token",
          })
         }
      }
    })
   }else{
    return next({
      message: 'token isnot provided',
    })
   }

}