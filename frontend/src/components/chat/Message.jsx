import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

const Message = ({ chat }) => {
  const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = chat.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;


	return (
		<div className={`chat ${chatClassName} mx-1`}>
			<div className='chat-image avatar'>
				<div className='w-8 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`text-sm text-gray-100 rounded-sm p-1 bg-gray-700`}>{chat.message}</div>
		</div>
	);
}

export default Message
