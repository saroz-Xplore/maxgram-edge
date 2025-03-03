import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js"; 


const createPost = async (req, res) => {
    try {
        const { caption, userId } = req.body;

       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const photoUrl = `public/images/${req.file.filename}`
       
        const newPost = await Post.create({
            caption,
            imageUrl: photoUrl,
            user: userId,
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        console.log("Error in creating post", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username profile_picture") 
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
