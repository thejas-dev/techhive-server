const Item = require("../models/itemModels");
const ImageKit = require("imagekit")

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_ID,
  privateKey: process.env.IMAGEKIT_PRIVATE
});



module.exports.uploadImage = async(req,res,next) => {
	try{
		const {imageChunk} = req.body;
		imagekit.upload({
		    file : imageChunk, 
		    folder:"Images",
		    fileName : 'Thejas',   //required
			}).then(async(response) => {
				return res.json({status:true,imageUrl:response.url});			
			}).catch(error => {
			    return res.json({status:false,msg:"Something went wrong",err:error});
			}
		);	
	}catch(ex){
		next(ex)
	}
}

module.exports.create = async(req,res,next) => {
	try{
		const {itemName,itemDescription,itemImage,user,itemLink} = req.body;
		console.log(itemImage,itemName,itemDescription,user);
		const item = await Item.create({
			itemImage,itemName,itemDescription,user,itemLink
		})
		if(item){
			return res.json({status:true,item});
		}else{
			return res.json({status:false,msg:"Something went wrong"});
		}
	}catch(ex){
		next(ex)
	}
}

module.exports.editItem = async(req,res,next) => {
	try{
		const {id} = req.params;
		const {itemName,itemDescription,itemImage,itemLink,user} = req.body;
		const item = Item.findByIdAndUpdate(id,{
			itemName,itemDescription,itemImage,itemLink,user
		},{new:true},(err,obj)=>{
			console.log(obj);
			return res.json({status:true,item:obj})
		})
	}catch(ex){
		next(ex)
	}
}

module.exports.getAllItems = async(req,res,next) => {
	try{
		const item = await Item.find();
		if(item){
			return res.json({status:true,item}) 
		}
		return res.json({status:false,msg:"Something went wrong"})
	}catch(ex){
		next(ex)
	}
}

module.exports.deleteItem = async(req,res,next) => {
	try{
		const {id} = req.params;

		const item = Item.findByIdAndDelete(id, function (err, item) {
	    if (err){
	        return res.json({status:false,err});
	    }
	    else{
	        return res.json({status:true,item})
	    }
	});
	}catch(ex){
		next(ex)
	}
}