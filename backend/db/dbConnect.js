import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const connectingDb = await mongoose.connect(
      "mongodb+srv://zeshan:1234@chatapp.egfnl.mongodb.net/chatDb"
    );
    if (!connectingDb) {
      console.log("connecting to mongodb faild");
    }
    console.log("connection successful ", connectingDb.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
