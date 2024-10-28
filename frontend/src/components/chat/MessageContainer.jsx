import React, { useEffect } from 'react'
import Messages from '../chat/Messages'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    useEffect(() => {
        return setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className='w-full min-h-full flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <div className='flex flex-col h-[465px]'>
                    <header className='flex items-center pl-4 py-1.5 border-b border-gray-300'>
                        <img src={selectedConversation.profilePic} alt="logo" className='rounded-full h-10 w-10 mr-4' />
                        <p className='font-bold text-gray-700 text-sm'>{selectedConversation.name}</p>
                    </header>

                    <div className="flex-1 overflow-y-auto">
                        <Messages />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessageContainer

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-xl md:text-lg text-gray-700 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    );
};
