import Conversation from '../models/conversationModel.js'
import Message from '../models/messageModel.js'
import { getReceiverSocketId,io } from '../socket/socket.js';

//sendMessage
export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log('Error in SendMessage:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//getMessages
export const getMessages = async (req, res, next) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages')

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log('Error in getMessages Controller:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}