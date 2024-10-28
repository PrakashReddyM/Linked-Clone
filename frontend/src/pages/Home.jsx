import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import CreatePost from '../components/post/CreatePost';
import Posts from '../components/post/Posts';
import RightSidebar from '../components/RightSidebar';

const Home = () => {
  return (
    <div className='flex flex-row bg-gray-100 h-screen'>
      <LeftSidebar />
      <div className='flex-grow w-1/2 h-full hide-scrollbar overflow-y-auto'>
        <CreatePost />
        <Posts />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
