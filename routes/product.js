var express = require('express');
var router = express.Router();
var multer  = require('multer')

var productModel = require('./../models/product');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname)
  }
});

function fileFilter (req, file, cb) {
  
 var fileType = file.mimetype.split('/')['0'];
    
  if(fileType == 'image'){
    cb(null,true)
  }else{
    req.fileErr = true;
    cb(null,false)
  }
 
}
 
var upload = multer({ 
  storage: storage ,
  fileFilter:fileFilter,
});

function map_product_req(product,productDetail)
{
	if(productDetail.productName)
		product.productName = productDetail.productName;
	if(productDetail.productPrice)
		product.productPrice = productDetail.productPrice;
	if(productDetail.productDetails)
		product.productDetails = productDetail.productDetails;
	if(productDetail.productColor)
		product.productColor = productDetail.productColor;
	if(productDetail.status)
		product.status = productDetail.status;
  if(productDetail.productImages)
    product.productImages = productDetail.productImages;

	return product;
}

module.exports = function(config){
   
   router.get('/allproduct',function(req,res,next){
   	 productModel.find().exec(function(err,done){
   	 	if(err){
   	 		return next(err);
   	 	}
   	 	res.json(done);
   	 });
   });

   router.get('/:id',function(req,res,next){
   	var id = req.params.id;
    
   	productModel.findById({ _id:id }).exec(function(err,done){
   		if(err){
   			return next(err);
   		}
   		res.json(done);
   })
   });




  router.post('/',upload.single('image'),function(req, res, next) {
    // prepare product model instance
    console.log('file upload ', req.file);
    if(req.fileErr){
      return next({
      message: 'Invalid file formate'
    })
    }

    req.body.productImages = req.file.filename;
    
    var newProduct = new productModel();
    var mappedProduct = map_product_req(newProduct, req.body);
    // new newProduct.property = value
    mappedProduct.save(function(err, saved) {
      if (err) {
        return next(err);
      }
      res.json(saved);
    });

  });
 

   router.put('/:id',function(req,res,next){
   	var id = req.params.id;
   	productModel.findById(id,function(err,update){
       	if(err){
       		return next(err);
       	}
       	if(update){
       		var updateMapProduct = map_product_req(update,req.body)
       		updateMapProduct.save(function(err,save){
			if(err)
			{
               return next(err);
			}
			res.json(save);
			})
       	}else
       	{
       		message:'Product not found';
       	}
       })
   });

   router.delete('/:id',function(req,res,next){
   	var id = req.params.id;
   	productModel.findByIdAndRemove(id,function(err,done){
   		if(err){
   			return next(err);
   		}
   		res.json(done);
   	})
   })

	return router;
}