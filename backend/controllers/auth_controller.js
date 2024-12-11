import mongoose from "mongoose";
import User from "../models/user_model.js";

export const singup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !password || !username) {
      return res.status(404).json({ error: "All * fields are required" });
    }
    const file = req.file.path;
    if (!file) {
      return res.status(400).json("avatar is required");
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ error: "user with email already exists" });
    }

    const createUser = await User.create({
      email,
      password,
      username,
      avatar: file,
    });
    if (!createUser) {
      return res
        .status(500)
        .json({ error: "internal error while registering user" });
    }
    const token = createUser.genrateAccessToken();
    const cookieOptions = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, cookieOptions).json({
      message: "user registered successfully",
      success: true,
      data: {
        createUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  console.log("logining");
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json("user not found");
    }

    const isPassCorrect = await checkUser.checkPassword(password);
    if (!isPassCorrect) {
      return res.status(400).json("wrong password");
    }
    const token = checkUser.genrateAccessToken();
    const cookieOptions = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, cookieOptions).json({
      message: "login successfull",
      data: {
        user: checkUser,
        token: token,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  const id = req.user;

  try {
    const findUser = await User.findById(id).select("-password");

    if (!findUser) {
      return res.status(400).json({ error: "user not found" });
    }

    return res.json({
      message: "user found",
      success: true,
      data: {
        user: findUser,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendFriendReq = async (req, res) => {
  const { reciverId } = req.body;
  const senderId = req.user;
  try {
    const reciever = await User.findById(reciverId);
    if (!reciever) {
      return res.status(400).json("user not found");
    }
    const allFriends = reciever["friends"];
    const allRequests = reciever.requests;

    const isAlreadyFriend = allFriends.find((id) => id === senderId);
    if (isAlreadyFriend) {
      return res.status(400).json(" already friends");
    }

    allRequests.push(senderId);
    await reciever.save();

    res.json({ success: true, message: "request sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const session = await mongoose.startSession();
  const { reqId, flag, reqUserId } = req.body;
  const userId = req.user;

  try {
    session.startTransaction();
    const user = await User.findById(userId);
    const AllReq = user.requests;
    const findReq = AllReq.find((rq) => rq === reqId);
    if (!findReq) {
      session.abortTransaction();
      res.status(400).json("no such req exists");
      return;
    }
    if (flag) {
      const reqUser = await User.findById(reqUserId);

      const reqUserFriends = reqUser.friends;
      const userFriends = user.friends;
      reqUserFriends.push(user._id.toString());
      userFriends.push(reqId);
      await reqUser.save();
      user.requests = user.requests.filter((rq) => rq !== reqId);

      await user.save();
      session.commitTransaction();
      res.json({ success: true, message: "request accepted" });
      return;
    } else {
      user.requests = user.requests.filter((rq) => rq !== reqId);
      await user.save();
      session.commitTransaction();
      res.json({ success: true, message: "request cencelled" });
      return;
    }
  } catch (error) {
    session.abortTransaction();
    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
