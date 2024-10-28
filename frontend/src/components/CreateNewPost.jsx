import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/api';

const CreateNewPost = ({ isBoxOpen, setBoxOpen }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('content', content);
            if (image) {
                formData.append('image', image);
            }
            await axios.post(`${BaseUrl}/posts/new`, formData, { withCredentials: true });

            setContent('');
            setImage(null);
            setBoxOpen(false);  
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl z-10">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-24 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={handleContentChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Post
                    </button>
                </form>

                <button
                    className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
                    onClick={() => setBoxOpen(false)}  // Close modal on clicking the "X"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default CreateNewPost;
