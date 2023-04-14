const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./db");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to database
connectDb().catch((error) => console.error(error));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
