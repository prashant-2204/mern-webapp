const mongoose=require('mongoose');

const uri="mongodb+srv://prashant6710:xxhKpxtaqYZJTgJF@cluster0.cujle6p.mongodb.net/mern-db"

exports.connectDb =async()=>
{
  try {
    await mongoose.connect(uri);
    console.log("success db connection");
    
  } catch (error) {
    console.log(error);
    process.exit(0);
    
  }
}
