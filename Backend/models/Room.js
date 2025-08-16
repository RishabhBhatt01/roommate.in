import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  length : {
    type : String,
    required : true,
  },
  breadth : {
    type : String,
    required : true,
  },
  price : {
    type : String,
    required : true,
  }
})