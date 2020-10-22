import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import InitiateMongoServer from "./config/db.js"
import user from "./Routes/user.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 8000;


// middlewarse
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// DB

InitiateMongoServer();

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });
  app.use("/user", user);

//Listener
app.listen(port, (req, res) => console.log(`Running on >>>>>>> ${port}`));

export default app;

