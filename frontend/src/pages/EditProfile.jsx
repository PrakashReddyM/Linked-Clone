import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        headline: '',
        location: '',
        profilePic: null
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePic: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('headline', formData.headline);
        formDataToSubmit.append('location', formData.location);
        if (formData.profilePic) {
            formDataToSubmit.append('image', formData.profilePic);
        }

        try {
            const { data } = await axios.put(`${BaseUrl}/user/editprofile`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            navigate('/profile')
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'>
                <h2 className='text-2xl font-bold mb-6'>Edit Profile</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Headline</label>
                        <input
                            type="text"
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Profile Picture</label>
                        <input
                            type="file"
                            name="profilePic"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
