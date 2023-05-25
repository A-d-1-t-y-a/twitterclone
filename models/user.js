import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "email is already existed"],
  },
  username: {
    type: String,
    require: [true, "userName is required"],
  },
  image: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  follower: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
