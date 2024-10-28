import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditBanner = () => {
    const [bannerImg, setBannerImg] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setBannerImg(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (bannerImg) {
            formData.append('image', bannerImg);
        }

        try {
            const { data } = await axios.put(`${BaseUrl}/user/editbanner`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            navigate('/profile');
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'>
                <h2 className='text-2xl font-bold mb-6'>Edit Banner</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Banner Image</label>
                        <input
                            type="file"
                            name="bannerImg"
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

export default EditBanner;
