import { Post } from "../models/post.models.js";
import { Like } from "../models/like.models.js";

const addLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const like = new Like({ user: userId, post: postId });
    await like.save();

    post.likes += 1;
    await post.save();

    return res.status(201).json({ message: "Post liked successfully", like });
  } catch (error) {
    console.error("Error adding like", error);
    res.status(500).json({ message: "Something went wrong while liking post" });
  }
};

const removeLike = async (req, res) => {
  try {
    
    const userId = req.user?._id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const like = await Like.findOneAndDelete({ post: postId, user: userId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    const post = await Post.findById(postId);
    if (post) {
        post.likes -= 1; 
        await post.save();  
        }


    return res.status(200).json({ message: "Like removed successfully" });

  } catch (error) {
    console.error("Error removing like", error);
    res.status(500).json({ message: "Something went wrong while removing like" });
  }
};

const viewLike = async (req, res) => {
  try {

    const userId = req.user?._id;
    const { postId } = req.params;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const liked = await Like.exists({ postId, userId });

    return res.status(200).json({ message: 'Successfully view all likes',
      data: liked,
     })
    
  } catch (error) {
    console.error("Error checking like status", error);
    res.status(500).json({ message: "Something went wrong while checking like status" });
  }
};

export { addLike, removeLike, viewLike };
