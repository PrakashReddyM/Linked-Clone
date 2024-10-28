import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';
import axios from 'axios';
import { BaseUrl } from '../utils/api';
import { useSocketContext } from '../context/SocketContext';
import { useAuthContext } from '../context/AuthContext';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const senderId = authUser._id;
            console.log(messages)
            setMessages((messages) => [...messages,{ senderId, receiverId: selectedConversation._id, message }]);

            console.log(messages)
            await axios.post(`${BaseUrl}/message/${selectedConversation._id}/send`, { message }, { withCredentials: true });

            socket.emit("sendMessage", {
                receiverId: selectedConversation._id,
                message,
                senderId
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
