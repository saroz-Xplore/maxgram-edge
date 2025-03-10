import { Post } from "../models/post.models.js";
import { Comment } from "../models/comment.models.js";


const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { commentText } = req.body;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ 
                message: "Post not found"
             });
        }

        const comment = new Comment({
            user: userId,
            post: postId, 
            comment: commentText,
            createdAt: new Date(),
        });
       
        await comment.save();

        return res.status(201).json({
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        console.log("Error adding comment", error);
        res.status(500).json({ message: "Something went wrong while adding comment" });
    }
};



const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    
    const comments = await Comment.find({ post: postId }).populate("user", "username"); 

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found for this post" });
    }

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments", error);
    return res.status(500).json({ message: "Error fetching comments" });
  }
};


export { addComment, getCommentsByPost };
