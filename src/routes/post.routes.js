import { Router } from 'express';
import { createPost, deletePost, getAllPosts, updatePost} from '../controllers/post.controllers.js';
import { VerifyToken } from '../middleware/auth.middleware.js';
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route('/create').post(upload.single("imageUrl"), VerifyToken, createPost);
router.route('/all').get(VerifyToken, getAllPosts);
router.route('/:postId/delete').delete(VerifyToken, deletePost);
router.route('/:postId/updatepost').patch(VerifyToken, updatePost);

export const postRoutes =  router;
