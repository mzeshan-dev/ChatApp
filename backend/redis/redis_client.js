import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "zVkNVXG21sL2Lg5DU6U5jkEZkVLcpUfC",
  socket: {
    host: "redis-18155.c256.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18155,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.set("foo", "bar");
const result = await client.get("foo");
console.log(result); // >>> bar

export default client;
