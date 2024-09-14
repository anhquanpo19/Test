import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI!;

const { connection } = mongoose;

mongoose.connect(mongoUri);

connection.once("open", () => {
  console.log("Database connection was established");
});
