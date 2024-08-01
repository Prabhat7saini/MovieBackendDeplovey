const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming the Movie schema is defined similarly


const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  rating:{
    type:String,
    require:true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
