import { Schema, model, models } from "mongoose";

const TweetSchema = new Schema({
  userDetails: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  createdAt: { type: Date, default: Date.now },
  isBlueTick: {
    type: Boolean,
    default: true,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  retweetedBy: {
    type: [String],
    default: [],
  },
});

const Tweet = models.Tweet || model("Tweet", TweetSchema);

export default Tweet;
