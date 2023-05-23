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
  createdAt: { type: Date, default: Date.now },
  isBlueTick: {
    type: Boolean,
    default: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  shareCount: {
    type: Number,
    default: 0,
  },
  retweetCount: {
    type: Number,
    default: 0,
  },
  replyCount: {
    type: Number,
    default: 0,
  },
  share: {
    type: Boolean,
    default: false,
  },
  retweet: {
    type: Boolean,
    default: false,
  },
  like: {
    type: Boolean,
    default: false,
  },
  reply: {
    type: Boolean,
    default: false,
  },
});

const Tweet = models.Tweet || model("Tweet", TweetSchema);

export default Tweet;
