import Post from "../models/postModel.js"
import cloudinary from "../middleware/cloudinary.js";


//create Post
export const createPost = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Please Enter the Content' })
        }
        const userId = req.user._id;
        if (!req.file) {
            return res.status(404).json({ success: false, message: "Please Upload an image" })
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads", 
            resource_type: "image"
        });

        const post = new Post({
            author: userId,
            content,
            image: result.secure_url,
        });
        await post.save()

        res.status(201).json(post)
    } catch (error) {
        console.log('Error in createPost Controller:', error.message)
        res.status(500).json({ error: error.message })
    }
}

//getAllPosts 
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate({
            path: 'author',
            select: 'name profilePic headline'
        })
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: ['name', 'profilePicture']
                }
            });
        res.status(200).json(posts)
    } catch (error) {
        console.log('Error in getAllPosts Controller:', error.message)
        res.status(500).json({ error: error.message })
    }
}

//getPostById
export const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ message: 'Post Not Found' })
        }
        res.status(200).json(post)
    } catch (error) {
        console.log('Error in getPostById Controller:', error.message)
        res.status(500).json({ error: error.message })
    }
}

//getUserPosts
export const getUserPosts = async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user.posts)
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        console.log('Error in getUserPosts Controller:', error.message)
        res.status(500).json({ error: error.message })
    }
}

//delete Post
export const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (userId.toString() !== post.user.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        console.log('Error in deletePost Controller:', error.message);
        res.status(500).json({ error: error.message });
    }
};

//like post
export const likePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        const userId = req.user._id;
        let text = "";
        if (post.likes.includes(userId)) {
            //unlike post
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
            text = "Unliked the Post"
        } else {
            post.likes.push(userId)
            text = "Liked the Post"
        }
        await post.save()

        res.status(200).json({ message: text })
    } catch (error) {
        console.log('Error in likePost Controller:', error.message);
        res.status(500).json({ error: error.message });
    }
}

//comment Post
export const commentPost = async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { user: req.user._id, content } },
            },
            { new: true }
        )
        res.status(200).json(post)
    } catch (error) {
        console.log('Error in commentPost Controller:', error.message);
        res.status(500).json({ error: error.message });
    }
}

//getAllCommentsOfPost
export const getAllComments = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate({
            path: 'comments',
            select: 'user',
            populate: {
                path: 'user',
                select: 'name'
            }
        })
        if (!post) {
            return res.status(400).json({ message: 'Post Not Found' })
        }
        res.status(200).json(post.comments)
    } catch (error) {
        console.log('Error in getAllComments Controller:', error.message);
        res.status(500).json({ error: error.message });
    }
}

//delete comment 
export const deleteComment = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        const userId = req.user._id;
        if (post.comments.includes(userId)) {
            //unlike post
            post.comments = post.comments.filter((id) => id.toString() !== userId.toString())
        }
        await post.save()

        res.status(200).json({ message: 'comment Deleted' })
    } catch (error) {
        console.log('Error in deleteComment Controller:', error.message);
        res.status(500).json({ error: error.message });
    }
}