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

export const getAllChats = async (req, res) => {
  try {
    const allChats = await Chats.find();
    res.json(allChats);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
