import express from "express";
import { login, logout, profile,  signup } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";
const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/profile').get(protectRoute, profile)

export default router;