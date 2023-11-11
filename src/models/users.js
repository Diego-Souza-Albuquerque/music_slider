import mongoose, { Schema } from "mongoose";

delete mongoose.connection.models["Users"]; //porque tava dando erro apos fazer a chamada algumas vezes

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  preferences: { type: Object, default: { bgBlack: true, logo: false } },
});

const Users = mongoose.model.Users || mongoose.model("Users", usersSchema);

export default Users;
