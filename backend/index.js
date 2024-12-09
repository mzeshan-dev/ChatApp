import express, { text } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from "./db/dbConnect.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3003;
import path from "path";
const server = createServer(app);
const users = {};
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  },
});
app.use(cookieParser());
dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
await connectDb()
  .then((res) => console.log("connection established"))
  .catch((err) => console.log(err.message));
app.use(express.json());
app.use(express.static(path.join("public")));

app.get("/", (req, res) => {
  res.send("hello");
});

io.on("connection", (socket) => {
  console.log("user connected with id:", socket.id);
  socket.on("register", async (email) => {
    socket.email = email;
    const key = `user:${email}`;
    const value = socket.id;
    await setOnlineUsers(key, value);
  });
  socket.on("disconnect", async () => {
    const email = socket.email;
    if (email) {
      const key = `user:${email}`;
      await remOnlineUser(key, socket.id);
    }
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, recieverId, message } = data;

      const sender = await User.findById(senderId);
      const reciever = await User.findById(recieverId);

      if (!sender || !reciever) {
        socket.emit("personNotFound", "Sender or Receiver not found");
        return;
      }

      const recieverFriends = reciever.friends;
      const isFriend = recieverFriends.find(
        (id) => id === sender._id.toString()
      );
      if (!isFriend) {
        socket.emit("notFriends", "not your friend");
        return;
      }

      const key = `user:${reciever.email}`;
      const OnlineUsers = await getOnlineUsers(key);
      console.log("online working");
      let senderChat = await Chats.findOne({ userId: senderId });
      let receiverChat = await Chats.findOne({ userId: recieverId });

      const senderKey = `user:${sender.email}`;
      const recieverKey = `user:${reciever.email}`;

      if (!senderChat) {
        senderChat = await Chats.create({
          userId: senderId,
          messages: [
            {
              senderName: sender.username,
              senderId,
              text: message,
              status: "sent",
            },
          ],
        });

        await addToHash(senderKey, senderChat);
      } else {
        console.log("h");
        const redisSenderChat = await getFromHash(senderKey);
        senderChat =
          redisSenderChat ||
          (await Chats.findOneAndUpdate(
            { userId: senderId },
            {
              $push: {
                messages: {
                  senderName: sender.username,
                  senderId,
                  text: message,
                  status: "sent",
                },
              },
            },
            { new: true }
          ));
      }

      if (!receiverChat) {
        const createRecieverChat = await Chats.create({
          userId: recieverId,
          messages: [
            {
              senderName: sender.username,
              senderId,
              text: message,
              status: "sent",
            },
          ],
        });

        await addToHash(recieverKey, createRecieverChat);
      } else {
        const redisReceiverChat = await getFromHash(recieverKey);
        receiverChat =
          redisReceiverChat ||
          (await Chats.findOneAndUpdate(
            { userId: recieverId },
            {
              $push: {
                messages: {
                  senderName: sender.username,
                  senderId,
                  text: message,
                  status: "sent",
                },
              },
            },
            { new: true }
          ));
      }

      if (!OnlineUsers) {
        socket.emit("userNotConnected", "Receiver is not online");
        return;
      }
      OnlineUsers.forEach((socketId) => {
        console.log("messag sending", socketId);
        io.to(socketId).emit("receiveMessage", {
          text: message,
          senderId,
          senderName: sender.username,
          status: "sent",
        });
      });
      // Emit the new message to the receiver's socket

      console.log("hel");
    } catch (err) {
      console.error("Error in sendMessage:", err);
      socket.emit(
        "sendMessageError",
        "An error occurred while sending the message"
      );
    }
  });
  socket.emit("test", "hello");
  //   socket.on("message", (data) => sendMessage(data, socket.id, io));
});

import userRouter from "./routes/user_route.js";
import { registerUser } from "./socket_methods.js";
import User from "./models/user_model.js";
import { send } from "process";
import Chats from "./models/chat_model.js";
import chatRouter from "./routes/chat_route.js";
import { timeStamp } from "console";
import {
  addToHash,
  getFromHash,
  getOnlineUsers,
  remOnlineUser,
  setOnlineUsers,
} from "./redis/redis_methods.js";

app.use("/auth/api", userRouter);
app.use("/chat/api", chatRouter);
server.listen(PORT, () => {
  console.log("server is listening ", 3003);
});
