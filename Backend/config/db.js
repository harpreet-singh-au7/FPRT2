import mongoose from"mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGOURI =process.env.MONGO_URI;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default InitiateMongoServer;