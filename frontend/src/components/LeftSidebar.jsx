import React from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { AiOutlineSave } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';

const LeftSidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div style={{ width: '23%' }} className=''>
      <div className='bg-gray-100 w-full h-60 flex flex-col'>
        <Link to={'/profile'}>
          <main className='bg-white w-5/6 rounded-lg shadow-md ml-6 mt-4'>
            <div className='relative'>
              <img
                src={authUser.bannerImg} alt="banner"
                className='w-full object-contain rounded-t-lg' />
              <img
                src={authUser.profilePic} alt="profile"
                className='absolute w-16 h-16 rounded-full border-1 border-white top-10 left-6' />
            </div>

            <div className='p-2 mt-10 relative'>
              <h2 className='text-xs text-gray-800 font-extrabold'>{authUser.name}</h2>
              <p style={{ fontSize: '11px' }} className='text-gray-700 text-xs mt-1 '>{authUser.headline}</p>
            </div>
          </main>
        </Link>

        <div className='bg-white w-5/6 p-2 py-4 rounded-lg shadow-md ml-6 mt-4'>
          <div className='flex justify-between mb-4 mt-2'>
            <p className='text-xs font-semibold'>Profile Viewers</p>
            <p className='text-xs font-semibold text-blue-500'>52</p>
          </div>
          <div className='flex justify-between mb-2'>
            <p className='text-xs font-semibold'>Post Impressions</p>
            <p className='text-xs font-semibold text-blue-500'>22</p>
          </div>
        </div>

        <div className='bg-white w-5/6 p-2 py-2 rounded-lg shadow-md ml-6 mt-4'>
          <div className='flex justify-between mb-4 mt-2'>
            <div className='flex items-center'>
              <AiOutlineSave className="text-gray-800 mr-4" />
              <p className='text-xs font-semibold'>Saved items</p>
            </div>
          </div>

          <div className='flex justify-between mb-4 mt-2'>
            <div className='flex items-center'>
              <FaUsers className="text-gray-800 mr-4" />
              <p className='text-xs font-semibold'>Groups</p>
            </div>
          </div>

          <div className='flex justify-between mb-4 mt-2'>
            <div className='flex items-center'>
              <MdEvent className="text-gray-800 mr-4" />
              <p className='text-xs font-semibold'>Events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
