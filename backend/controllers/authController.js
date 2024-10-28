import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'

//signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUserEmail = await User.findOne({ email })
        if (existingUserEmail) {
            return res.status(400).json({ message: 'Email Already Exists' })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({ name, email, password: hashPassword })
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV = "production"
        })

        res.status(201).json(user)
    } catch (error) {
        console.log('Error in signup controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        await res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.json(user);
    } catch (error) {
        console.log('Error in controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log('Error in controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//profile
export const profile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in profile controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

