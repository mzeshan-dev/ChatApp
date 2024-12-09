import express from "express";
import {
  acceptFriendRequest,
  getAllUsers,
  getCurrentUser,
  loginUser,
  sendFriendReq,
  singup,
} from "../controllers/auth_controller.js";
import { upload } from "../middlewares/multer.js";
import isAuthentic from "../middlewares/isAuthentic.js";
const router = express.Router();

router
  .post("/signup", upload.single("avatar"), singup)
  .post("/login", upload.none(), loginUser)
  .get("/get_user", isAuthentic, getCurrentUser)
  .get("/all_user", isAuthentic, getAllUsers)
  .post("/send_req", isAuthentic, upload.none(), sendFriendReq)
  .post("/accept_req", isAuthentic, upload.none(), acceptFriendRequest);

export default router;
