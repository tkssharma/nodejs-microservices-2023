import { config } from "dotenv";
config();

console.log(process.env.PORT);

export const APP_PORT = parseInt(process.env.PORT || "") || 3000;
export const MONGODB_URI =
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017";
