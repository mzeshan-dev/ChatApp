import User from "./models/user_model.js";

export const registerUser = async (email, socket) => {
  console.log("user added");
  const user = await User.findOneAndUpdate(
    { email },
    { socketId: socket.id },
    { new: true }
  );
  console.log(user);

  socket.emit("user connected", user);
};
