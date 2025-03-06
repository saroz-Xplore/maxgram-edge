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
        const { postId } = req.params;
      

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
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
