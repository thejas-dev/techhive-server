const mongoose = require('mongoose')


const itemsSchema = new mongoose.Schema({
	itemName:{
		type:String,
		required:true
	},
	itemDescription:{
		type:String,
		default:''
	},
	itemImage:{
		type:String,
		default:''
	},
	itemLink:{
		type:String,
		default:''
	},
	user:{
		type:Object,
		default:{}
	}
	},{
		timestamps:true
	}
)


module.exports = mongoose.model("Items",itemsSchema)
