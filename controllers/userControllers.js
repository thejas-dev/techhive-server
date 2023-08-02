const User = require("../models/userModels");
const bcrypt = require("bcryptjs")

module.exports.register = async(req,res,next) => {
	try{	
		const {email,password,name} = req.body;
		
		const emailCheck = await User.findOne({email});
		if(emailCheck)
			return res.json({msg:"account already exist",status:false});

		const hashedPassword = await bcrypt.hash(password,10);

		const user = await User.create({
			email,password:hashedPassword,name
		})
		delete user.password;
		return res.json({status:true, user})
	}catch(ex){
		next(ex)
	}
}

module.exports.login = async(req,res,next) => {
	try{	

		const {email,password} = req.body;
		const user = await User.findOne({email:email});
		if(!user)
			return res.json({msg:"Incorrect email or password",status:false});
		const isPasswordValid = await bcrypt.compare(password,user.password);
		if(!isPasswordValid)
			return res.json({msg:"Incorrect email or password",status:false});
		delete user.password;
		return res.json({status:true, user})

	}catch(ex){
		next(ex)
	}
}

module.exports.checkExist = async(req,res,next) => {
	const {email} = req.params;
	const emailCheck = await User.findOne({email});
	if(emailCheck)
		return res.json({msg:"account already exist",status:false});
	return res.json({msg:'account not exist',status:true});
}

module.exports.editImage = async(req,res,next) => {
	try{
		const {id} = req.params;
		const {image} = req.body;
		const user = User.findByIdAndUpdate(id,{
			image
		},{new:true},(err,obj)=>{
			if(err){
				return res.json({status:false,msg:"Something went wrong!"})
			}
			return res.json({status:true,user:obj});
		})  

	}catch(ex){
		next(ex)
	}
}