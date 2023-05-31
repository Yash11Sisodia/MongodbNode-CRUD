import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
   name :   {
    type : String,
    default : "MrNoName"},


   age : Number,

   password : {
    type : String,
    minLength : 8,
    required :true},

email : {
   type : String,
   required : true,
   lowercase : true,
   unique: true
},
createdAt : {
    type : Date,
    immutable : true,
    default : () => new Date(),
},
  updateAt : {
    type : Date ,
    default : () => new Date(),
  }
})

export default mongoose.model('User',userSchema)
