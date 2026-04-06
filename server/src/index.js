// import app from "./app.js";
// import { connectDB } from "./config/db.js";
// import { env } from "./config/env.js";

// async function startServer() {
//   try {
//     await connectDB(env.MONGODB_URI);
//     app.listen(env.PORT, () => {
//       console.log(`Server running on http://localhost:${env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server", error);
//     process.exit(1);
//   }
// }

// startServer();
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

// Connection cache taki har request pe naya connection na bane
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await connectDB(env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

// Vercel serverless function entry point
export default async (req, res) => {
  try {
    await connectToDatabase();
    // Express app ko request handle karne ke liye dena
    return app(req, res);
  } catch (error) {
    res.status(500).send("Internal Server Error: DB Connection Failed");
  }
};
