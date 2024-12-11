import express from "express";

import { upload } from "../middlewares/multer.js";
import isAuthentic from "../middlewares/isAuthentic.js";
import {
  getAllOfUserChats,
  getChats,
} from "../controllers/message_controller.js";
const router = express.Router();

router
  .post("/chats", isAuthentic, upload.none(), getChats)
  .get("/all_chats", isAuthentic, upload.none(), getAllOfUserChats);
export default router;
