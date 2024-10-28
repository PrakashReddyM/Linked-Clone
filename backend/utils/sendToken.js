import jwt from 'jsonwebtoken'

const sendToken = (user, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })
        const options = {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }

        res.status(statusCode)
            .cookie('token', token, options)
            .json(user)
    } catch (error) {
        console.log('Error in sendToken Utils:', error.message)
        res.status(500).json({ error: error.message })
    }
}

export default sendToken;