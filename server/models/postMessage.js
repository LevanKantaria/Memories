import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type:String,
    required:true,
    minlength:3,
    trim:true,
    maxlength:15,

},
  message: {
    type:String,
    required:true,
    minlength:3,
    trim:true,
    maxlength:120,

},
  creator:{
    type:String,
    required:true,
    minlength:3,
    trim:true,
    maxlength:15,

},
  tags: {
    type:Array,
    required:true,
    minlength:3,
    trim:true,

},
  selectedFile: {
    type:String,
    required:true,
    minlength:4,
    trim:true,

},

  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessage = mongoose.model("PostMessage", postSchema);

export default postMessage;
