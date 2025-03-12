import { addLike, removeLike, viewLike } from "../controllers/like.controllers.js";
import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router();


router.route('/:postId/like').post(VerifyToken, addLike);
router.route('/:postId/like').delete(VerifyToken, removeLike);
router.route('/:postId/likes').get(VerifyToken, viewLike);

export default router;
