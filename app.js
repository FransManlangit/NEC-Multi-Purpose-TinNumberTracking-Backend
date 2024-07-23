const errorMiddleware = require("./middlewares/errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config({path:'./config/.env'});


const users = require("./routes/users");
const members = require("./routes/members");

const cors = require("cors");

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));


app.use("/api/v1", users);
app.use("/api/v1", members);

app.use(errorMiddleware);

module.exports = app;