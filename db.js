var mongoose = require('mongoose');

module.exports = function(config){
	mongoose.connect(config.app.dbUrl+"/"+config.app.dbName,function(err,done)
	{
		if(err)
		{
			console.log("soory to connect database");
		}else
		{
			console.log("Connected to the database");
		}
	});

	
}