import express from 'express'
import { protectRoute } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { editBanner, editProfile, getProfileById, getUsers } from '../controllers/userController.js'
const router = express.Router()

router.route('/editBanner').put(protectRoute, upload.single('image'), editBanner)
router.route('/editProfile').put(protectRoute, upload.single('image'), editProfile)
router.route('/').get(protectRoute, getUsers)
router.route('/:id').get(protectRoute, getProfileById)


export default router