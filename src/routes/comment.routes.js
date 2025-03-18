import { addComment, deleteComment, getCommentsByPost, updateComment } from "../controllers/comment.controllers.js";
import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";


const router = Router();


router.route('/:postId/comment').post(VerifyToken, addComment);
router.route('/:postId/comments').get(VerifyToken, getCommentsByPost);
router.route('/delete').delete(VerifyToken, deleteComment);
router.route('/:commentId/updatecomm').patch(VerifyToken, updateComment);

export default router;
