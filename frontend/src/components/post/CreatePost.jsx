import React, { useState } from 'react';
import { FaBriefcase, FaRegEdit } from 'react-icons/fa';
import { RiGalleryFill } from "react-icons/ri";
import { useAuthContext } from '../../context/AuthContext';
import CreateNewPost from '../CreateNewPost';

const CreatePost = () => {
    const { authUser } = useAuthContext();
    const [isBoxOpen, setBoxOpen] = useState(false);

    return (
        <div className="relative max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
            <div className="flex w-full items-center mb-4">
                <img
                    src={authUser.profilePic}
                    alt="Profile"
                    className="rounded-full h-10 w-10 mr-3"
                />
                <input
                    type='text'
                    onClick={() => setBoxOpen(true)}
                    className="w-96 p-4 text-gray-900 text-sm py-1.5 text-md border border-gray-400 rounded-full focus:outline-none"
                    placeholder="Start a post, try writing with AI..."
                />
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex ml-8 gap-24">
                    <label className="flex items-center cursor-pointer">
                        <RiGalleryFill className="text-xl text-blue-500" />
                        <span className="ml-2 text-gray-600 font-semibold text-sm">Media</span>
                    </label>
                    <div className="flex items-center cursor-pointer">
                        <FaBriefcase className="text-xl text-purple-500" />
                        <span className="ml-2 text-gray-600 font-semibold text-sm">Job</span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <FaRegEdit className="text-xl text-orange-500" />
                        <span className="ml-2 text-gray-600 font-semibold text-sm">Write Article</span>
                    </div>
                </div>
            </div>

            {isBoxOpen && (
                <CreateNewPost isBoxOpen={isBoxOpen} setBoxOpen={setBoxOpen} />
            )}
        </div>
    );
};

export default CreatePost;
