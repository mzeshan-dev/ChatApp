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
  getOnlineUser,
  remOnlineUser,
  setOnlineUsers,
} from "./redis/redis_methods.js";
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
export const createRoomId = (senderId, receiverId) => {
  const [firstId, secondId] = [senderId, receiverId].sort(); // Sort alphabetically
  return `roomId:${firstId}-${secondId}`;
};
io.on("connection", (socket) => {
  console.log("user connected with id:", socket.id);
  socket.on("register", async (data) => {
    // socket.email = email;
    const { userId } = data;

    console.log(userId);
    socket.userId = userId;
    const key = `online users`;
    const value = socket.id;
    await setOnlineUsers({ key, userId, value });
  });
  socket.on("joinRoom", async (data) => {
    const { senderId, receiverId } = data;
    const roomId = createRoomId(senderId, receiverId);
    if (!io.sockets.adapter.rooms.has(roomId)) {
      socket.join(roomId);
    }
    const onlineUser = await getOnlineUser({
      key: "online users",
      field: receiverId,
    });
    if (onlineUser) {
      socket.to(onlineUser).emit("roomJoined", "room have been joined");
    }

    socket.join(senderId);
  });
  socket.on("sendReq", async (data) => {
    const { receiverId, senderId, username } = data;
    console.log(receiverId);
    const roomId = createRoomId(senderId, receiverId);
    const onlineUser = await getOnlineUser({
      key: "online users",
      field: receiverId,
    });
    socket.join(roomId);
    if (socket.rooms.has(roomId)) {
      console.log("sender room joind");
    }
    if (onlineUser) {
      socket
        .to(onlineUser)
        .emit("reqReceive", `${username} send you a friend request`);
    }
  });

  socket.on("onReqAccpet", async (data) => {
    const { senderId, receiverId, username } = data;
    const roomId = createRoomId(senderId, receiverId);

    const onlineUser = await getOnlineUser({
      key: "online users",
      field: senderId,
    });
    socket.join(roomId);
    if (socket.rooms.has(roomId)) {
      console.log("recever jioin the room");
    }
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(400).json("user not found");
    }
    const createChat = await Chats.create({
      roomId: roomId,
      profileUrl: sender.avatar,
      userIds: [senderId, receiverId],
      messages: [],
    });

    if (onlineUser) {
      socket
        .to(onlineUser)
        .emit("notify", `${username} accpet your friend request`);
    }
  });
  socket.on("disconnect", async () => {
    const id = socket.userId;
    if (id) {
      const key = `online users`;
      await remOnlineUser({ key, id });
    }
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, recieverId, message } = data;
      const roomId = createRoomId(senderId, recieverId);
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
      // if (!io.sockets.adapter.rooms.has(roomId)) {
      //   socket.join(roomId);
      // }

      const findRoom = await Chats.findOne({ roomId });
      if (!findRoom) {
        console.log("error chat not found");
        socket.emit("errorChat", "Chat not found or no changes made");
        return;
      }

      await Chats.findOneAndUpdate(
        { roomId },
        { $push: { messages: message } },

        { new: true }
      );
      const onlineReceiver = await getOnlineUser({
        key: "online users",
        field: recieverId,
      });

      io.to(onlineReceiver).emit("receiveMessage", message);
    } catch (err) {
      console.error("Error in sendMessage:", err);
      socket.emit(
        "sendMessageError",
        "An error occurred while sending the message"
      );
    }
  });

  //   socket.on("message", (data) => sendMessage(data, socket.id, io));
});

app.use("/auth/api", userRouter);
app.use("/chat/api", chatRouter);
server.listen(PORT, () => {
  console.log("server is listening ", 3003);
});
