import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
      caption: {
        type: String,
        required: true,
        maxLength: 500,
      },
      imageUrl: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
    },
    { 
      timestamps: true ,
    }
  );
  

export const Post = mongoose.model("Post", postSchema)