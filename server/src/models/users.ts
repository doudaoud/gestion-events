import { Schema as schema, model } from "mongoose";

const userSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["admin", "user"], default: "user" },
});

const userModel = model("User", userSchema);
export default userModel;
