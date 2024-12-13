import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jtw from "jsonwebtoken";

const chatSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      uinque: true,
    },
    userIds: [String],
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
    profileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", chatSchema);

export default Chats;
