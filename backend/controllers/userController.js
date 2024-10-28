import User from '../models/userModel.js';

// Edit Banner
export const editBanner = async (req, res, next) => {
    try {
        const userId = req.user._id;
        if (!req.file) {
            return res.status(404).json({ success: false, message: 'Please upload an image' });
        }

        const postImage = req.file.path.replace(/\\/g, '/');
        const imageUrl = `${req.protocol}://${req.get('host')}/${postImage}`;

        const user = await User.findByIdAndUpdate(userId, { bannerImg: imageUrl }, { new: true, runValidators: true });

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await user.save()

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

//edit prof and info
export const editProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!req.file) {
            return res.status(404).json({ success: false, message: 'Please upload an image' });
        }

        const postImage = req.file.path.replace(/\\/g, '/');
        const imageUrl = `${req.protocol}://${req.get('host')}/${postImage}`;

        const updateData = imageUrl ? { profilePic: imageUrl, ...req.body } : { ...req.body };

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await user.save()

        res.status(200).json({
            success: true,
            message: 'updated'
        });
    } catch (error) {
        console.error('Error in editProfile Controller:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

//getUsers
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        const filteredUsers = users.filter((item) => item._id.toString() !== req.user._id.toString())
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error in getUsers controller:', error.message)
        res.status(500).json({ message: 'Intenal Server Error' })

    }
}

//getProfileById
export const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log('Error in getProfileById', error.message)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}