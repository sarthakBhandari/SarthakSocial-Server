const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

//database
dotenv.config(); //load .env file contents into process.env
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected tooo MongoDB");
  }
);

//middleware
app.use(express.json()); //json body parser
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Backend server is running");
});
