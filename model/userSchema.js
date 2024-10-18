import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  confirmPassword:{
    type:String,
  }
})

export const userData = new mongoose.model('userDatas', userSchema)