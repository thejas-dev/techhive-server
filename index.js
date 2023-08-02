const express = require('express')
const cors = require('cors');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoutes = require("./routes/userRoutes")
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors({
  origin: 'https://techhive-task.vercel.app', 
  credentials: true,
}));

// app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes);


try{
	mongoose.connect("mongodb+srv://thejasgamerx123:letmegoin@cluster0.0hsylso.mongodb.net/?retryWrites=true&w=majority",{
		useNewUrlParser:true,
		useUnifiedTopology:true,
	}).then(()=>{
		console.log("db connected successfully")
	}).catch((err)=>{
		console.log(err);
	});
}catch(ex){
	console.log(ex)
}

app.get('/',(req,res)=>{
	res.status(2000);
	res.send("hello world")
})

let PORT = process.env.PORT || 3333;
app.listen(PORT,()=>{
	console.log(`Server started on ${PORT}`)
})