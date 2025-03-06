import { Router } from 'express';
import { createPost, getAllPosts, likePost } from '../controllers/post.controllers.js';
import { VerifyToken } from '../middleware/auth.middleware.js';
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route('/create').post(VerifyToken, upload.single("imageUrl"), createPost);
router.route('/all').get(VerifyToken, getAllPosts);
router.route('/:postId/like').put(VerifyToken, likePost);

export default router;
