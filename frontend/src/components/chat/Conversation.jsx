import React, { useEffect, useState } from 'react';
import useConversation from '../../zustand/useConversation';
import axios from 'axios';
import { BaseUrl } from '../../utils/api';

const Conversation = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [lastMsg, setLastMsg] = useState('');
  const isSelected = selectedConversation?._id === user._id;

  useEffect(() => {
    const getLastMsg = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/message/${user._id}`, { withCredentials: true });
        if (data.length > 0) {
          const lastMessage = data[data.length - 1];
          setLastMsg(lastMessage.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLastMsg();
  }, [user._id]);

  return (
    <div onClick={() => setSelectedConversation(user)} className={`flex p-2 border-b w-72 py-4 ${isSelected ? "bg-sky-600 text-white" : ""}`}>
      <img src={user.profilePic} alt="Profile" className='rounded-full h-12 w-12 mr-4' />
      <div>
        <p className='font-bold text-gray-700 text-sm'>{user.name}</p>
        <p className='text-xs pt-1 font-mono'>{lastMsg || "start conversation"}</p>
      </div>
    </div>
  );
};

export default Conversation;
