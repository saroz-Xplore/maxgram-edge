import { userLogin, userLogout, userRegister } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { VerifyToken } from "../middleware/auth.middleware.js";

const router = Router()


router.route('/register').post(upload.single("profile_picture"), userRegister)
router.route('/login').post(userLogin)
router.route('/logout').post(VerifyToken,userLogout)

export default router

