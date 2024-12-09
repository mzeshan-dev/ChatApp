import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jtw from "jsonwebtoken";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: [
      {
        text: { type: String, required: true },
        senderId: {
          type: String,
          ref: "User",
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
        status: { type: String, enum: ["sent", "delieverd", "read"] },
        timeStamp: { type: Date, default: Date.now },
      },
    ],
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", chatSchema);

export default Chats;
