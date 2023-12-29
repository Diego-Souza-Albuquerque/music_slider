import mongoose from "mongoose";

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
