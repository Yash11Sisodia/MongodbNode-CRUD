import mongoose from "mongoose";

 export const articleSchema = new mongoose.Schema({
   text : String ,
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
},

   createdAt : {
    type : Date,
    immutable : true,
    default : () => new Date(),
},
  updateAt : {
    type : Date ,
    default : () => new Date(),
  },

})


 
export default mongoose.model('Article',articleSchema);