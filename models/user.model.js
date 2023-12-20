const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const { use } = require('../router/auth-router');
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  username : {
    type: String,
    required:true
  },
  email :{
    type : String,
    required : true
  },
  phone : {
    type:String,
    required : true
  },
  password:{
    type:String,
    required:true
  },
  isAdmin :{
    type:Boolean,
    default:false
  }

})

//password-hash

userschema.pre("save", async function(next){
  
  if(!this.isModified("password")){
    next();
  }

  try {
    const saltRound=await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(this.password,saltRound);
    this.password=hash_password;
    
  } catch (error) {
    next(error);
    
  }
})

//json web token (jwt)
//schema.method is instance to create as many function and to use it anywhere
userschema.methods.generateToken = async function(){
  try {

    return jwt.sign({
      userId : this._id.toString(),
      email : this.email,
      isAdmin : this.isAdmin
    },
    
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:"30d",
    }
    );
    
  } catch (error) {
    
    console.error(error);
  }

};

exports.User = new mongoose.model('User',userschema);