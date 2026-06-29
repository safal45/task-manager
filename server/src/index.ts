import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.use("/api/tasks", taskRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();