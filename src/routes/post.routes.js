import { Router } from 'express';
import { createPost, getAllPosts} from '../controllers/post.controllers.js';
import { VerifyToken } from '../middleware/auth.middleware.js';
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route('/create').post(upload.single("imageUrl"), VerifyToken, createPost);
router.route('/all').get(VerifyToken, getAllPosts);

export default router;
