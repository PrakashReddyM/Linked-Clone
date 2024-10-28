import React from 'react'
import ConversationUsers from '../components/chat/ConversationUsers'
import MessageContainer from '../components/chat/MessageContainer'

const MessagePage = () => {
    return (
        <div  className='bg-gray-100 h-[600px] px-10 pt-6'>
            <main className='bg-white  max-w-4xl h-[510px] rounded-xl '>
                <h2 className='font-bold py-2 pl-10 text-gray-700 border-b border-gray-700'>Messaging</h2>
                <div className='flex flex-row'>
                    <ConversationUsers />
                    <MessageContainer />
                </div>
            </main>
        </div>
    )
}

export default MessagePage