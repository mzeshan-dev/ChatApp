import { createRoomId } from "../index.js";
import Chats from "../models/chat_model.js";

export const getChats = async (req, res) => {
  const { senderId, recieverId } = req.body;
  try {
    const chat = await Chats.findOne({ senderId, recieverId });

    if (!chat) {
      return res.status(400).json({ error: "no chat found" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllOfUserChats = async (req, res) => {
  try {
    const userId = req.user;
    const allChats = await Chats.findOne({ userIds: { $in: [userId] } });

    res.json(allChats);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user;
  const roomId = createRoomId(senderId, receiverId);
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const findChat = await Chats.findOne({ roomId });

    if (!findChat) {
      return res.status(400).json("no chat exists");
    }

    const messages = findChat.messages;
    const messgaesPaginated = messages
      .slice(skip, skip + limit)
      .sort((a, b) => a.timeStamp - b.timeStamp);

    const totalPages = Math.ceil(messages.length / limit);
    if (totalPages < page) {
      return res.status(400).json("No more messages");
    }
    return res.json({ totalPages, messgaesPaginated });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
