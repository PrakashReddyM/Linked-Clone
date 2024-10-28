import express from 'express'
import { commentPost, createPost, deletePost, getAllComments, getAllPosts, getPostById, getUserPosts, likePost } from '../controllers/postController.js'
import { protectRoute } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
const router = express.Router()

router.route('/new').post(protectRoute, upload.single('image'), createPost)
router.route('/').get(protectRoute, getAllPosts)
router.route('/me').get(protectRoute, getUserPosts)
router.route('/:id').delete(protectRoute, deletePost).get(protectRoute, getPostById)
router.route('/:id/like').post(protectRoute, likePost)
router.route('/:id/comment').post(protectRoute, commentPost).get(protectRoute, getAllComments)



export default router