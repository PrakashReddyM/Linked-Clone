import React, { useEffect, useState } from 'react';
import useConversation from '../../zustand/useConversation';
import { BaseUrl } from '../../utils/api';
import axios from 'axios';
import Message from './Message';
import { useSocketContext } from '../../context/SocketContext';
import { useAuthContext } from '../../context/AuthContext';

const Messages = () => {
    const { selectedConversation } = useConversation();
    const [messages, setMessages] = useState([])
    const [msgInput, setMsgInput] = useState('');
    const { socket } = useSocketContext()
    const {authUser} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!msgInput) return;
        try {
            const senderId = authUser._id;
            setMessages((messages) => [...messages, { senderId, receiverId: selectedConversation._id, message: msgInput }]);
            await axios.post(`${BaseUrl}/message/${selectedConversation._id}/send`, { message: msgInput }, { withCredentials: true });

            socket.emit("sendMessage", {
                receiverId: selectedConversation._id,
                message: msgInput,
                senderId
            });
            setMsgInput('')

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log();
    }, [messages]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data } = await axios.get(`${BaseUrl}/message/${selectedConversation._id}`, { withCredentials: true });
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [selectedConversation]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket]);
    return (
        <div className='flex flex-col h-full'>
            <div className='flex-1 overflow-y-auto px-4 py-2'>
                {messages.length > 0 ? (
                    messages.map((chat, index) => (
                        <Message key={index} chat={chat} />
                    ))
                ) : (
                    <div>No messages yet</div>
                )}
            </div>
            <div className='sticky bottom-0 w-full bg-white p-2 border-t border-gray-300'>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-lg">
                        <input
                            type="text"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-2 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <button type='submit' className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition-all">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Messages;
