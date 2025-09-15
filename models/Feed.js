import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  {
      timestamps: true
  }
);

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;
