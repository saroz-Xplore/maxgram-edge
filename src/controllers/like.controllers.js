import { Post } from "../models/post.models.js";
import { Like } from "../models/like.models.js";
import mongoose from "mongoose";

const addLike = async (req, res) => {
  try {
    const { post } = req.params; 
    const user = req.user?._id; 

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const postExists = await Post.findById(post);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

  
    const existingLike = await Like.findOne({ post, user });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const like = new Like({ user, post });
    await like.save();

  
    await Post.findByIdAndUpdate(post, { $inc: { likes: 1 } });
    const updatedPost = await Post.findById(post);
  
    return res.status(201).json({ 
      message: "Post liked successfully", 
      like,
      updatedPost
    });
  } catch (error) {
    console.error("Error adding like", error);
    res.status(500).json({ message: "Something went wrong while liking the post" });
  }
};


const removeLike = async (req, res) => {
  try {
    const { post } = req.params;
    const user = req.user?._id;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const like = await Like.findOneAndDelete({ post, user });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    const postExists = await Post.findById(post);
    if (postExists) {
      postExists.likes -= 1;
      await postExists.save();
    }

    return res.status(200).json({ message: "Like removed successfully" , 
      postExists
    });
  } catch (error) {
    console.error("Error removing like", error);
    res.status(500).json({ message: "Something went wrong while removing the like" });
  }
};


const viewLike = async (req, res) => {
  try {
    const { post } = req.params;

    if (!mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const likes = await Like.find({ post }).populate("user", "username email");

    return res.status(200).json({ 
      message: "Successfully retrieved all likes", 
      data: likes 
    });
  } catch (error) {
    console.error("Error retrieving  likes", error);
    res.status(500).json({ message: "Something went wrong while retrieving likes" });
  }
};

export {addLike, removeLike, viewLike}

