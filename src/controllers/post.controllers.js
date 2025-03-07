import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js"; 
import mongoose from "mongoose";


const createPost = async (req, res) => {
    try {
      const { caption } = req.body;
  
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(404).json({
            message: "User not found"
        }) 
    }

      const PhotoUrl = `public/images/${req.file.filename}`;
  
      const post = new Post({
        caption,
        imageUrl: PhotoUrl,
        createdAt: new Date(),
      });
  
      await post.save();
  
      const createdPost = await Post.findById(post._id).populate('user imageUrl');
  
      if (!createdPost) {
        return res.status(500).json({
          message: 'Error occurred while creating post',
        });
      }
  
      return res.status(201).json({
        message: 'Post Created Successfully',
        data: createdPost,
      });
    } catch (error) {
      console.error('Error in creating post:', error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
  

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user imageUrl") 
            .sort({ createdAt: -1 });

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error fetching posts", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};


const likePost = async (req, res) => {
  try {
      const user = req.user?._id; 

      if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
      }

      const post = await Post.findOne({ user }).sort({ createdAt: -1 })

      if (!post) {
          return res.status(404).json({ message: "No post found for this user" });
      }

      post.likes += 1;
      await post.save();

      return res.status(200).json({
          message: "Post liked successfully",
          post,
      });
  } catch (error) {
      console.log("Error liking post", error);
      res.status(500).json({ message: "Something went wrong while liking post" });
  }
};

export { createPost, getAllPosts, likePost };
