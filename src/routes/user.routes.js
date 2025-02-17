import { userRegister } from "../controllers/user.controllers.js";
import { Router } from "express";
import { uploads } from "../middleware/multer.middleware.js";

const router = Router()


router.route('/register').post(uploads.single("profile_picture"), userRegister)

export default router

