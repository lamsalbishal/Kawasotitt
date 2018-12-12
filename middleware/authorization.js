module.exports = function(req,res,next){
if(req.logInUser.role ==1){
  return next();
}else
{
  return next({
    message: "You are Unauthorized Area"
  })
}
 
}
