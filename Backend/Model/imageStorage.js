import mongoose from "mongoose";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";

import path from "path";

Grid.mongo = mongoose.mongo;

export var gfs;

const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
conn.once("open", () => {
  console.log("DB Image Connected");

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      {
        const filename = `image-${Date.now()}${path.extname(
          file.originalname
        )}`;
        const fileInfo = {
          filename: filename,
          bucketName: "images",
        };
        resolve(fileInfo);
      }
    });
  },
});


export const upload = multer({ storage });
