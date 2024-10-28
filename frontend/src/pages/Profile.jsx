import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/api';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
    const [pData, setPData] = useState({});
    const { setAuthUser } = useAuthContext()

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await axios.get(`${BaseUrl}/auth/profile`, { withCredentials: true });
                setPData(data);
                localStorage.setItem('user', JSON.stringify(data))
                setAuthUser(data)
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, []);

    return (
        <div className='bg-gray-100 w-full h-screen flex '>
            <main className='bg-white w-2/3 h-[500px] rounded-lg shadow-md ml-6 mt-6'>
                <div className='relative'>
                    <img
                        src={pData.bannerImg}
                        alt="banner"
                        className='w-full h-40 object-cover rounded-t-lg'
                    />
                    <img
                        src={pData.profilePic}
                        alt="profile"
                        className='absolute w-40 h-40 rounded-full border-4 border-white top-20 left-6'
                    />
                    <Link to={'/edit-banner'}>
                        <button className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition'>
                            <MdEdit className='text-gray-700' size={22} />
                        </button>
                    </Link>
                </div>

                <div className='p-6 mt-20 relative'>
                    <Link to={'/edit-profile'}>
                        <button className='absolute top-1 right-4 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition'>
                            <MdEdit className='text-gray-800' size={18} />
                        </button>
                    </Link>
                    <h2 className='text-xl text-gray-800 font-bold'>{pData.name}</h2>
                    <p className='text-gray-700 text-sm mt-3 '>{pData.headline}</p>
                    <p className='text-gray-700 text-sm mt-2'>{pData.location}</p>
                    <p className='text-gray-800 text-sm'>{pData.email}</p>

                    {/* <div className='flex space-x-6 mt-4'>
                        <p className='text-gray-700 text-sm font-bold'>120 followers</p>
                        <p className='text-gray-700 text-sm font-bold'>124 following</p>
                    </div> */}

                    <h4 className='mt-4 text-green-600 font-semibold'>Open To Work</h4>
                </div>
            </main>
        </div>
    );
};

export default Profile;
