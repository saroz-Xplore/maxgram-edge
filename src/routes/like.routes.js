import { addLike, removeLike, viewLike } from "../controllers/like.controllers.js";
import { Router } from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router();


router.route('/:post/like').post(VerifyToken, addLike);
router.route('/:post/like').delete(VerifyToken, removeLike);
router.route('/:post/likes').get(VerifyToken, viewLike);

export default router;
