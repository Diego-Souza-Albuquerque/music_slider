/* const mongoose = require("mongoose");
mongoose.Promisse = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));
 */
const mongoose = require("mongoose");

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
