import User from '../models/userModel.js';
import cloudinary from 'cloudinary';


export const editBanner = async (req, res, next) => {
    try {
        const userId = req.user._id;
        if (!req.file) {
            return res.status(404).json({ success: false, message: 'Please upload an image' });
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "uploads",
            resource_type: "image"
        });

        const user = await User.findByIdAndUpdate(
            userId, 
            { bannerImg: result.secure_url }, 
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await user.save();

        res.status(200).json({
            success: true,
            _id: user._id,
            bannerImg: user.bannerImg,
        });
    } catch (error) {
        console.error('Error in editBanner Controller:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const editProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!req.file) {
            return res.status(404).json({ success: false, message: 'Please upload an image' });
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "uploads",
            resource_type: "image"
        });

        const updateData = result.secure_url ? { profilePic: result.secure_url, ...req.body } : { ...req.body };

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await user.save();

        res.status(200).json({
            success: true,
            message: 'updated'
        });
    } catch (error) {
        console.error('Error in editProfile Controller:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const filteredUsers = users.filter((item) => item._id.toString() !== req.user._id.toString());
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('Error in getUsers controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in getProfileById', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
