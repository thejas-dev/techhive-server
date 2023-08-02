
const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
	password:{
		type: String,
		require:true
	},
	name:{
		type: String,
		required: true,
		max:40,
	},
	email: {
		type:String,
		default:'',
		required:true,
		unique:true
	},
	image: {
		type:String,
		default:'',
	},
	},
	{
		timestamps:true,
	}
)

module.exports = mongoose.model("Users",userSchema)