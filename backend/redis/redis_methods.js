import redis from "./redis_client.js"; // Assuming you have already initialized your Redis client

export const addToHash = async (key, data, expiry = 1) => {
  try {
    // Set data in Redis hash
    const setData = await redis.hSet(key, "data", JSON.stringify(data));

    // Set expiry if required
    if (expiry > 0) {
      await redis.expire(key, expiry * 60);
    }

    console.log("Data set in Redis successfully:", setData);
  } catch (error) {
    console.error("Error setting data in Redis:", error);
  }
};

export const getFromHash = async (key) => {
  try {
    const data = await redis.hGet(JSON.stringify(key), "data");
    console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log("error fetching data from hash", error.message);
  }
};
export const setOnlineUsers = async (data) => {
  const { key, userId, value } = data;
  try {
    const onlineUsers = await redis.hSet(key, userId, value);
    console.log(onlineUsers);
    if (onlineUsers) {
      console.log("user added");
    }
  } catch (error) {
    console.log("error setting online user", error.message);
  }
};

export const remOnlineUser = async (data) => {
  try {
    const { key, id } = data;
    await redis.sRem(key, id);
    console.log(`user  added : ${value}`);
  } catch (error) {
    console.log("error removing online user", error.message);
  }
};

export const getOnlineUser = async (data) => {
  try {
    const { key, field } = data;
    console.log(key, field, "redis dta");
    const members = await redis.hGet(key, field);

    return members;
  } catch (error) {
    console.log("error fetching online users", error.message);
  }
};
