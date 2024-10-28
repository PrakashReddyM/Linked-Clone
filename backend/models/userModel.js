import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: 'http://localhost:5000/backend/uploads/Profile.png'
    },
    bannerImg: {
        type: String,
        default: 'http://localhost:5000/backend/uploads/defaultBanner.jpg'
    },
    headline: {
        type: String,
        default: 'LinkedIn User'
    },
    location: {
        type: String,
        default: 'earth'
    },
    about: {
        type: String,
        default: ''
    },
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String
        }
    ],
    education: [{
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    connection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

const User = mongoose.model('User',userSchema)

export default User;